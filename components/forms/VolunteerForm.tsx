"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  city: z.string().min(1, "City required"),
  country: z.string().min(1, "Country required"),
  area: z.string().min(1, "Please select an area of interest"),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const areas = [
  "Registration & Guest Services",
  "Programme Support",
  "Technical & AV",
  "Media & Documentation",
  "Venue & Logistics",
  "Translation & Interpretation",
  "Youth Programme",
  "Cultural Programme",
  "Website & Digital",
  "General Volunteer",
];

const countries = ["India","United Kingdom","United States","Australia","Canada","Germany","Japan","Brazil","South Africa","France","Russia","Singapore","Israel","New Zealand","UAE","Kenya","Argentina","Other"];

export default function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/volunteer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setSubmitted(true); reset(); }
      else toast.error("Submission failed. Please try again.");
    } catch { toast.error("Network error."); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-gold" /></div>
      <h2 className="font-serif text-3xl font-semibold text-ink mb-3">Application Received!</h2>
      <div className="gold-rule mb-6" />
      <p className="text-ink-muted font-sans text-base max-w-md mx-auto">Thank you for offering your seva. Our volunteer coordinator will be in touch with you within 5 working days.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { id: "name", label: "Full Name", placeholder: "Your full name", type: "text" },
          { id: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
          { id: "phone", label: "Phone Number", placeholder: "+91 00000 00000", type: "tel" },
          { id: "city", label: "City", placeholder: "Your city", type: "text" },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">{f.label} *</label>
            <input {...register(f.id as keyof FormData)} type={f.type} placeholder={f.placeholder}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors" />
            {errors[f.id as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[f.id as keyof FormData]?.message}</p>}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Country *</label>
        <select {...register("country")} className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white">
          <option value="">Select country</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Area of Interest *</label>
        <select {...register("area")} className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white">
          <option value="">Select an area</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">Additional Message</label>
        <textarea {...register("message")} rows={4} placeholder="Tell us about your skills, availability, or any other relevant information..."
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors resize-none" />
      </div>

      <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
        {loading ? "Submitting..." : <><Send size={14} /> Submit Application</>}
      </button>
    </form>
  );
}
