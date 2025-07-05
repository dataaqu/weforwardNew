import { motion } from 'framer-motion';
import type { SEOAuditResult } from '../../services/seoAuditService';

interface SEOAuditPanelProps {
  auditResult: SEOAuditResult | null;
  isVisible: boolean;
  onClose: () => void;
  onProceedToPublish?: () => void;
}

export function SEOAuditPanel({ auditResult, isVisible, onClose, onProceedToPublish }: SEOAuditPanelProps) {
  if (!isVisible || !auditResult) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 border-green-200';
    if (score >= 75) return 'bg-blue-100 border-blue-200';
    if (score >= 50) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const getStatusIcon = (passed: boolean, score: number) => {
    if (passed) return '✅';
    if (score < 50) return '❌';
    return '⚠️';
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excellent SEO';
      case 'good': return 'Good SEO';
      case 'needs-improvement': return 'Needs Improvement';
      case 'poor': return 'Poor SEO';
      default: return 'Unknown';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">SEO Audit Results</h2>
            <div className={`px-4 py-2 rounded-full border ${getScoreBackgroundColor(auditResult.score)}`}>
              <span className={`text-lg font-bold ${getScoreColor(auditResult.score)}`}>
                {auditResult.score}/100
              </span>
              <span className="text-sm text-gray-600 ml-2">
                {getStatusText(auditResult.status)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Critical Issues */}
          {auditResult.criticalIssues.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                🚨 Critical Issues (Must Fix Before Publishing)
              </h3>
              <ul className="space-y-2">
                {auditResult.criticalIssues.map((issue, index) => (
                  <li key={index} className="text-red-700 flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SEO Checks */}
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(auditResult.checks).map(([key, check]) => (
              <div
                key={key}
                className={`p-4 border rounded-lg ${
                  check.passed 
                    ? 'bg-green-50 border-green-200' 
                    : check.score < 50 
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getStatusIcon(check.passed, check.score)}</span>
                      <h4 className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <span className={`text-sm font-bold ${getScoreColor(check.score)}`}>
                        {check.score}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{check.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          {auditResult.recommendations.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                💡 SEO Recommendations
              </h3>
              <ul className="space-y-2">
                {auditResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-blue-700 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {auditResult.score >= 75 ? (
                <span className="text-green-600 font-medium">✅ Good to publish!</span>
              ) : auditResult.score >= 50 ? (
                <span className="text-yellow-600 font-medium">⚠️ Consider improvements before publishing</span>
              ) : (
                <span className="text-red-600 font-medium">❌ Fix critical issues before publishing</span>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Continue Editing
              </button>
              {auditResult.score >= 50 && (
                <button
                  onClick={() => {
                    onProceedToPublish?.();
                    onClose();
                  }}
                  className="px-4 py-2 bg-[#309f69] text-white rounded-lg hover:bg-[#2a8660] transition-colors"
                >
                  Proceed to Publish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
