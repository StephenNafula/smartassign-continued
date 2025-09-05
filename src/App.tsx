import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Landing } from './components/Landing/Landing';
import { AuthForm } from './components/Auth/AuthForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Editor } from './components/Editor/Editor';
import { Plans } from './components/Plans/Plans';
import { Checkout } from './components/Payment/Checkout';
import { PaymentSuccess } from './components/Payment/Success';
import { useAuth } from './hooks/useAuth';

type AppState =
  | 'landing'
  | 'auth'
  | 'dashboard'
  | 'editor'
  | 'plans'
  | 'checkout'
  | 'payment-success';

const planDetails = {
  monthly: {
    id: 'monthly',
    name: 'Monthly Pro',
    price: 500,
    features: ['Unlimited exports', 'No watermarks', 'Advanced tools', 'Templates', 'Priority support']
  },
  premium: {
    id: 'premium',
    name: 'Premium AI',
    price: 1200,
    features: ['All Monthly Pro features', 'AI suggestions', 'Grammar check', 'Smart formatting', '24/7 support']
  },
  pay_per_doc: {
    id: 'pay_per_doc',
    name: 'Pay Per Document',
    price: 50,
    features: ['Remove watermark', 'High-quality export', 'Advanced formatting', 'Priority support']
  }
};

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const { currentUser, loading } = useAuth(); // use merged user

  useEffect(() => {
    if (!loading) {
      if (currentUser && (currentState === 'auth' || currentState === 'landing')) {
        setCurrentState('dashboard');
      } else if (
        !currentUser &&
        ['dashboard', 'editor', 'plans', 'checkout', 'payment-success'].includes(currentState)
      ) {
        setCurrentState('landing');
      }
    }
  }, [currentUser, loading, currentState]);

  const handleGetStarted = () => {
    if (currentUser) {
      setCurrentState('dashboard');
    } else {
      setCurrentState('auth');
    }
  };

  const handleNavigateToEditor = () => setCurrentState('editor');
  const handleNavigateToPlans = () => setCurrentState('plans');
  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') return;
    setSelectedPlan(planId);
    setCurrentState('checkout');
  };
  const handlePaymentSuccess = () => setCurrentState('payment-success');
  const handleBackToDashboard = () => setCurrentState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SmartAssign...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentState === 'landing' && (
          <Landing onGetStarted={handleGetStarted} />
        )}

        {/* AuthForm: no onSuccess needed, handled by useAuth */}
        {currentState === 'auth' && (
          <AuthForm />
        )}

        {currentState === 'dashboard' && (
          <Dashboard
            onNavigateToEditor={handleNavigateToEditor}
            onNavigateToPlans={handleNavigateToPlans}
          />
        )}

        {currentState === 'editor' && (
          <Editor onBack={handleBackToDashboard} />
        )}

        {currentState === 'plans' && (
          <Plans
            onBack={handleBackToDashboard}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentState === 'checkout' && selectedPlan && (
          <Checkout
            plan={planDetails[selectedPlan as keyof typeof planDetails]}
            onBack={() => setCurrentState('plans')}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {currentState === 'payment-success' && (
          <PaymentSuccess onContinue={handleBackToDashboard} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
