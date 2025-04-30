
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApprovalRequest {
  waitlistId: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the JWT from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get Supabase credentials from environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Create Supabase client with auth
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    // Create a service role client for admin operations
    const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Get request body
    const { waitlistId }: ApprovalRequest = await req.json();

    if (!waitlistId) {
      return new Response(
        JSON.stringify({ error: "Waitlist ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify requesting user is an admin
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get user role to verify admin status from the new profiles table
    const { data: profileData, error: profileError } = await adminClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profileData?.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Only admins can approve waitlist entries" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get the waitlist entry details
    const { data: waitlistEntry, error: entryError } = await adminClient
      .from("waitlist_entries")
      .select("*")
      .eq("id", waitlistId)
      .single();

    if (entryError || !waitlistEntry) {
      return new Response(
        JSON.stringify({ error: "Waitlist entry not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create a new user with random password - they will need to use password reset
    const tempPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).toUpperCase().slice(-2) + "!";
    
    // Create the user account
    const { data: userData, error: createUserError } = await adminClient.auth.admin.createUser({
      email: waitlistEntry.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        first_name: waitlistEntry.first_name,
        last_name: waitlistEntry.last_name,
        waitlist_id: waitlistEntry.id,
        role: "player" // Setting default role in metadata for the trigger function
      }
    });

    if (createUserError) {
      console.error("Failed to create user:", createUserError);
      return new Response(
        JSON.stringify({ error: "Failed to create user account" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create player details
    const { error: playerDetailsError } = await adminClient
      .from("player_details")
      .insert({
        user_id: userData.user.id,
        waitlist_id: waitlistEntry.id,
        shipping_status: "pending"
      });

    if (playerDetailsError) {
      console.error("Failed to create player details:", playerDetailsError);
      // Continue execution - not critical enough to fail the whole process
    }

    // Update waitlist entry status to approved
    const { error: approvalError } = await adminClient
      .from("waitlist_entries")
      .update({ 
        status: "approved",
        updated_at: new Date().toISOString()
      })
      .eq("id", waitlistId);

    if (approvalError) {
      console.error("Failed to update waitlist status:", approvalError);
      return new Response(
        JSON.stringify({ error: "Failed to update waitlist status" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send password reset email
    const { error: passwordResetError } = await adminClient.auth.admin.generateLink({
      type: "recovery",
      email: waitlistEntry.email,
    });

    if (passwordResetError) {
      console.error("Failed to send password reset:", passwordResetError);
      // Continue execution - user can still request a password reset manually
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "User account created and waitlist entry approved"
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Error in process waitlist approval:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
