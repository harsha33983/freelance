import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import LiveVisitorCount from "@/components/ui/LiveVisitorCount";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Bhagavad Gita Vishwa Mahotsav 2027 team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Get in Touch"
        subtitle="We welcome your enquiries, suggestions, and expressions of interest. The Mahotsav team will respond within 2 working days."
      />

      <section className="bg-white section-pad">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink mb-6">Contact Details</h2>
              <div className="gold-rule-left mb-8" />
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">General Enquiries</p>
                    <a href="mailto:info@bgvmahotsav2027.org" className="text-gold hover:underline text-sm font-sans">
                      info@bgvmahotsav2027.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">Media & Press</p>
                    <a href="mailto:media@bgvmahotsav2027.org" className="text-gold hover:underline text-sm font-sans">
                      media@bgvmahotsav2027.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">Partnerships</p>
                    <a href="mailto:partners@bgvmahotsav2027.org" className="text-gold hover:underline text-sm font-sans">
                      partners@bgvmahotsav2027.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">Registered Office</p>
                    <p className="text-ink-muted text-sm font-sans leading-relaxed">
                      Bhagavad Gita Vishwa Mahotsav Trust<br />
                      Bengaluru, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>

              <LiveVisitorCount />

            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink mb-6">Send a Message</h2>
              <div className="gold-rule-left mb-8" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
