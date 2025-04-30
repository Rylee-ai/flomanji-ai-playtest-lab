
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header provided' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a Supabase client with the admin key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: { headers: { Authorization: authHeader } },
        auth: { persistSession: false }
      }
    );

    // Parse the request body
    const requestData = await req.json();
    const { waitlistId } = requestData;

    if (!waitlistId) {
      return new Response(
        JSON.stringify({ error: 'Waitlist ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the waitlist entry
    const { data: waitlistEntry, error: waitlistError } = await supabaseAdmin
      .from('waitlist_entries')
      .select('*')
      .eq('id', waitlistId)
      .single();

    if (waitlistError || !waitlistEntry) {
      return new Response(
        JSON.stringify({ error: waitlistError?.message || 'Waitlist entry not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update the waitlist entry status to approved
    const { error: updateError } = await supabaseAdmin
      .from('waitlist_entries')
      .update({ 
        status: 'approved',
        updated_at: new Date().toISOString()
      })
      .eq('id', waitlistId);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate a random password for the new user
    const generatedPassword = Math.random().toString(36).slice(-10) + 
                             Math.random().toString(36).slice(-10).toUpperCase() +
                             Math.random().toString(36).slice(-2) + '!';

    // Create a new user in auth
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: waitlistEntry.email,
      password: generatedPassword,
      email_confirm: true,
      user_metadata: {
        first_name: waitlistEntry.first_name,
        last_name: waitlistEntry.last_name
      }
    });

    if (userError) {
      return new Response(
        JSON.stringify({ error: userError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create player details record
    const { error: playerError } = await supabaseAdmin
      .from('player_details')
      .insert({
        user_id: userData.user.id,
        waitlist_id: waitlistId,
        shipping_status: 'pending'
      });

    if (playerError) {
      return new Response(
        JSON.stringify({ error: playerError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send welcome email (in a real app you'd use an email service here)
    console.log(`Would send welcome email to ${waitlistEntry.email} with password reset instructions`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'User account created successfully',
        userId: userData.user.id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in process-waitlist-approval function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
