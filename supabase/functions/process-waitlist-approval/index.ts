
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Send welcome email (in a real implementation this would use a proper email service)
const sendWelcomeEmail = async (email: string, firstName: string, resetUrl: string) => {
  console.log(`Sending welcome email to ${email}`);
  
  // In a real implementation, you would integrate with an email service like Resend or SendGrid
  // For now, we'll log the email content
  const emailTemplate = `
    To: ${email}
    Subject: Welcome to Flomanji Playtest Program!
    
    Dear ${firstName},
    
    Congratulations on being accepted into the Flomanji Playtest Program!
    
    Your account has been created and you can now log in using your email address.
    Please use the following link to set your password and access your account:
    
    ${resetUrl}
    
    After logging in, please add your shipping address so we can send you your playtest materials.
    
    If you have any questions, please don't hesitate to contact us.
    
    Thank you for joining us on this exciting journey!
    
    The Flomanji Team
  `;
  
  console.log("Email content:", emailTemplate);
  
  // Return true as if email was sent successfully
  return true;
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

    // Generate a strong random password for the new user
    const generatedPassword = Array(16)
      .fill(0)
      .map(() => Math.random().toString(36).charAt(2))
      .join('') + Math.random().toString(36).slice(-2).toUpperCase() + '!';

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

    // Generate password reset link for the user (so they can set their own password)
    const { data: resetData, error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: waitlistEntry.email,
      options: {
        redirectTo: `${req.headers.get('origin') || ''}/auth`,
      }
    });

    if (resetError) {
      console.error("Error generating password reset link:", resetError);
    }

    // Send welcome email with password reset link
    const resetUrl = resetData?.properties?.action_link || `${req.headers.get('origin') || ''}/auth`;
    await sendWelcomeEmail(
      waitlistEntry.email, 
      waitlistEntry.first_name, 
      resetUrl
    );

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
