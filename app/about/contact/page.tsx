import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import LiveVisitorCount from "@/components/ui/LiveVisitorCount";
import { Mail, Phone, MapPin, Users, MessageCircle, Camera, PlayCircle } from "lucide-react";

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
              <h2 className="font-serif text-2xl font-semibold text-ink mb-6">Social Media Accounts</h2>
              <div className="gold-rule-left mb-8" />
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">Facebook</p>
                    <a href="https://www.facebook.com/divineauraworld9" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm font-sans">
                      @divineauraworld9
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">X (Twitter)</p>
                    <a href="https://twitter.com/Divineauraworld" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm font-sans">
                      @Divineauraworld
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Camera size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">Instagram</p>
                    <a href="https://www.instagram.com/divine_aura.world " target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm font-sans">
                      @divine_aura.world 
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <PlayCircle size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">YouTube</p>
                    <a href="https://www.youtube.com/@Divineauraworld" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm font-sans">
                      @Divineauraworld
                    </a>
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
