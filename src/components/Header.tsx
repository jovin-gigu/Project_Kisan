import React from 'react';
import { ArrowLeft, Leaf } from 'lucide-react';
import { Screen } from '../App';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Project Kisan';
      case 'voice':
        return 'Voice Query';
      case 'image':
        return 'Crop Analysis';
      case 'mandi':
        return 'Mandi Prices';
      case 'schemes':
        return 'Government Schemes';
      default:
        return 'Project Kisan';
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-green-100">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {currentScreen !== 'home' && (
              <button
                onClick={() => onNavigate('home')}
                className="p-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-green-600" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">
                {getScreenTitle()}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-2xl">🤖</span>
          </div>
        </div>
      </div>
    </header>
  );
};