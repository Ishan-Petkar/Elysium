"use client";

import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import { Property } from "@/lib/types";
import { logAuditAction } from "@/lib/audit";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Building } from "lucide-react";

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, COLLECTIONS.PROPERTIES),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const propsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          propertyId: doc.id,
          // Convert Firestore Timestamps to Date objects
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Property;
      });
      setProperties(propsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSoftDelete = async (propertyId: string, currentStatus: boolean) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'restore' : 'delete'} this property?`)) return;
    
    try {
      await updateDoc(doc(db, COLLECTIONS.PROPERTIES, propertyId), {
        isDeleted: !currentStatus,
        updatedAt: new Date()
      });
      if (user) {
        await logAuditAction(
          user.uid, 
          !currentStatus ? "SOFT_DELETE_PROPERTY" : "RESTORE_PROPERTY", 
          propertyId
        );
      }
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading properties...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold text-text">Properties</h1>
        <Link
          href="/admin/properties/new"
          className="flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-[#465a26] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Property</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Type / Trans.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    No properties found. Click &quot;Add Property&quot; to create one.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.propertyId} className={property.isDeleted ? "opacity-50 bg-gray-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative rounded overflow-hidden bg-gray-100">
                          {property.thumbnailUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img className="h-10 w-10 object-cover" src={property.thumbnailUrl} alt={property.title} />
                          ) : (
                            <div className="h-10 w-10 flex items-center justify-center bg-gray-200">
                              <Building className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text">{property.title}</div>
                          <div className="text-xs text-text-muted">{property.propertyId.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text">{property.locality}</div>
                      <div className="text-sm text-text-muted">{property.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text">{property.propertyType}</div>
                      <div className="text-sm text-text-muted">{property.transactionType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text font-medium">
                      ₹{property.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${property.status === 'Published' ? 'bg-green-100 text-green-800' : 
                          property.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {property.status}
                      </span>
                      {property.isDeleted && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Deleted
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <Link href={`/properties/${property.slug}`} target="_blank" className="text-gray-400 hover:text-primary transition-colors" title="View on site">
                          <Eye className="h-5 w-5" />
                        </Link>
                        <Link href={`/admin/properties/${property.propertyId}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button 
                          onClick={() => handleSoftDelete(property.propertyId, property.isDeleted)}
                          className={`transition-colors ${property.isDeleted ? 'text-green-500 hover:text-green-700' : 'text-gray-400 hover:text-red-600'}`}
                          title={property.isDeleted ? "Restore" : "Delete"}
                        >
                          {property.isDeleted ? <span className="text-xs uppercase tracking-wider font-bold">Restore</span> : <Trash2 className="h-5 w-5" />}
                        </button>
                      </div>
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
