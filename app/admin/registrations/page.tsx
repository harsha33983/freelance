"use client";

import { useAdminFetch } from "@/lib/useAdminFetch";
import AdminTable from "@/components/admin/AdminTable";
import { Download, Table as TableIcon, Database } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Registration {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  createdAt: string;
  [key: string]: unknown;
}

interface RegResponse {
  registrations: Registration[];
  stats: { total: number; byType: Record<string, number>; byCountry: Record<string, number> };
}

interface ExcelResponse {
  sheets: Record<string, any[]>;
  stats: { total: number };
}

export default function RegistrationsPage() {
  const [viewMode, setViewMode] = useState<"database" | "excel">("excel"); // Default to excel since db might be unconfigured
  const [activeSheet, setActiveSheet] = useState<string>("");

  // Fetch from database
  const dbData = useAdminFetch<RegResponse>("/api/admin/registrations", {
    enabled: viewMode === "database",
  });

  // Fetch from excel
  const excelData = useAdminFetch<ExcelResponse>("/api/admin/registrations/excel", {
    enabled: viewMode === "excel",
  });

  const handleCSV = () => {
    const token = localStorage.getItem("bgvm_admin_token");
    const url = `/api/admin/registrations?format=csv`;
    fetch(url, { headers: { Authorization: `Bearer ${token ?? ""}` } })
      .then((res) => {
        if (!res.ok) throw new Error("Export failed");
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "registrations.csv";
        a.click();
      })
      .catch(() => toast.error("Database CSV Export Failed. Try downloading Excel instead."));
  };

  const handleExcelDownload = () => {
    const token = localStorage.getItem("bgvm_admin_token");
    const url = `/api/admin/registrations/excel?download=true`;
    toast.loading("Downloading Excel...", { id: "excel-dl" });
    fetch(url, { headers: { Authorization: `Bearer ${token ?? ""}` } })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to download");
        }
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "bgvm2027_registrations.xlsx";
        a.click();
        toast.success("Downloaded successfully", { id: "excel-dl" });
      })
      .catch((err) => toast.error(err.message, { id: "excel-dl" }));
  };

  // Set default active sheet if excel data loads
  useEffect(() => {
    if (viewMode === "excel" && excelData.data?.sheets && !activeSheet) {
      const sheets = Object.keys(excelData.data.sheets);
      if (sheets.length > 0) setActiveSheet(sheets[0]);
    }
  }, [viewMode, excelData.data, activeSheet]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">Registrations</h1>
          <p className="text-ink-muted text-sm font-sans mt-0.5">
            {viewMode === "excel" 
              ? `${excelData.data?.stats.total ?? "…"} total registrations (Excel)`
              : `${dbData.data?.stats.total ?? "…"} total registrations (Database)`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-sm mr-2">
            <button
              onClick={() => setViewMode("database")}
              className={`px-3 py-1.5 text-xs font-semibold font-sans rounded-sm flex items-center gap-1.5 transition-colors ${
                viewMode === "database" ? "bg-white shadow-sm text-ink" : "text-gray-500 hover:text-ink"
              }`}
            >
              <Database size={14} /> Database
            </button>
            <button
              onClick={() => setViewMode("excel")}
              className={`px-3 py-1.5 text-xs font-semibold font-sans rounded-sm flex items-center gap-1.5 transition-colors ${
                viewMode === "excel" ? "bg-white shadow-sm text-ink" : "text-gray-500 hover:text-ink"
              }`}
            >
              <TableIcon size={14} /> Excel Preview
            </button>
          </div>
          
          {viewMode === "database" && (
            <button onClick={handleCSV} className="btn-outline-gold flex items-center gap-2 text-sm">
              <Download size={14} /> Export CSV
            </button>
          )}
          
          <button onClick={handleExcelDownload} className="btn-gold flex items-center gap-2 text-sm">
            <Download size={14} /> Download Excel
          </button>
        </div>
      </div>

      {viewMode === "database" && (
        <>
          {dbData.data?.stats.byType && (
            <div className="flex flex-wrap gap-3 mb-6">
              {Object.entries(dbData.data.stats.byType).map(([type, count]) => (
                <span key={type} className="px-3 py-1 bg-gold/10 text-gold rounded-sm text-xs font-semibold font-sans capitalize">
                  {type}: {count}
                </span>
              ))}
            </div>
          )}

          {dbData.error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-sm text-sm mb-6 border border-red-100">
              Database connection failed. Please use "Excel Preview" mode to view locally stored registrations.
            </div>
          )}

          <AdminTable<Registration>
            loading={dbData.loading}
            rows={dbData.data?.registrations ?? []}
            keyField="id"
            emptyMessage="No registrations yet (or DB not connected)."
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
              { key: "type", header: "Type", render: (r) => <span className="capitalize font-semibold text-gold">{r.type}</span> },
              { key: "country", header: "Country" },
              { key: "city", header: "City" },
              { key: "phone", header: "Phone" },
              {
                key: "createdAt", header: "Date",
                render: (r) => <span className="text-ink-muted">{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>,
              },
            ]}
          />
        </>
      )}

      {viewMode === "excel" && (
        <>
          {excelData.error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-sm text-sm mb-6 border border-red-100">
              Failed to read local Excel file. {excelData.error}
            </div>
          )}
          
          {excelData.data?.sheets && (
            <div className="flex gap-2 mb-4 border-b border-gray-200 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
              {Object.keys(excelData.data.sheets).map((sheet) => (
                <button
                  key={sheet}
                  onClick={() => setActiveSheet(sheet)}
                  className={`px-4 py-2 text-sm font-semibold font-sans border-b-2 transition-colors flex-shrink-0 ${
                    activeSheet === sheet ? "border-gold text-gold" : "border-transparent text-gray-500 hover:text-ink"
                  }`}
                >
                  {sheet} ({excelData.data?.sheets[sheet].length})
                </button>
              ))}
            </div>
          )}

          {activeSheet && excelData.data?.sheets[activeSheet] && (
            <div className="overflow-x-auto border border-gray-100 rounded-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-ink-muted text-xs font-semibold uppercase tracking-wider font-sans">
                    {/* Extract headers dynamically from the first row */}
                    {Object.keys(excelData.data.sheets[activeSheet][0] || {}).map((header) => (
                      <th key={header} className="p-4 border-b border-gray-100 whitespace-nowrap">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.data.sheets[activeSheet].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0 text-sm font-sans text-ink-body">
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className="p-4 whitespace-nowrap">{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                  {excelData.data.sheets[activeSheet].length === 0 && (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-ink-muted font-sans text-sm">
                        No records in this sheet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
