import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import { SplitText } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/data";
import { LOGO } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact — Urban Craft Interior",
  description:
    "Get a free interior design consultation. UCI designs, manufactures and executes your interior from 3D to reality.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f3ede2]">
      <section className="px-6 pb-16 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <Image
            src={LOGO.onLight}
            alt="Urban Craft Interior logo"
            width={1600}
            height={1600}
            className="mb-10 h-16 w-16 object-contain md:h-20 md:w-20"
          />
          <p className="eyebrow mb-6 text-[#8b8174]">Contact UCI</p>
          <SplitText
            text="LET'S CREATE YOUR INTERIOR."
            className="display text-[11vw] leading-[0.88] text-[#161513] md:text-[6vw]"
          />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#8b8174] md:text-lg">
            Tell us what you have in mind. We&apos;ll help you take it from idea to
            reality — designed, manufactured and executed by UCI.
          </p>
        </div>
      </section>

      <section className="px-6 pb-32 md:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="space-y-6 rounded-2xl border border-[#161513]/10 bg-[#faf7f0] p-8">
              <div>
                <p className="eyebrow mb-3 text-[#c2a878]">Studio</p>
                <p className="text-sm text-[#161513]">{BRAND.address}</p>
              </div>
              <div>
                <p className="eyebrow mb-3 text-[#c2a878]">Phone</p>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                  className="text-sm text-[#161513] hover:text-[#c2a878]"
                > 
                  {BRAND.phone}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-3 text-[#c2a878]">Email</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm text-[#161513] hover:text-[#c2a878]"
                >
                  {BRAND.email}
                </a>
              </div>
              <div className="border-t border-[#161513]/10 pt-6">
                <p className="eyebrow mb-3 text-[#c2a878]">WhatsApp</p>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#161513] hover:text-[#c2a878]"
                >
                  Message UCI on WhatsApp →
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
