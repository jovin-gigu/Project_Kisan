import React, { useState } from 'react';
import { Upload, Camera, Image as ImageIcon, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Screen } from '../App';

interface ImageUploadScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const ImageUploadScreen: React.FC<ImageUploadScreenProps> = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          disease: "Early Blight",
          confidence: 89,
          severity: "Moderate",
          treatment: "Copper Fungicide",
          sprayTime: "Evening",
          description: "Early blight is a common fungal disease affecting tomatoes. Apply copper-based fungicide and remove affected leaves.",
          prevention: "Ensure good air circulation, avoid overhead watering, and maintain proper plant spacing."
        },
        {
          disease: "Leaf Spot",
          confidence: 76,
          severity: "Mild",
          treatment: "Neem Oil",
          sprayTime: "Morning",
          description: "Leaf spot is caused by bacterial infection. Use neem oil spray and improve drainage.",
          prevention: "Water at soil level, avoid splashing water on leaves, and remove infected plant debris."
        },
        {
          disease: "Healthy Crop",
          confidence: 95,
          severity: "None",
          treatment: "No treatment needed",
          sprayTime: "N/A",
          description: "Your crop appears healthy! Continue with regular care and monitoring.",
          prevention: "Maintain current care routine with proper watering and fertilization."
        }
      ];
      
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'text-yellow-600 bg-yellow-50';
      case 'moderate':
        return 'text-orange-600 bg-orange-50';
      case 'severe':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-2xl mr-2">📷</span>
          Upload Crop Image
        </h2>
        
        {!selectedImage ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Choose an image of your crop for analysis</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl cursor-pointer inline-flex items-center space-x-2 transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span>Choose from Gallery</span>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                htmlFor="image-upload"
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl cursor-pointer transition-colors text-center"
              >
                <ImageIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-blue-800 font-semibold">Choose from Gallery</span>
              </label>
              <label
                htmlFor="image-upload"
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl cursor-pointer transition-colors text-center"
              >
                <Camera className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-purple-800 font-semibold">Take Photo</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Uploaded crop"
                className="w-full max-w-md mx-auto rounded-xl shadow-lg"
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setAnalysisResult(null);
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
              >
                ×
              </button>
            </div>
            
            {!isAnalyzing && !analysisResult && (
              <div className="text-center">
                <button
                  onClick={analyzeImage}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center space-x-2 mx-auto"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Analyze Image</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <div className="bg-blue-50 rounded-2xl shadow-lg p-8 text-center">
          <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Analyzing Your Crop...</h3>
          <p className="text-blue-600">Our AI is examining the image for diseases and issues</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-2">🔍</span>
            Analysis Results
          </h3>
          
          <div className="space-y-6">
            {/* Disease Detection */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-gray-800">
                  {analysisResult.disease === 'Healthy Crop' ? '✅ Healthy Crop' : '🦠 Disease Detected'}
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {analysisResult.confidence}%
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Disease Type</label>
                  <p className="text-lg font-semibold text-gray-800">{analysisResult.disease}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Severity</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(analysisResult.severity)}`}>
                    {analysisResult.severity}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-gray-700 mt-1">{analysisResult.description}</p>
              </div>
            </div>
            
            {/* Treatment Recommendations */}
            {analysisResult.treatment !== 'No treatment needed' && (
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <span className="text-xl mr-2">💊</span>
                  Treatment Recommendations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-green-600">Suggested Treatment</label>
                    <p className="text-lg font-semibold text-green-800">{analysisResult.treatment}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-600">Best Time to Apply</label>
                    <p className="text-lg font-semibold text-green-800">{analysisResult.sprayTime}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Prevention Tips */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                <span className="text-xl mr-2">🛡️</span>
                Prevention Tips
              </h4>
              <p className="text-yellow-700">{analysisResult.prevention}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Need More Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('voice')}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎤</span>
              <div>
                <h4 className="font-semibold text-blue-800">Ask Expert</h4>
                <p className="text-blue-600 text-sm">Get personalized advice</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => onNavigate('schemes')}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🏛️</span>
              <div>
                <h4 className="font-semibold text-green-800">Government Aid</h4>
                <p className="text-green-600 text-sm">Check available schemes</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};