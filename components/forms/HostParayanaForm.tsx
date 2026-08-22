"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

const schema = z.object({
  communityName: z.string().min(2, "Organisation/community name required"),
  contactPerson: z.string().min(2, "Contact person name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  city: z.string().min(1, "City required"),
  country: z.string().min(1, "Country required"),
  expectedParticipants: z.string().min(1, "Expected number of participants required"),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const countries = ["India","United Kingdom","United States","Australia","Canada","Germany","Japan","Brazil","South Africa","France","Russia","Singapore","Israel","New Zealand","UAE","Kenya","Argentina","Other"];

export default function HostParayanaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/host-parayana", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setSubmitted(true); reset(); }
      else toast.error("Submission failed. Please try again.");
    } catch { toast.error("Network error."); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-gold" /></div>
      <h2 className="font-serif text-3xl font-semibold text-ink mb-3">Request Received!</h2>
      <div className="gold-rule mb-6" />
      <p className="text-ink-muted font-sans text-base max-w-md mx-auto">Thank you for your interest in hosting a Gita Parayana. Our team will contact you within 5 working days with a hosting kit and guidance.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Organisation / Community Name *</label>
          <input {...register("communityName")} placeholder="Temple, school, organisation name"
            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
          {errors.communityName && <p className="text-red-500 text-xs mt-1">{errors.communityName.message}</p>}
        </div>
        {[
          { id: "contactPerson", label: "Contact Person", placeholder: "Full name" },
          { id: "email", label: "Email Address", placeholder: "your@email.com" },
          { id: "phone", label: "Phone Number", placeholder: "+91 00000 00000" },
          { id: "city", label: "City", placeholder: "City where event will be held" },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">{f.label} *</label>
            <input {...register(f.id as keyof FormData)} placeholder={f.placeholder}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
            {errors[f.id as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[f.id as keyof FormData]?.message}</p>}
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Country *</label>
          <select {...register("country")} className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white">
            <option value="">Select country</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Expected Participants *</label>
          <input {...register("expectedParticipants")} placeholder="e.g. 50" type="number" min="1"
            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
          {errors.expectedParticipants && <p className="text-red-500 text-xs mt-1">{errors.expectedParticipants.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Preferred Date</label>
          <input {...register("preferredDate")} type="date" min="2026-12-20" max="2027-03-31"
            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Additional Notes</label>
        <textarea {...register("message")} rows={4} placeholder="Tell us about your community, venue, or any special requirements..."
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors resize-none" />
      </div>
      <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
        {loading ? "Submitting..." : <><Send size={14} /> Submit Request</>}
      </button>
    </form>
  );
}
