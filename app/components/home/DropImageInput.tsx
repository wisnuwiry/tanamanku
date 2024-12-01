"use client";

import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";

import IcUpload from "../icons/IcUpload";

type DropImageInputProps = {
  id: string;
  onChange?: (file: File | null) => void; // File handler type
};

export default function DropImageInput({ id, onChange }: DropImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // Handle drag-and-drop event
  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      if (onChange) {
        onChange(file);
      }
    }
  };

  // Handle file input change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      if (onChange) {
        onChange(file);
      }
    }
  };

  // Handle drag over to prevent default behavior
  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  // Cleanup the preview URL when component unmounts or the file changes
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div
      className="flex items-center justify-center w-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-600 dark:bg-neutral-800 hover:bg-gray-100 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-900">
        <input
          id={id}
          name={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="overflow-hidden rounded-lg w-full h-full">
            <img
              src={preview}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="size-16 mb-8">
              <IcUpload />
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG or JPG (Max. <span className="font-semibold">1MB</span>)
            </p>
          </div>
        )}
      </label>
    </div>
  );
}
