import React from "react";
import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PropertyForm isNew={true} />
    </div>
  );
}
