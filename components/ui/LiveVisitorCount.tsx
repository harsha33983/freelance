"use client";

import { useState, useEffect } from "react";
import { Users, Activity } from "lucide-react";

// Simple UUID generator for browser
function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function LiveVisitorCount({ className = "" }: { className?: string }) {
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [activeCount, setActiveCount] = useState<number>(0);

  useEffect(() => {
    // 1. Get or create Visitor ID
    let visitorId = localStorage.getItem("bgvm_visitor_id");
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!visitorId || !uuidRegex.test(visitorId)) {
      visitorId = generateUUID();
      localStorage.setItem("bgvm_visitor_id", visitorId);
    }

    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ visitorId }),
        });
        
        const data = await res.json();
        if (data && data.success) {
          setTotalCount(data.total);
          setActiveCount(data.active);
        }
      } catch (error) {
        console.error("Failed to update visitor count:", error);
      }
    };

    // Initial fetch
    fetchCounts();
    
    // Heartbeat every 15 seconds to keep "Active" status alive
    const interval = setInterval(fetchCounts, 15000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  if (totalCount === null) return (
    <div className={`bg-[#FAF8F2] border border-[#E8D6A3] rounded-xl p-8 flex items-center justify-center min-h-[300px] ${className}`}>
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 bg-[#D4AF37]/20 rounded-full"></div>
        <div className="h-4 w-32 bg-[#D4AF37]/20 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className={`bg-gradient-to-br from-[#FAF8F2] to-white border border-[#E8D6A3] rounded-xl p-8 md:p-12 flex flex-col justify-center min-h-[300px] shadow-sm relative overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#2F1B0C]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="text-center mb-8 relative z-10">
        <p className="text-[#A66A00] text-sm font-semibold tracking-[0.25em] uppercase mb-2">
          Global Movement
        </p>
        <h3 className="font-serif text-3xl md:text-4xl text-[#2F1B0C]">
          Live Community Stats
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        {/* Total Users */}
        <div className="bg-white rounded-lg p-6 border border-[#E8D6A3]/50 shadow-sm flex flex-col items-center text-center group hover:border-[#D4AF37] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users size={24} className="text-[#A66A00]" />
          </div>
          <p className="text-[#6B5A45] text-sm uppercase tracking-wider font-semibold mb-1">Total Users</p>
          <p className="font-serif text-4xl text-[#2F1B0C] font-bold">
            {totalCount.toLocaleString()}
          </p>
        </div>
        
        {/* Active Users */}
        <div className="bg-white rounded-lg p-6 border border-[#E8D6A3]/50 shadow-sm flex flex-col items-center text-center group hover:border-[#D4AF37] transition-colors relative overflow-hidden">
          {/* Pulsing indicator */}
          <div className="absolute top-4 right-4 flex items-center justify-center">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          
          <div className="w-12 h-12 rounded-full bg-[#FAF8F2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Activity size={24} className="text-[#A66A00]" />
          </div>
          <p className="text-[#6B5A45] text-sm uppercase tracking-wider font-semibold mb-1">Active Now</p>
          <p className="font-serif text-4xl text-[#2F1B0C] font-bold text-green-600">
            {activeCount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
