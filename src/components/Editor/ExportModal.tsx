import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, CreditCard } from 'lucide-react';
import { paymentService } from '../../lib/intasend';

interface ExportModalProps {
  onClose: () => void;
  userPlan: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({ onClose, userPlan }) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'word'>('pdf');
  const [processing, setProcessing] = useState(false);

  const handleFreeDownload = async () => {
    setProcessing(true);
    // Simulate export with watermark
    setTimeout(() => {
      alert('Document downloaded with watermark');
      setProcessing(false);
      onClose();
    }, 2000);
  };

  const handlePaidDownload = async () => {
    try {
      const payment = await paymentService.createPayment({
        amount: 50,
        currency: 'KES',
        email: 'user@example.com', // Should come from user context
        api_ref: `doc_export_${Date.now()}`,
      });
      
      // Redirect to payment URL
      window.location.href = payment.payment_url;
    } catch (error) {
      alert('Payment initialization failed. Please check your IntaSend configuration.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Export Document</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Choose format:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedFormat('pdf')}
              className={`p-3 border-2 rounded-xl transition-all ${
                selectedFormat === 'pdf' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              PDF
            </button>
            <button
              onClick={() => setSelectedFormat('word')}
              className={`p-3 border-2 rounded-xl transition-all ${
                selectedFormat === 'word' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Word
            </button>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          {userPlan === 'free' ? (
            <>
              {/* Free Option with Watermark */}
              <motion.button
                onClick={handleFreeDownload}
                disabled={processing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 transition-all group disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-medium text-gray-800">Download with Watermark</div>
                    <div className="text-sm text-gray-600">Free - Includes SmartAssign branding</div>
                  </div>
                  <Download className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                </div>
              </motion.button>

              {/* Pay per Document Option */}
              <motion.button
                onClick={handlePaidDownload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-medium">Remove Watermark</div>
                    <div className="text-sm opacity-90">KES 50 - Clean, professional document</div>
                  </div>
                  <CreditCard className="w-5 h-5" />
                </div>
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={handleFreeDownload}
              disabled={processing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-medium">Download Document</div>
                  <div className="text-sm opacity-90">No watermark - Premium quality</div>
                </div>
                <Download className="w-5 h-5" />
              </div>
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};