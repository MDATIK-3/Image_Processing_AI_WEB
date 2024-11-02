import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageDropzone from "./ImageDropzone";
import ImagePreviewList from "./ImagePreviewList";
import UploadStatus from "./UploadStatus";

function ImageUpload({ onUpload }) {
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const maxFiles = 5;
  const maxFileSize = 5 * 1024 * 1024; //5MB

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      toast.info("Loading AI model...");
      try {
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
      } catch (err) {
        setError("Failed to load model. Please try again.");
        toast(error)
        console.log(err);
      } finally {
        setLoading(false);
        toast.dismiss();
      }
    };
    loadModel();
  }, []);

  const handleFiles = async (newFiles) => {
    if (newFiles.length + files.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} images.`);
      return;
    }

    const validFiles = newFiles.filter((file) =>
      file.type.startsWith("image/") && file.size <= maxFileSize
    );

    if (validFiles.length !== newFiles.length) {
      setError("Only image files under 5MB are allowed.");
      return;
    }

    setError("");
    const updatedFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(updatedFiles);

    for (const file of validFiles) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const predictions = await model.classify(img);
        setPredictions((prev) => [...prev, { file: file.name, predictions }]);
        onUpload(updatedFiles);
        URL.revokeObjectURL(img.src);
      };
    }
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    handleFiles(selectedFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  return (
    <div className="w-full max-w-lg">
      <ToastContainer />
      <ImageDropzone onDrop={handleDrop} onSelect={handleFileSelect} loading={loading} />
      {error && (
        <div className="overflow-hidden">
          <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-md border border-red-200">
            {error}
          </p>
        </div>
      )}
      <ImagePreviewList predictions={predictions} />
      <UploadStatus files={files} maxFiles={maxFiles} />
    </div>
  );
}

export default ImageUpload;
