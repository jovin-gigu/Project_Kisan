import React from 'react';
import { Mic, Keyboard, Camera, TrendingUp, Building2, Sprout, DollarSign } from 'lucide-react';
import { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const mainActions = [
    {
      icon: Mic,
      title: 'Ask a Question',
      subtitle: 'Voice',
      description: 'Get instant answers using voice',
      color: 'bg-blue-500 hover:bg-blue-600',
      screen: 'voice' as Screen,
    },
    {
      icon: Keyboard,
      title: 'Type Your Question',
      subtitle: 'Text',
      description: 'Type your farming queries',
      color: 'bg-green-500 hover:bg-green-600',
      screen: 'voice' as Screen,
    },
    {
      icon: Camera,
      title: 'Upload Crop Image',
      subtitle: 'Analysis',
      description: 'Detect diseases with AI',
      color: 'bg-purple-500 hover:bg-purple-600',
      screen: 'image' as Screen,
    },
  ];

  const commonQueries = [
    {
      icon: Sprout,
      title: 'Crop Disease Help',
      description: 'Identify and treat plant diseases',
      color: 'text-red-600 bg-red-50',
    },
    {
      icon: DollarSign,
      title: 'Fertilizer Advice',
      description: 'Get personalized fertilizer recommendations',
      color: 'text-green-600 bg-green-50',
    },
    {
      icon: TrendingUp,
      title: 'Mandi Prices',
      description: 'Real-time market prices',
      color: 'text-blue-600 bg-blue-50',
      screen: 'mandi' as Screen,
    },
    {
      icon: Building2,
      title: 'Government Schemes',
      description: 'Discover available schemes and subsidies',
      color: 'text-purple-600 bg-purple-50',
      screen: 'schemes' as Screen,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to Your Farming Assistant
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get expert advice, analyze your crops, check market prices, and discover government schemes - all in one place.
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mainActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onNavigate(action.screen)}
            className={`${action.color} text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 text-left`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <action.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{action.title}</h3>
                <p className="text-white/80 text-sm">{action.subtitle}</p>
              </div>
            </div>
            <p className="mt-3 text-white/90">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Common Queries Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="text-2xl mr-2">🔍</span>
          Common Queries
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => query.screen && onNavigate(query.screen)}
              className={`${query.color} p-6 rounded-xl border-2 border-transparent hover:border-current transition-all duration-200 text-left`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white rounded-lg">
                  <query.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{query.title}</h4>
                  <p className="text-gray-600 mt-1">{query.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600">1,247</div>
            <div className="text-gray-600">Queries Answered</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">₹24/kg</div>
            <div className="text-gray-600">Avg Tomato Price</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600">87%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};