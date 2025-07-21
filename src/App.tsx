import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { VoiceQueryScreen } from './components/VoiceQueryScreen';
import { ImageUploadScreen } from './components/ImageUploadScreen';
import { MandiPriceScreen } from './components/MandiPriceScreen';
import { GovernmentSchemeScreen } from './components/GovernmentSchemeScreen';
import { Header } from './components/Header';

export type Screen = 'home' | 'voice' | 'image' | 'mandi' | 'schemes';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'voice':
        return <VoiceQueryScreen onNavigate={setCurrentScreen} />;
      case 'image':
        return <ImageUploadScreen onNavigate={setCurrentScreen} />;
      case 'mandi':
        return <MandiPriceScreen onNavigate={setCurrentScreen} />;
      case 'schemes':
        return <GovernmentSchemeScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;