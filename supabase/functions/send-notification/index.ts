
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Resend client with API key from environment variables
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Email templates for different notification types
const emailTemplates = {
  waitlistApproval: {
    subject: "Welcome to Flomanji Playtest Program!",
    html: (firstName: string) => `
      <h1>Welcome to the Flomanji Playtest Program, ${firstName}!</h1>
      <p>We're excited to have you join our playtest community. Your application has been approved!</p>
      <p>You'll receive an email shortly with instructions on how to set up your account and access the playtest materials.</p>
      <p>Here's what you can expect next:</p>
      <ol>
        <li>Complete your profile and shipping information</li>
        <li>Review the playtest rules and guidelines</li>
        <li>Receive your physical playtest materials</li>
        <li>Begin your Flomanji adventure!</li>
      </ol>
      <p>If you have any questions, please don't hesitate to contact our support team.</p>
      <p>Thank you for being part of this exciting journey!</p>
      <p>Best regards,<br>The Flomanji Team</p>
    `,
  },
  waitlistRejection: {
    subject: "Flomanji Playtest Program Update",
    html: (firstName: string) => `
      <h1>Regarding Your Flomanji Playtest Application</h1>
      <p>Hello ${firstName},</p>
      <p>Thank you for your interest in the Flomanji Playtest Program.</p>
      <p>We appreciate your enthusiasm, but we're unable to include you in our current playtest group at this time. We've received an overwhelming number of applications and have limited spots available.</p>
      <p>We'll keep your information on file for future playtest opportunities.</p>
      <p>Thank you for your understanding.</p>
      <p>Best regards,<br>The Flomanji Team</p>
    `,
  },
  shippingUpdate: {
    subject: "Your Flomanji Playtest Kit Has Shipped!",
    html: (firstName: string, trackingNumber: string, trackingUrl: string) => `
      <h1>Your Flomanji Playtest Kit is on the way!</h1>
      <p>Hello ${firstName},</p>
      <p>Great news! Your Flomanji Playtest Kit has been shipped and is on its way to you.</p>
      <p>Tracking Number: <strong>${trackingNumber}</strong></p>
      <p>Track your package: <a href="${trackingUrl}" target="_blank">Click here to track your package</a></p>
      <p>Once you receive your kit, please log in to your playtest account to confirm delivery and begin the playtest process.</p>
      <p>We're excited to hear your feedback!</p>
      <p>Best regards,<br>The Flomanji Team</p>
    `,
  },
  adminAlert: {
    subject: "Flomanji Playtest Admin Alert",
    html: (action: string, userDetails: any) => `
      <h1>Flomanji Playtest Admin Notification</h1>
      <p><strong>Action:</strong> ${action}</p>
      <p><strong>User:</strong> ${userDetails.firstName} ${userDetails.lastName} (${userDetails.email})</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <p>Please review the dashboard for more details.</p>
    `,
  }
};

interface EmailRequest {
  type: "waitlistApproval" | "waitlistRejection" | "shippingUpdate" | "adminAlert";
  recipientEmail: string;
  recipientName: string;
  adminEmails?: string[];
  trackingNumber?: string;
  trackingUrl?: string;
  userDetails?: any;
  actionType?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header to verify user permissions
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get the request body
    const requestData: EmailRequest = await req.json();
    
    if (!requestData.type || !requestData.recipientEmail || !requestData.recipientName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create a Supabase client with the JWT from the request
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    // Verify user role if admin notification is requested
    if (requestData.adminEmails && requestData.adminEmails.length > 0) {
      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      
      // Check if user is an admin
      const { data: profile, error } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      
      if (error || profile?.role !== "admin") {
        return new Response(
          JSON.stringify({ error: "Only admins can send admin notifications" }),
          { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Send the main notification email based on the template type
    let emailHtml = "";
    let emailSubject = "";
    
    switch (requestData.type) {
      case "waitlistApproval":
        emailHtml = emailTemplates.waitlistApproval.html(requestData.recipientName);
        emailSubject = emailTemplates.waitlistApproval.subject;
        break;
      case "waitlistRejection":
        emailHtml = emailTemplates.waitlistRejection.html(requestData.recipientName);
        emailSubject = emailTemplates.waitlistRejection.subject;
        break;
      case "shippingUpdate":
        if (!requestData.trackingNumber || !requestData.trackingUrl) {
          return new Response(
            JSON.stringify({ error: "Missing tracking information for shipping update" }),
            { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        emailHtml = emailTemplates.shippingUpdate.html(
          requestData.recipientName, 
          requestData.trackingNumber, 
          requestData.trackingUrl
        );
        emailSubject = emailTemplates.shippingUpdate.subject;
        break;
      case "adminAlert":
        if (!requestData.actionType || !requestData.userDetails) {
          return new Response(
            JSON.stringify({ error: "Missing action type or user details for admin alert" }),
            { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
        emailHtml = emailTemplates.adminAlert.html(requestData.actionType, requestData.userDetails);
        emailSubject = emailTemplates.adminAlert.subject;
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid notification type" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
    }

    // Send email to the recipient
    const emailResult = await resend.emails.send({
      from: "Flomanji Playtest <notifications@flomanji.com>",
      to: [requestData.recipientEmail],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent to recipient:", emailResult);

    // Send admin notifications if requested
    if (requestData.adminEmails && requestData.adminEmails.length > 0 && requestData.type !== "adminAlert") {
      try {
        const adminHtml = emailTemplates.adminAlert.html(
          `User ${requestData.type}`, 
          {
            firstName: requestData.recipientName,
            lastName: "",
            email: requestData.recipientEmail,
            ...requestData.userDetails
          }
        );

        const adminEmailResult = await resend.emails.send({
          from: "Flomanji Playtest <notifications@flomanji.com>",
          to: requestData.adminEmails,
          subject: emailTemplates.adminAlert.subject,
          html: adminHtml,
        });

        console.log("Admin notification sent:", adminEmailResult);
      } catch (adminError) {
        console.error("Error sending admin notification:", adminError);
        // Continue execution - not critical enough to fail the whole process
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
