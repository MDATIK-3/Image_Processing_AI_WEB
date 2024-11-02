import { useState } from "react";
import ImageUpload from "./components/ImageUpload";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (newImages) => {
    if (Array.isArray(newImages)) {
      setLoading(true);
      setImages(newImages);
      setLoading(false);
    } else {
      console.error("Uploaded images are not in the correct format."); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        AI-Powered Image Classification
      </h1>
      <ImageUpload onUpload={handleImageUpload} />

      {loading && <p>Loading images...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;