"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ReceiptTicket from "@/components/ui/ReceiptTicket";

// ── Schemas ────────────────────────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  country: z.string().min(1, "Country required"),
  city: z.string().min(1, "City required"),
  registrationType: z.enum(["Single", "Group", "Institute", "Foreigner"], {
    errorMap: () => ({ message: "Please select a registration type" })
  }),
  noOfPersons: z.coerce.number().min(1, "At least 1 person required"),
  assistance: z.array(z.string()).optional(),
  registerForEvent: z.array(z.string()).min(1, "Select at least one event"),
});

type FormData = z.infer<typeof formSchema>;

const countries = [
  "India", "United Kingdom", "United States", "Australia", "Canada", "Germany",
  "Japan", "Brazil", "South Africa", "France", "Russia", "Singapore", "Israel",
  "New Zealand", "UAE", "Kenya", "Argentina", "Other",
];

export default function RegistrationForm({ isDonorFlow = false }: { isDonorFlow?: boolean }) {
  const [submittedData, setSubmittedData] = useState<(FormData & { id: string }) | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({ 
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      assistance: [],
      registerForEvent: [],
    }
  });
  
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        setSubmittedData({ ...data, id: json.id });
        toast.success("Registration successful! Check your email for confirmation.");
      } else {
        const err = await res.json();
        toast.error(err.message || "Registration failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submittedData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl mx-auto py-8 px-4"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-gold" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-ink mb-2">Registration Complete!</h2>
          <p className="text-ink-muted font-sans text-sm max-w-md mx-auto">
            A confirmation email has been sent to your inbox. Please keep your receipt safe.
          </p>
        </div>

        <ReceiptTicket
          registrationId={submittedData.id}
          name={submittedData.name}
          email={submittedData.email}
          type={submittedData.registrationType}
          country={submittedData.country}
        />
        
        <div className="text-center mt-12">
          <p className="text-gold font-sans text-sm font-semibold tracking-wider uppercase">
            🔱 Hare Krishna • Welcome to the Movement
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold text-ink mb-2">Registration Details</h2>
        <p className="text-ink-muted text-sm font-sans">
          Please fill out the form below to register for the Mahotsav.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Full Name *
              </label>
              <input
                {...register("name")}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>}
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
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Phone Number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="+91 00000 00000"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                No of Persons *
              </label>
              <input
                {...register("noOfPersons")}
                type="number"
                min="1"
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="1"
              />
              {errors.noOfPersons && <p className="text-red-500 text-xs mt-1">{errors.noOfPersons?.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Registration Type *
              </label>
              <select
                {...register("registrationType")}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white"
              >
                <option value="">Select type</option>
                <option value="Single">Single</option>
                <option value="Group">Group</option>
                <option value="Institute">Institute</option>
                <option value="Foreigner">Foreigner</option>
              </select>
              {errors.registrationType && <p className="text-red-500 text-xs mt-1">{errors.registrationType?.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Country *
              </label>
              <select
                {...register("country")}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white"
              >
                <option value="">Select country</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country?.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
              City *
            </label>
            <input
              {...register("city")}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
              placeholder="Your city"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city?.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Assistance Required
              </label>
              <div className="space-y-2 mt-2">
                {["Visa", "Accommodation", "Local Transport"].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={item}
                      {...register("assistance")}
                      className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                    />
                    <span className="text-sm font-sans text-ink-body">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Register For Event *
              </label>
              <div className="space-y-2 mt-2">
                {["Curtain Raiser", "Mahotsav"].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={item}
                      {...register("registerForEvent")}
                      className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                    />
                    <span className="text-sm font-sans text-ink-body">{item}</span>
                  </label>
                ))}
              </div>
              {errors.registerForEvent && <p className="text-red-500 text-xs mt-1">{errors.registerForEvent?.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center"
            >
              {loading ? "Registering..." : "Complete Registration →"}
            </button>
          </div>

          <p className="text-center text-xs text-ink-muted font-sans pt-2">
            A confirmation email will be sent immediately after registration.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
