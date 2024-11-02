import React from "react";

function UploadStatus({ files, maxFiles }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
      <p className="text-gray-700">
        Selected Images:
        <span className="font-medium ml-1 text-gray-900">{files.length}</span>
        <span className="text-gray-500">/{maxFiles}</span>
      </p>
      {files.length > 0 && (
        <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${(files.length / maxFiles) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default UploadStatus;
