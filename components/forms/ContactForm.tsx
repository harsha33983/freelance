"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const categories = [
  "General Enquiry",
  "Registration Help",
  "Partnership Enquiry",
  "Media & Press",
  "Volunteering",
  "Technical Support",
  "Other",
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Message sent! We'll respond within 2 working days.");
        reset();
      } else {
        toast.error("Could not send message. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
          Full Name *
        </label>
        <input
          {...register("name")}
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
          placeholder="Your full name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
          Email Address *
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
          Category *
        </label>
        <select
          {...register("category")}
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white"
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
          Message *
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors resize-none"
          placeholder="How can we help you?"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full justify-center"
      >
        {loading ? "Sending..." : <><Send size={14} /> Send Message</>}
      </button>
    </form>
  );
}
