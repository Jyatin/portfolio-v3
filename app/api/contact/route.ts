import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// In-memory rate limiting: max 5 messages per 10 minutes per IP
type RateLimitRecord = { count: number; expiresAt: number };
const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const windowMs = 10 * 60 * 1000; // 10 minutes
    const limit = 5;

    const record = rateLimitMap.get(ip);
    if (!record || record.expiresAt < now) {
        rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
        return false;
    }

    if (record.count >= limit) {
        return true;
    }

    record.count += 1;
    return false;
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

function sanitizeText(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getSupabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
        process.env.SUPABASE_SECRET_KEY ??
        process.env.SUPABASE_SERVICE_ROLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) return null;

    return createClient(url, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        // 1. IP rate limiting
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            request.headers.get("x-real-ip") ??
            "anonymous";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many messages sent. Please wait a few minutes before trying again." },
                { status: 429 }
            );
        }

        // 2. Parse & Validate Payload
        const body = await request.json().catch(() => null);
        if (!body || typeof body !== "object") {
            return NextResponse.json(
                { error: "Invalid request payload." },
                { status: 400 }
            );
        }

        const { name, email, subject, message, hp_field } = body as Record<string, unknown>;

        // Anti-spam Honeypot: if filled, quietly succeed without delivering
        if (typeof hp_field === "string" && hp_field.trim().length > 0) {
            return NextResponse.json({ success: true, message: "Message received." });
        }

        const trimmedName = typeof name === "string" ? name.trim() : "";
        const trimmedEmail = typeof email === "string" ? email.trim() : "";
        const trimmedSubject = typeof subject === "string" ? subject.trim() : "";
        const trimmedMessage = typeof message === "string" ? message.trim() : "";

        // Validate Name
        if (!trimmedName || trimmedName.length < 2) {
            return NextResponse.json(
                { error: "Please enter your name (at least 2 characters)." },
                { status: 400 }
            );
        }
        if (trimmedName.length > 100) {
            return NextResponse.json(
                { error: "Name is too long (maximum 100 characters)." },
                { status: 400 }
            );
        }

        // Validate Email
        if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }
        if (trimmedEmail.length > 255) {
            return NextResponse.json(
                { error: "Email address is too long." },
                { status: 400 }
            );
        }

        // Validate Subject
        if (trimmedSubject.length > 200) {
            return NextResponse.json(
                { error: "Subject is too long (maximum 200 characters)." },
                { status: 400 }
            );
        }

        // Validate Message
        if (!trimmedMessage || trimmedMessage.length < 5) {
            return NextResponse.json(
                { error: "Please write a message with at least 5 characters." },
                { status: 400 }
            );
        }
        if (trimmedMessage.length > 5000) {
            return NextResponse.json(
                { error: "Message is too long (maximum 5000 characters)." },
                { status: 400 }
            );
        }

        // Recipient email
        const recipientEmail = process.env.CONTACT_EMAIL || "singhjyatin@gmail.com";
        const emailSubject = trimmedSubject
            ? `[Portfolio] ${trimmedSubject}`
            : `New Message from ${trimmedName} via Portfolio`;

        let emailDelivered = false;
        let databaseSaved = false;
        const deliveryErrors: string[] = [];

        // 3. Channel A: Send via Resend Email Service if configured
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            try {
                const resendFrom = process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>";
                const htmlContent = `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #0f172a; padding-bottom: 12px;">New Portfolio Contact Message</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; width: 90px;">From:</td>
                                <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 600;">${sanitizeText(trimmedName)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email:</td>
                                <td style="padding: 8px 0; color: #0f172a; font-size: 15px;"><a href="mailto:${sanitizeText(trimmedEmail)}" style="color: #0284c7; text-decoration: none;">${sanitizeText(trimmedEmail)}</a></td>
                            </tr>
                            ${trimmedSubject ? `
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Subject:</td>
                                <td style="padding: 8px 0; color: #0f172a; font-size: 15px;">${sanitizeText(trimmedSubject)}</td>
                            </tr>
                            ` : ""}
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Sent At:</td>
                                <td style="padding: 8px 0; color: #64748b; font-size: 13px;">${new Date().toUTCString()}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                            <h3 style="color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message:</h3>
                            <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${sanitizeText(trimmedMessage)}</div>
                        </div>
                    </div>
                `;

                const resendRes = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${resendApiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: resendFrom,
                        to: [recipientEmail],
                        reply_to: trimmedEmail,
                        subject: emailSubject,
                        html: htmlContent,
                    }),
                });

                if (resendRes.ok) {
                    emailDelivered = true;
                } else {
                    const errorText = await resendRes.text();
                    deliveryErrors.push(`Resend error: ${errorText}`);
                }
            } catch (err) {
                deliveryErrors.push(`Resend fetch error: ${err instanceof Error ? err.message : String(err)}`);
            }
        }

        // 4. Channel B: Store in Supabase database / owner inbox if configured
        const supabase = getSupabaseAdmin();
        if (supabase) {
            try {
                const combinedMessage = `[Contact Form] ${trimmedSubject ? `Subject: ${trimmedSubject} | ` : ""}From: ${trimmedName} (${trimmedEmail})\n\n${trimmedMessage}`;
                const { error: dbError } = await supabase.from("chat_messages").insert([
                    {
                        guest_id: `contact-${trimmedEmail.slice(0, 16)}`,
                        guest_name: `${trimmedName} <${trimmedEmail}>`,
                        message: combinedMessage,
                        country_code: "WEB",
                    },
                ]);

                if (!dbError) {
                    databaseSaved = true;
                } else {
                    deliveryErrors.push(`Supabase error: ${dbError.message}`);
                }
            } catch (err) {
                deliveryErrors.push(`Supabase insert error: ${err instanceof Error ? err.message : String(err)}`);
            }
        }

        // 5. Development Mode Fallback / Logger
        const isDev = process.env.NODE_ENV !== "production";
        if (isDev && !emailDelivered && !databaseSaved) {
            console.log("-----------------------------------------");
            console.log("📬 DEV CONTACT FORM SUBMISSION RECEIVED:");
            console.log(`From: ${trimmedName} <${trimmedEmail}>`);
            console.log(`Subject: ${trimmedSubject || "(None)"}`);
            console.log(`Message: ${trimmedMessage}`);
            console.log(`Destination: ${recipientEmail}`);
            console.log("-----------------------------------------");
            // In dev mode, permit testing without throwing if external services are unconfigured
            return NextResponse.json({
                success: true,
                message: "Message received in development mode.",
                devNotice: "Configuring RESEND_API_KEY will enable live email delivery to " + recipientEmail,
            });
        }

        // 6. Verify at least one delivery channel succeeded
        if (!emailDelivered && !databaseSaved) {
            console.error("Message delivery failed:", deliveryErrors);
            return NextResponse.json(
                {
                    error:
                        "Could not deliver your message due to an unconfigured delivery service. Please email directly at " +
                        recipientEmail,
                    detail: isDev ? deliveryErrors.join("; ") : undefined,
                },
                { status: 503 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Your message has been sent successfully. Thank you for reaching out!",
            delivery: {
                email: emailDelivered,
                inbox: databaseSaved,
            },
        });
    } catch (error) {
        console.error("Unexpected error in contact API:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred while sending your message. Please try again." },
            { status: 500 }
        );
    }
}
