"use client";

import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { UPLOAD_LIMITS, STORAGE_PATHS } from "@/lib/constants";
import { X, UploadCloud, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onChange, maxImages = UPLOAD_LIMITS.MAX_IMAGES_PER_PROPERTY }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images.`);
      return;
    }

    setUploading(true);
    setError("");
    let newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!(UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
        setError(`File type ${file.type} is not allowed.`);
        continue;
      }

      try {
        // Compress image
        const options = {
          maxSizeMB: 1, // Target size is 1MB or less, max limit from constants is 5MB
          maxWidthOrHeight: UPLOAD_LIMITS.IMAGE_MAX_WIDTH_PX,
          useWebWorker: true,
          fileType: "image/webp" as string,
        };
        
        const compressedFile = await imageCompression(file, options);
        
        // Generate unique filename
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
        const storageRef = ref(storage, `${STORAGE_PATHS.PROPERTY_IMAGES}/${filename}`);
        
        // Upload
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);
        
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(Math.round(p));
            },
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              newUrls.push(downloadURL);
              resolve();
            }
          );
        });

      } catch (err: any) {
        console.error("Upload error:", err);
        setError("Failed to upload image.");
      }
    }

    onChange([...images, ...newUrls]);
    setUploading(false);
    setProgress(0);
    // Reset file input
    e.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-error text-sm">{error}</p>}
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((url, idx) => (
          <div key={idx} className="relative group aspect-square rounded-md overflow-hidden bg-gray-100 border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={url} 
              alt={`Property image ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
            {idx === 0 && (
              <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                Thumbnail
              </span>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <label className="relative aspect-square rounded-md border-2 border-dashed border-gray-300 hover:border-primary transition-colors flex flex-col items-center justify-center cursor-pointer bg-gray-50">
            {uploading ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-xs text-text-muted">{progress}%</span>
              </div>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-text-muted">Upload Image</span>
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        )}
      </div>
      <p className="text-xs text-text-muted">
        First image is the thumbnail. Max {maxImages} images. Auto-compressed to WebP format.
      </p>
    </div>
  );
}
