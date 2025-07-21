import React, { useState, useEffect } from 'react';
import { Mic, MicOff, RotateCcw, Volume2, Clock } from 'lucide-react';
import { Screen } from '../App';

interface VoiceQueryScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const VoiceQueryScreen: React.FC<VoiceQueryScreenProps> = ({ onNavigate }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleQueries = [
    "What is wrong with my tomato crop?",
    "How much fertilizer should I use for wheat?",
    "What are the current onion prices?",
    "When is the best time to plant rice?",
    "How do I treat fungal infection in my crops?"
  ];

  const sampleResponses = [
    "Based on your description, your tomato crop might be suffering from early blight. I recommend applying copper-based fungicide in the evening. Make sure to remove affected leaves and improve air circulation.",
    "For wheat cultivation, apply 120 kg of nitrogen, 60 kg of phosphorus, and 40 kg of potassium per hectare. Apply in split doses - 1/3 at sowing, 1/3 at tillering, and 1/3 at grain filling stage.",
    "Current onion prices in your area are ₹18-22 per kg. The market is stable with slight upward trend expected due to monsoon season.",
    "The best time to plant rice is during the monsoon season, typically June-July. Ensure your field has proper drainage and the soil temperature is above 20°C.",
    "For fungal infections, use systemic fungicides like Propiconazole or Tebuconazole. Apply during cool hours and ensure good field hygiene by removing infected plant debris."
  ];

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');
    
    // Simulate voice input
    setTimeout(() => {
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setTranscript(randomQuery);
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        setResponse(randomResponse);
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const retry = () => {
    setTranscript('');
    setResponse('');
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* Voice Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center space-y-6">
          {/* Microphone Animation */}
          <div className="relative">
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
              isListening ? 'bg-red-100 animate-pulse' : 'bg-blue-100'
            }`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isListening ? 'bg-red-500' : 'bg-blue-500'
              }`}>
                {isListening ? (
                  <Mic className="w-10 h-10 text-white" />
                ) : (
                  <MicOff className="w-10 h-10 text-white" />
                )}
              </div>
            </div>
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            {isListening && (
              <div className="flex items-center justify-center space-x-2 text-red-600">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xl font-semibold">Listening...</span>
              </div>
            )}
            {isProcessing && (
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Clock className="w-5 h-5 animate-spin" />
                <span className="text-xl font-semibold">Processing...</span>
              </div>
            )}
            {!isListening && !isProcessing && !transcript && (
              <p className="text-gray-600 text-lg">Tap the microphone to start speaking</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isListening && !isProcessing && (
              <button
                onClick={startListening}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center space-x-2"
              >
                <Mic className="w-5 h-5" />
                <span>Start Listening</span>
              </button>
            )}
            {isListening && (
              <button
                onClick={stopListening}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center space-x-2"
              >
                <MicOff className="w-5 h-5" />
                <span>Stop</span>
              </button>
            )}
            {(transcript || response) && (
              <button
                onClick={retry}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Retry</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transcript Section */}
      {transcript && (
        <div className="bg-blue-50 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <Volume2 className="w-5 h-5 mr-2" />
            You said:
          </h3>
          <p className="text-gray-800 text-lg italic">"{transcript}"</p>
        </div>
      )}

      {/* Response Section */}
      {response && (
        <div className="bg-green-50 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <span className="text-xl mr-2">🤖</span>
            AI Response:
          </h3>
          <p className="text-gray-800 text-lg leading-relaxed">{response}</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('image')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📷</span>
              <div>
                <h4 className="font-semibold text-purple-800">Upload Crop Image</h4>
                <p className="text-purple-600 text-sm">Analyze crop diseases</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => onNavigate('mandi')}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📈</span>
              <div>
                <h4 className="font-semibold text-green-800">Check Mandi Prices</h4>
                <p className="text-green-600 text-sm">Latest market rates</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};