import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Sparkles, ArrowLeft } from 'lucide-react';

interface PlansProps {
  onBack: () => void;
  onSelectPlan: (plan: string) => void;
}

export const Plans: React.FC<PlansProps> = ({ onBack, onSelectPlan }) => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'Forever',
      description: 'Perfect for trying out SmartAssign',
      features: [
        'Basic document editing',
        'Export with watermark',
        'Up to 3 documents per month',
        'Basic formatting tools',
        'Email support'
      ],
      color: 'gray',
      icon: Check
    },
    {
      id: 'pay_per_doc',
      name: 'Pay Per Document',
      price: 50,
      period: 'Per Export',
      description: 'Pay only when you need it',
      features: [
        'Remove watermark from exports',
        'High-quality PDF & Word export',
        'Advanced formatting options',
        'Priority email support',
        'No monthly commitment'
      ],
      color: 'blue',
      icon: Zap,
      popular: false
    },
    {
      id: 'monthly',
      name: 'Monthly Pro',
      price: 500,
      period: 'Per Month',
      description: 'Best value for regular users',
      features: [
        'Unlimited document exports',
        'No watermarks',
        'Advanced formatting tools',
        'Document templates library',
        'Priority support',
        'Collaboration features'
      ],
      color: 'green',
      icon: Crown,
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium AI',
      price: 1200,
      period: 'Per Month',
      description: 'AI-powered document enhancement',
      features: [
        'Everything in Monthly Pro',
        'AI grammar suggestions',
        'Content improvement AI',
        'Smart formatting recommendations',
        'Advanced AI analytics',
        'Custom AI training',
        '24/7 priority support'
      ],
      color: 'purple',
      icon: Sparkles
    }
  ];

  const getColorClasses = (color: string, isButton = false) => {
    const baseClasses = {
      gray: isButton ? 'bg-gray-600 hover:bg-gray-700' : 'border-gray-300 text-gray-600',
      blue: isButton ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-300 text-blue-600',
      green: isButton ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:shadow-lg' : 'border-green-300 text-green-600',
      purple: isButton ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-300 text-purple-600'
    };
    return baseClasses[color as keyof typeof baseClasses];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of SmartAssign with our flexible pricing options
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    plan.color === 'gray' ? 'bg-gray-100' :
                    plan.color === 'blue' ? 'bg-blue-100' :
                    plan.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      plan.color === 'gray' ? 'text-gray-600' :
                      plan.color === 'blue' ? 'text-blue-600' :
                      plan.color === 'green' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold text-gray-800">
                    {plan.price === 0 ? 'Free' : `KES ${plan.price.toLocaleString()}`}
                  </div>
                  <div className="text-sm text-gray-600">{plan.period}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => onSelectPlan(plan.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:shadow-lg' 
                      : getColorClasses(plan.color, true)
                  }`}
                >
                  {plan.price === 0 ? 'Current Plan' : 'Choose Plan'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};