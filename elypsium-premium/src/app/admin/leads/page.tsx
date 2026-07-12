"use client";

import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search, Download, ExternalLink, Calendar, User, Phone, Mail, FileText } from "lucide-react";
import Link from "next/link";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  source: string;
  propertyId: string | null;
  status: string;
  createdAt: any;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Real-time listener for leads
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Lead));
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leads:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const term = searchTerm.toLowerCase();
    return (
      lead.firstName?.toLowerCase().includes(term) ||
      lead.lastName?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.phone?.includes(term) ||
      lead.source?.toLowerCase().includes(term)
    );
  });

  const exportCSV = () => {
    if (leads.length === 0) return;
    
    // Headers
    const headers = ["Date", "Name", "Email", "Phone", "Interest", "Source", "Property ID", "Message", "Status"];
    
    // Rows
    const rows = filteredLeads.map(lead => [
      lead.createdAt ? new Date(lead.createdAt.seconds * 1000).toLocaleString() : "N/A",
      `"${lead.firstName} ${lead.lastName}"`,
      lead.email,
      lead.phone || "",
      `"${lead.interest}"`,
      `"${lead.source}"`,
      lead.propertyId || "",
      `"${lead.message.replace(/"/g, '""')}"`, // escape quotes in message
      lead.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `elypsium_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-display font-bold text-text">Lead Management</h1>
          <p className="text-text-muted text-sm mt-1">View and manage inquiries from the public website.</p>
        </div>
        <button 
          onClick={exportCSV}
          disabled={leads.length === 0}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 text-text font-medium rounded-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search leads by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>
          <div className="text-sm text-text-muted font-medium">
            Total Leads: {filteredLeads.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-text-muted font-semibold uppercase tracking-wider text-xs border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Inquiry Details</th>
                <th className="px-6 py-4">Source / Property</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                      Loading leads...
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                    {searchTerm ? "No leads found matching your search." : "No leads have been submitted yet."}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3 mt-1 flex-shrink-0">
                          {lead.firstName.charAt(0)}{lead.lastName !== "-" ? lead.lastName.charAt(0) : ""}
                        </div>
                        <div>
                          <p className="font-semibold text-text">{lead.firstName} {lead.lastName !== "-" ? lead.lastName : ""}</p>
                          <div className="flex items-center text-text-muted text-xs mt-1">
                            <Mail className="w-3 h-3 mr-1" />
                            <a href={`mailto:${lead.email}`} className="hover:text-primary">{lead.email}</a>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center text-text-muted text-xs mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              <a href={`tel:${lead.phone}`} className="hover:text-primary">{lead.phone}</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="font-medium text-text text-sm mb-1">{lead.interest}</p>
                        <p className="text-text-muted text-xs line-clamp-2" title={lead.message}>
                          "{lead.message}"
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                        {lead.source}
                      </span>
                      {lead.propertyId && (
                        <div className="text-xs text-text-muted flex items-center mt-1">
                          <FileText className="w-3 h-3 mr-1" />
                          <span className="font-mono">{lead.propertyId.substring(0, 8)}...</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-muted text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {lead.createdAt ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === "New" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {lead.status || "New"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
