import { RiImageAddLine } from "react-icons/ri";

import React from "react";

const Dropzone = ({
  setSelectedImage,
}: {
  setSelectedImage: (file?: File) => void;
}) => {
  return (
    <div className="mt-16">
      <input
        onChange={(e) => setSelectedImage(e.target.files?.[0])}
        className="hidden"
        type="file"
        id="file-input"
        accept="image/*"
      />
      <label
        htmlFor="file-input"
        className="bg-card text-card-foreground relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-[#dadada] px-10 py-10 transition-colors duration-200"
      >
        <div className="border-border absolute inset-4 rounded-2xl border border-dashed"></div>
        <p>Upload a file</p>
        <RiImageAddLine className="h-10 w-10" />
      </label>
    </div>
  );
};

export default Dropzone;
