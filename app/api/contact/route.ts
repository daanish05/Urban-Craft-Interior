import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const hasEmailConfig =
      process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL;

    if (hasEmailConfig) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `UCI Website <${process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
        to: process.env.CONTACT_TO_EMAIL as string,
        subject: `New interior enquiry — ${data.name}`,
        html: `<h2>New UCI Enquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Property Type:</strong> ${data.propertyType}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          <p><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
          <p><strong>Requirement:</strong> ${data.requirement}</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
