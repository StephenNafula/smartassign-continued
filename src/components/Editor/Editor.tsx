import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Download,
  Eye,
  Save,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { aiService } from '../../lib/ai';
import { ExportModal } from './ExportModal';

interface EditorProps {
  onBack: () => void;
}

export const Editor: React.FC<EditorProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Untitled Document');
  const [showPreview, setShowPreview] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleAISuggestions = async () => {
    if (!content || loadingAI) return;
    
    setLoadingAI(true);
    try {
      const suggestions = await aiService.generateSuggestions(content);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('AI suggestion error:', error);
      alert('AI features require API key configuration');
    } finally {
      setLoadingAI(false);
    }
  };

  const saveDocument = async () => {
    // Implementation for saving document to Supabase
    console.log('Saving document...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold text-gray-800 bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded"
                placeholder="Document title"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleAISuggestions}
                disabled={loadingAI || user?.plan === 'free'}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loadingAI ? 'Generating...' : 'AI Suggestions'}</span>
              </button>
              
              <button
                onClick={saveDocument}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor Layout */}
      <div className="container mx-auto px-6 py-8">
        <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-8`}>
          {/* Editor Panel */}
          <motion.div
            layout
            className="bg-white rounded-2xl shadow-lg border border-gray-200"
          >
            {/* Toolbar */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => formatText('bold')}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bold className="w-5 h-5" />
                </button>
                <button
                  onClick={() => formatText('italic')}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Italic className="w-5 h-5" />
                </button>
                <button
                  onClick={() => formatText('underline')}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Underline className="w-5 h-5" />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2" />
                
                <button
                  onClick={() => formatText('justifyLeft')}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <AlignLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => formatText('justifyCenter')}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <AlignCenter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => formatText('justifyRight')}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <AlignRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable
              className="p-6 min-h-96 focus:outline-none text-gray-800 leading-relaxed"
              style={{ minHeight: '500px' }}
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
              placeholder="Start typing your document content..."
            />
          </motion.div>

          {/* Preview Panel */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">Document Preview</h3>
              </div>
              
              <div className="p-6">
                <div className="bg-white border rounded-xl p-8 shadow-inner min-h-96">
                  <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>
                  <div 
                    className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">Start typing to see preview...</p>' }}
                  />
                </div>
                
                {user?.plan === 'free' && (
                  <div className="mt-4 text-center text-xs text-gray-400 border-t pt-4">
                    Generated with SmartAssign Free - Upgrade to remove watermark
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>AI Suggestions</span>
            </h3>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          userPlan={user?.plan || 'free'}
        />
      )}
    </div>
  );
};