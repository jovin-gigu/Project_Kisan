import React, { useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, MapPin, Calendar } from 'lucide-react';
import { Screen } from '../App';

interface MandiPriceScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const MandiPriceScreen: React.FC<MandiPriceScreenProps> = ({ onNavigate }) => {
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'];

  const cropPrices = [
    {
      name: 'Tomato',
      emoji: '🍅',
      price: 24,
      unit: 'kg',
      change: 8,
      trend: 'up',
      quality: 'Grade A',
      supply: 'Good',
    },
    {
      name: 'Onion',
      emoji: '🧅',
      price: 15,
      unit: 'kg',
      change: -12,
      trend: 'down',
      quality: 'Grade A',
      supply: 'Excellent',
    },
    {
      name: 'Chili',
      emoji: '🌶️',
      price: 38,
      unit: 'kg',
      change: 15,
      trend: 'up',
      quality: 'Grade B',
      supply: 'Limited',
    },
    {
      name: 'Potato',
      emoji: '🥔',
      price: 18,
      unit: 'kg',
      change: -5,
      trend: 'down',
      quality: 'Grade A',
      supply: 'Good',
    },
    {
      name: 'Cabbage',
      emoji: '🥬',
      price: 12,
      unit: 'kg',
      change: 3,
      trend: 'up',
      quality: 'Grade A',
      supply: 'Excellent',
    },
    {
      name: 'Carrot',
      emoji: '🥕',
      price: 22,
      unit: 'kg',
      change: 7,
      trend: 'up',
      quality: 'Grade A',
      supply: 'Good',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getSupplyColor = (supply: string) => {
    switch (supply.toLowerCase()) {
      case 'excellent':
        return 'text-green-600 bg-green-50';
      case 'good':
        return 'text-blue-600 bg-blue-50';
      case 'limited':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-2xl mr-2">📈</span>
              Mandi Prices
            </h2>
            <p className="text-gray-600 mt-1 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <MapPin className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Location Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-2">
          📍 {selectedLocation} Market
        </h3>
        <p className="text-green-100">
          Real-time prices from authorized mandis and wholesale markets
        </p>
      </div>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cropPrices.map((crop, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{crop.emoji}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{crop.name}</h3>
                  <span className="text-sm text-gray-600">{crop.quality}</span>
                </div>
              </div>
              <div className={`p-2 rounded-full ${crop.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                {crop.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">
                  ₹{crop.price}/{crop.unit}
                </span>
                <div className={`flex items-center space-x-1 ${
                  crop.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="text-sm font-semibold">
                    {crop.trend === 'up' ? '+' : ''}{crop.change}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Supply:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSupplyColor(crop.supply)}`}>
                  {crop.supply}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-xl mr-2">💡</span>
          Market Insights
        </h3>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">📈 Price Trends</h4>
            <p className="text-green-700 text-sm">
              Tomato and chili prices are trending upward due to monsoon disruption in supply chains. 
              Consider selling if you have good quality stock.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">🎯 Best Selling Opportunities</h4>
            <p className="text-blue-700 text-sm">
              Current high-demand crops: Tomatoes, Chilies, and Carrots. 
              Onion prices are stabilizing after recent decline.
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Market Alert</h4>
            <p className="text-yellow-700 text-sm">
              Weather forecast suggests continued rain. Transport costs may increase affecting prices.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Need More Information?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('voice')}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎤</span>
              <div>
                <h4 className="font-semibold text-blue-800">Ask About Prices</h4>
                <p className="text-blue-600 text-sm">Get detailed market analysis</p>
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
                <h4 className="font-semibold text-green-800">Market Support</h4>
                <p className="text-green-600 text-sm">Check government schemes</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};