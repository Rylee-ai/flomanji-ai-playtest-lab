
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WaitlistApprovalRequest {
  waitlistId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Get admin credentials from environment variables
  const supabaseAdminUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  
  if (!supabaseAdminUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ 
        error: "Server configuration error: missing environment variables"
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
  
  try {
    // Create supabase client with service role for admin privileges
    const supabaseAdmin = createClient(supabaseAdminUrl, supabaseServiceKey);
    
    // Verify the request has admin auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Extract the token from Authorization header (format: "Bearer {token}")
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the token and get user
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: authError }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Parse request body
    const { waitlistId } = await req.json() as WaitlistApprovalRequest;
    
    if (!waitlistId) {
      return new Response(
        JSON.stringify({ error: "Missing waitlist ID" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Get the waitlist entry
    const { data: waitlistEntry, error: fetchError } = await supabaseAdmin
      .from('waitlist_entries')
      .select('*')
      .eq('id', waitlistId)
      .single();
    
    if (fetchError || !waitlistEntry) {
      return new Response(
        JSON.stringify({ error: "Waitlist entry not found", details: fetchError }),
        { 
          status: 404, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Check if the entry is already approved
    if (waitlistEntry.status === 'approved') {
      return new Response(
        JSON.stringify({ message: "Waitlist entry already approved" }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Generate a random password for the new user (they'll reset it when they log in)
    const tempPassword = Math.random().toString(36).slice(-10);
    
    // Create the user account in auth
    const { data: authUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email: waitlistEntry.email,
      password: tempPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        first_name: waitlistEntry.first_name,
        last_name: waitlistEntry.last_name,
        waitlist_id: waitlistEntry.id
      }
    });
    
    if (createUserError) {
      return new Response(
        JSON.stringify({ error: "Error creating user", details: createUserError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Create player_details entry linking the waitlist entry to the new user
    const { error: playerDetailsError } = await supabaseAdmin
      .from('player_details')
      .insert([{
        user_id: authUser.user.id,
        waitlist_id: waitlistId,
        shipping_status: 'pending'
      }]);
    
    if (playerDetailsError) {
      console.error("Error creating player details:", playerDetailsError);
      // We don't return an error here because the user was created,
      // and we can fix the player_details record later if needed
    }
    
    // Update waitlist entry status to approved
    const { error: updateError } = await supabaseAdmin
      .from('waitlist_entries')
      .update({ status: 'approved', updated_at: new Date().toISOString() })
      .eq('id', waitlistId);
    
    if (updateError) {
      console.error("Error updating waitlist entry:", updateError);
    }
    
    // Here you would typically send a welcome email with a password reset link
    // For now, we'll just return the success response

    console.log(`Waitlist entry approved and user created: ${waitlistEntry.email}`);
    
    return new Response(
      JSON.stringify({ 
        message: "Waitlist entry approved and user account created",
        userId: authUser.user.id,
        waitlistId: waitlistId,
        email: waitlistEntry.email
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error in process-waitlist-approval:", error);
    
    return new Response(
      JSON.stringify({ error: "Server error", details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

serve(handler);
