import React from "react";

function ImagePreviewList({ predictions }) {
  return (
    <div className="mt-4">
      {predictions.map((pred, index) => (
        <div key={index} className="p-2 border rounded-md bg-gray-100 mb-2">
          <p className="font-semibold">{pred.file}</p>
          <ul>
            {pred.predictions.map((prediction, i) => (
              <li key={i} className="text-gray-700">
                {prediction.className}: {Math.round(prediction.probability * 100)}%
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ImagePreviewList;
