import React, { useState } from 'react';
import { Building2, CheckCircle, ExternalLink, Users, Calendar, DollarSign } from 'lucide-react';
import { Screen } from '../App';

interface GovernmentSchemeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const GovernmentSchemeScreen: React.FC<GovernmentSchemeScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Schemes', icon: '🏛️' },
    { id: 'financial', name: 'Financial Aid', icon: '💰' },
    { id: 'insurance', name: 'Insurance', icon: '🛡️' },
    { id: 'equipment', name: 'Equipment', icon: '🚜' },
    { id: 'training', name: 'Training', icon: '📚' },
  ];

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      fullName: 'Pradhan Mantri Kisan Samman Nidhi',
      category: 'financial',
      amount: '₹6,000/year',
      description: 'Direct income support to all landholding farmer families',
      eligibility: 'All landholding farmer families',
      status: 'Active',
      deadline: 'Ongoing',
      benefits: ['₹2,000 every 4 months', 'Direct bank transfer', 'No income limit'],
      documents: ['Aadhaar Card', 'Bank Account', 'Land Records'],
      applyUrl: '#',
    },
    {
      id: 2,
      name: 'KCC Loan',
      fullName: 'Kisan Credit Card',
      category: 'financial',
      amount: 'Up to ₹3 Lakh',
      description: 'Credit facility for agricultural and allied activities',
      eligibility: 'All farmers with cultivable land',
      status: 'Active',
      deadline: 'Ongoing',
      benefits: ['Low interest rates', 'Flexible repayment', 'Insurance coverage'],
      documents: ['Land Records', 'Identity Proof', 'Income Certificate'],
      applyUrl: '#',
    },
    {
      id: 3,
      name: 'PMFBY',
      fullName: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'insurance',
      amount: '2% of Sum Insured',
      description: 'Crop insurance scheme providing coverage against crop loss',
      eligibility: 'All farmers growing notified crops',
      status: 'Active',
      deadline: 'July 31, 2024',
      benefits: ['Natural disaster coverage', 'Low premium', 'Quick claim settlement'],
      documents: ['Aadhaar Card', 'Bank Account', 'Sowing Certificate'],
      applyUrl: '#',
    },
    {
      id: 4,
      name: 'SMAM',
      fullName: 'Sub-Mission on Agricultural Mechanization',
      category: 'equipment',
      amount: '40-50% Subsidy',
      description: 'Financial assistance for purchasing agricultural equipment',
      eligibility: 'Individual farmers and FPOs',
      status: 'Active',
      deadline: 'March 31, 2024',
      benefits: ['Tractor subsidy', 'Implement subsidy', 'Custom hiring centers'],
      documents: ['Aadhaar Card', 'Bank Account', 'Quotation'],
      applyUrl: '#',
    },
    {
      id: 5,
      name: 'ATMA',
      fullName: 'Agricultural Technology Management Agency',
      category: 'training',
      amount: 'Free Training',
      description: 'Extension services and training programs for farmers',
      eligibility: 'All farmers',
      status: 'Active',
      deadline: 'Ongoing',
      benefits: ['Free training', 'Expert guidance', 'Modern techniques'],
      documents: ['Aadhaar Card', 'Farm details'],
      applyUrl: '#',
    },
  ];

  const filteredSchemes = selectedCategory === 'all' 
    ? schemes 
    : schemes.filter(scheme => scheme.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'closing':
        return 'text-orange-600 bg-orange-50';
      case 'closed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">🏛️</span>
          Government Schemes
        </h2>
        <p className="text-gray-600">
          Discover government schemes and subsidies available for farmers. Get financial support, 
          insurance coverage, and training opportunities.
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-xl transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{scheme.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{scheme.fullName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(scheme.status)}`}>
                    {scheme.status}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="bg-green-50 p-3 rounded-xl">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-bold text-green-800">{scheme.amount}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700">{scheme.description}</p>

              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Key Benefits
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility & Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Eligibility
                  </label>
                  <p className="text-gray-700 mt-1">{scheme.eligibility}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Deadline
                  </label>
                  <p className="text-gray-700 mt-1">{scheme.deadline}</p>
                </div>
              </div>

              {/* Required Documents */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Required Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {scheme.documents.map((doc, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span>Learn More & Apply</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help with Applications?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('voice')}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎤</span>
              <div>
                <h4 className="font-semibold text-blue-800">Ask for Help</h4>
                <p className="text-blue-600 text-sm">Get guidance on scheme applications</p>
              </div>
            </div>
          </button>
          <div className="p-4 bg-green-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📞</span>
              <div>
                <h4 className="font-semibold text-green-800">Support Helpline</h4>
                <p className="text-green-600 text-sm">Call: 1800-180-1551 (Toll Free)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">Impact Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">12.3 Cr</div>
            <div className="text-green-100">Farmers Benefited</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">₹2.8 Lakh Cr</div>
            <div className="text-green-100">Total Disbursed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-green-100">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};