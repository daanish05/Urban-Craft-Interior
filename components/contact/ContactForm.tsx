"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { BRAND } from "@/lib/data";

const PROPERTY_TYPES = ["1BHK", "2BHK", "3BHK+", "Commercial", "Other"];
const BUDGETS = [
  "Under ₹2 Lakh",
  "₹2–5 Lakh",
  "₹5–10 Lakh",
  "₹10–20 Lakh",
  "₹20 Lakh+",
];
const CONTACT_METHODS = ["Phone Call", "WhatsApp", "Email"];

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: "1BHK",
      budget: "₹5–10 Lakh",
      preferredContact: "WhatsApp",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const whatsappHref = () => {
    const v = getValues();
    const msg = [
      `Hi UCI, I'd like a free consultation.`,
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      `Location: ${v.location}`,
      `Property: ${v.propertyType}`,
      `Budget: ${v.budget}`,
      `Requirement: ${v.requirement}`,
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  const label =
    "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-fg-secondary";
  const input =
    "w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-fg-primary outline-none transition-colors [color-scheme:light] dark:[color-scheme:dark] focus:border-gold placeholder:text-fg-secondary/60";
  const error = "mt-1 text-xs text-[#a0522d] dark:text-[#e0a080]";

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-charcoal p-10 text-center text-ivory">
        <span className="display text-5xl text-gold">✓</span>
        <h3 className="display mt-6 text-3xl">
          Thank you, {getValues("name")}.
        </h3>
        <p className="mt-4 max-w-md text-sm text-ivory/70">
          Your consultation request has been received. We&apos;ll be in touch
          soon to help you take your space from idea to reality.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Name</label>
          <input
            className={input}
            placeholder="Your full name"
            {...register("name")}
          />
          {errors.name && <p className={error}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={label}>Phone</label>
          <input className={input} placeholder="+91" {...register("phone")} />
          {errors.phone && <p className={error}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={label}>Email</label>
          <input
            className={input}
            placeholder="you@email.com"
            {...register("email")}
          />
          {errors.email && <p className={error}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={label}>Location</label>
          <input
            className={input}
            placeholder="City / Area"
            {...register("location")}
          />
          {errors.location && (
            <p className={error}>{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Property Type</label>
          <select className={input} {...register("propertyType")}>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Budget</label>
          <select className={input} {...register("budget")}>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Project Requirement</label>
        <textarea
          rows={4}
          className={input}
          placeholder="Tell us what you have in mind…"
          {...register("requirement")}
        />
        {errors.requirement && (
          <p className={error}>{errors.requirement.message}</p>
        )}
      </div>

      <div>
        <label className={label}>Preferred Contact</label>
        <div className="flex flex-wrap gap-3">
          {CONTACT_METHODS.map((m) => (
            <label
              key={m}
              // className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.12em] has-[:checked]:border-gold has-[:checked]:bg-gold/15"
              className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.12em] text-fg-primary has-[:checked]:border-gold has-[:checked]:bg-gold/15"
            
            >
              <input
                type="radio"
                value={m}
                defaultChecked={m === "WhatsApp"}
                className="accent-gold"
                {...register("preferredContact")}
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-[#a0522d] dark:text-[#e0a080]">
          Something went wrong. Please try again or reach us on WhatsApp.
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        {/* <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-fg-primary px-8 py-4 text-sm font-medium text-fg-inverse transition-colors hover:bg-gold hover:text-charcoal disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Get Free Consultation"}
        </button> */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full border border-border px-8 py-4 text-sm font-medium text-fg-primary transition-colors hover:bg-fg-primary hover:text-fg-inverse disabled:opacity-50"
        >
          Book Site Visit
        </button>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border px-8 py-4 text-sm font-medium text-fg-primary transition-colors hover:bg-fg-primary hover:text-fg-inverse"
        >
          WhatsApp Us
        </a>
      </div>
    </form>
  );
}
