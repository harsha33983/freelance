"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle, User, Users, Building2, Zap } from "lucide-react";
import ReceiptTicket from "@/components/ui/ReceiptTicket";

// ── Schemas ────────────────────────────────────────────────────────────────
const baseSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  country: z.string().min(1, "Country required"),
  city: z.string().min(1, "City required"),
});

const schemas = {
  individual: baseSchema,
  institution: baseSchema.extend({
    institutionName: z.string().min(2, "Institution name is required"),
    designation: z.string().min(2, "Designation is required"),
  }),
};

type RegistrationType = keyof typeof schemas;

// Any type that encompasses all possible fields for the form
type Step2Data = z.infer<typeof baseSchema> & {
  institutionName?: string;
  designation?: string;
};

const regTypes: { value: RegistrationType; label: string; desc: string; icon: React.ElementType }[] = [
  { value: "individual", label: "Individual", desc: "Single participant registration", icon: User },
  { value: "institution", label: "Institution", desc: "School, university, or organisation", icon: Building2 },
];

const countries = [
  "India", "United Kingdom", "United States", "Australia", "Canada", "Germany",
  "Japan", "Brazil", "South Africa", "France", "Russia", "Singapore", "Israel",
  "New Zealand", "UAE", "Kenya", "Argentina", "Other",
];

export default function RegistrationForm({ isDonorFlow = false }: { isDonorFlow?: boolean }) {
  const [step, setStep] = useState(1);
  const [regType, setRegType] = useState<RegistrationType | null>(null);
  
  const displayedRegTypes = isDonorFlow 
    ? regTypes.filter((t) => ["individual", "institution"].includes(t.value))
    : regTypes;
  const [submittedData, setSubmittedData] = useState<(Step2Data & { type: string; id: string }) | null>(null);
  const [loading, setLoading] = useState(false);

  // We re-initialize the form when regType changes by getting the correct schema
  const activeSchema = regType ? schemas[regType] : baseSchema;
  
  const form2 = useForm<Step2Data>({ 
    resolver: zodResolver(activeSchema as any), // Type assertion to pass dynamic schema
    mode: "onSubmit",
  });
  
  const { register, handleSubmit, formState: { errors }, reset } = form2;

  const handleStep1 = () => {
    if (!regType) { toast.error("Please select a registration type."); return; }
    // Reset form validation state when switching types
    reset();
    setStep(2);
  };

  const onSubmit = async (data: Step2Data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: regType, ...data }),
      });
      if (res.ok) {
        const json = await res.json();
        setSubmittedData({ ...data, type: regType as string, id: json.id });
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
          type={submittedData.type}
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
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-10">
        {["Registration Type", "Your Details", "Confirmation"].map((label, i) => (
          <div key={label} className="flex items-center gap-3 flex-1">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-sans transition-all ${
              step > i + 1 ? "bg-gold border-gold text-ink" :
              step === i + 1 ? "border-gold text-gold" :
              "border-gray-200 text-gray-400"
            }`}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={`text-xs font-sans hidden sm:block ${step === i + 1 ? "text-gold font-semibold" : "text-ink-muted"}`}>
              {label}
            </span>
            {i < 2 && <div className={`flex-1 h-px ${step > i + 1 ? "bg-gold" : "bg-gray-100"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1 — Type selector */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-serif text-2xl font-semibold text-ink mb-2">Choose Your Registration Type</h2>
            <p className="text-ink-muted text-sm font-sans mb-8">Select how you wish to participate in the Mahotsav.</p>
            <div className="space-y-3 mb-8">
              {displayedRegTypes.map(({ value, label, desc, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRegType(value)}
                  className={`w-full flex items-center gap-4 p-5 rounded-sm border-2 text-left transition-all duration-200 ${
                    regType === value
                      ? "border-gold bg-gold/5"
                      : "border-gray-100 hover:border-gold/50 hover:bg-cream"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${regType === value ? "bg-gold/20" : "bg-gray-100"}`}>
                    <Icon size={18} className={regType === value ? "text-gold" : "text-gray-500"} />
                  </div>
                  <div>
                    <p className={`font-sans font-semibold text-sm ${regType === value ? "text-ink" : "text-ink-body"}`}>{label}</p>
                    <p className="text-ink-muted text-xs font-sans mt-0.5">{desc}</p>
                  </div>
                  {regType === value && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <span className="text-ink text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button onClick={handleStep1} className="btn-gold w-full justify-center">
              Continue <ChevronRight size={16} />
            </button>
          </motion.div>
        )}

        {/* Step 2 — Details form */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-serif text-2xl font-semibold text-ink mb-2">Your Details</h2>
            <p className="text-ink-muted text-sm font-sans mb-8">
              Registering as: <span className="text-gold font-semibold capitalize">{regType}</span>
            </p>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              </div>

              {/* Dynamic Fields based on registration type */}
              {regType === "institution" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                      Institution Name *
                    </label>
                    <input
                      {...register("institutionName")}
                      className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                      placeholder="School or University"
                    />
                    {errors.institutionName && <p className="text-red-500 text-xs mt-1">{errors.institutionName?.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                      Your Designation *
                    </label>
                    <input
                      {...register("designation")}
                      className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                      placeholder="e.g. Principal, Director"
                    />
                    {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation?.message}</p>}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline-gold"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold flex-1 justify-center"
                >
                  {loading ? "Registering..." : "Complete Registration →"}
                </button>
              </div>

              <p className="text-center text-xs text-ink-muted font-sans pt-2">
                A confirmation email will be sent immediately after registration.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
