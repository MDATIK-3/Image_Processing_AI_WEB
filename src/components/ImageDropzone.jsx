import React from "react";
import Drop_SVG from "./Drop_SVG";

function ImageDropzone({ onDrop, onSelect, loading }) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onClick={() =>
        !loading && document.querySelector("input[type=file]").click()
      }
      onDragOver={handleDragOver}
      onDrop={(event) => {
        if (!loading) onDrop(event);
      }}
      className={`border-2 border-dashed border-gray-400 
        rounded-lg p-8 text-center 
        bg-gradient-to-br from-gray-50 to-gray-100
        cursor-pointer mb-4 
        relative overflow-hidden ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      aria-label="Upload images"
    >
      <div className="relative z-10 space-y-3">
        <Drop_SVG />
        <div>
          <p className="text-gray-600 font-medium group-hover:text-gray-700">
            Drag and drop images here
          </p>
          <p className="text-sm text-gray-500 group-hover:text-gray-600">
            or click to select files
          </p>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onSelect}
        className="hidden"
        disabled={loading}
      />
    </div>
  );
}

export default ImageDropzone;
