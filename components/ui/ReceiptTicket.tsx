import React, { useRef } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

interface ReceiptProps {
  registrationId: string;
  name: string;
  email: string;
  type: string;
  country: string;
}

export default function ReceiptTicket({
  registrationId,
  name,
  email,
  type,
  country,
}: ReceiptProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    const toastId = toast.loading("Generating PDF receipt...");
    try {
      // Use html2canvas to capture the ticket
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      
      // Calculate PDF dimensions (A4 size)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 10, pdfWidth, pdfHeight);
      pdf.save(`BGVM2027_Receipt_${registrationId}.pdf`);
      toast.success("Receipt downloaded successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF.", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Visual Ticket container */}
      <div 
        ref={ticketRef} 
        className="w-full max-w-md bg-white border-2 border-gold rounded-sm shadow-gold-lg overflow-hidden relative mb-8 mx-auto"
        style={{ minHeight: "400px" }}
      >
        {/* Header */}
        <div className="bg-gold-gradient p-6 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src="/bh4.png" 
              alt="Bhagavad Gita Vishwa Mahotsav 2027" 
              className="h-16 object-contain filter drop-shadow-md"
              crossOrigin="anonymous" 
            />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
            Registration Receipt
          </h2>
          <p className="text-white/90 text-xs font-sans tracking-widest uppercase mt-1">
            27 February 2027
          </p>
        </div>

        {/* Body */}
        <div className="p-8 pb-10 bg-[url('/p6.jpg')] bg-cover bg-center bg-no-repeat relative">
          {/* Light overlay to make text readable over background */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="text-center mb-6">
              <p className="text-xs text-ink-muted uppercase tracking-wider font-semibold">
                Registration ID
              </p>
              <p className="font-serif text-xl font-bold text-gold tracking-widest">
                {registrationId}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold">Name</span>
                <span className="text-sm font-semibold text-ink">{name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold">Email</span>
                <span className="text-sm font-semibold text-ink">{email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold">Type</span>
                <span className="text-sm font-semibold text-ink capitalize">{type}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold">Country</span>
                <span className="text-sm font-semibold text-ink">{country}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold">Date</span>
                <span className="text-sm font-semibold text-ink">{new Date().toLocaleDateString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-xs text-ink-muted italic font-serif leading-relaxed">
                "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality."
              </p>
              <p className="text-[10px] text-ink-muted mt-2 font-bold">— B.G. 18.78</p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleDownload} className="btn-gold flex items-center gap-2 px-8 py-3 w-full sm:w-auto justify-center">
        <Download size={18} />
        Download PDF Receipt
      </button>
    </div>
  );
}
