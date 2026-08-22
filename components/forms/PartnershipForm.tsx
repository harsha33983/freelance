"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

const schema = z.object({
  orgName: z.string().min(2, "Organisation name required"),
  contactPerson: z.string().min(2, "Contact person required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  interestArea: z.string().min(1, "Please select area of interest"),
  message: z.string().min(10, "Please describe your interest (min 10 chars)"),
});
type FormData = z.infer<typeof schema>;

const interestAreas = [
  "Title Partner",
  "Platinum Partner",
  "Gold Partner",
  "Knowledge Partner",
  "Youth Partner",
  "Digital Partner",
  "Media Partner",
  "Community Partner",
  "CSR Partnership",
  "Founding Patron",
  "General Enquiry",
];

export default function PartnershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/partnership-proposal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setSubmitted(true); reset(); }
      else toast.error("Submission failed. Please try again.");
    } catch { toast.error("Network error."); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-gold" /></div>
      <h2 className="font-serif text-3xl font-semibold text-ink mb-3">Proposal Received!</h2>
      <div className="gold-rule mb-6" />
      <p className="text-ink-muted font-sans text-base max-w-md mx-auto">Thank you for your interest in partnering with the Mahotsav. Our Partnerships team will respond within 3 working days.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Organisation Name *</label>
          <input {...register("orgName")} placeholder="Your organisation / company name"
            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
          {errors.orgName && <p className="text-red-500 text-xs mt-1">{errors.orgName.message}</p>}
        </div>
        {[
          { id: "contactPerson", label: "Contact Person", placeholder: "Full name" },
          { id: "email", label: "Email Address", placeholder: "your@email.com" },
          { id: "phone", label: "Phone Number", placeholder: "+91 00000 00000" },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">{f.label} *</label>
            <input {...register(f.id as keyof FormData)} placeholder={f.placeholder}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
            {errors[f.id as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[f.id as keyof FormData]?.message}</p>}
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Area of Interest *</label>
          <select {...register("interestArea")} className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white">
            <option value="">Select partnership type</option>
            {interestAreas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          {errors.interestArea && <p className="text-red-500 text-xs mt-1">{errors.interestArea.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Your Message *</label>
        <textarea {...register("message")} rows={5} placeholder="Describe your organisation and how you'd like to partner with the Mahotsav..."
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors resize-none" />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
        {loading ? "Submitting..." : <><Send size={14} /> Submit Proposal</>}
      </button>
    </form>
  );
}
