"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { Building, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { userData, role } = useAuth();

  const quickLinks = [
    { name: "Manage Properties", href: "/admin/properties", icon: Building, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "View Leads", href: "/admin/leads", icon: Users, color: "text-green-600", bg: "bg-green-100" },
    { name: "Testimonials", href: "/admin/testimonials", icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-display font-bold text-text mb-2">
          Welcome back, {userData?.name || "Admin"}!
        </h1>
        <p className="text-text-muted">
          Here&apos;s what&apos;s happening with Elypsium today. You are logged in as a{" "}
          <span className="font-semibold text-primary">{role}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center space-x-4"
            >
              <div className={`p-3 rounded-full ${link.bg}`}>
                <Icon className={`w-6 h-6 ${link.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-text">{link.name}</h3>
                <p className="text-sm text-text-muted">Click to view & manage</p>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Analytics placeholders - to be filled in Phase 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[300px] flex items-center justify-center">
          <p className="text-text-muted text-sm italic">Property Views Chart (Coming Soon)</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[300px] flex items-center justify-center">
          <p className="text-text-muted text-sm italic">Recent Leads Activity (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
}
