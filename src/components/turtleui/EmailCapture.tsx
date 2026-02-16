'use client';

import { useState, type FormEvent } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface EmailCaptureProps {
  onSubmit: (email: string) => Promise<void>;
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  successMessage?: string;
  className?: string;
}

export function EmailCapture({
  onSubmit,
  title = 'Save Your Quote',
  description = 'Enter your email to save this quote and receive a copy',
  buttonText = 'Save Quote',
  placeholder = 'your@email.com',
  successMessage = 'Quote saved! Check your email.',
  className = '',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage('Please enter your email');
      setStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await onSubmit(email);
      setStatus('success');
      setEmail('');

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to save quote. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'success') {
    return (
      <div className={`p-6 bg-green-50 border-2 border-green-200 rounded-2xl ${className}`}>
        <div className="flex items-center gap-3 text-green-700">
          <CheckCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">{successMessage}</h4>
            <p className="text-sm text-green-600 mt-1">
              We've sent your quote details to {email}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          {description && <p className="text-sm text-slate-600">{description}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-turtle-green-500 focus:outline-none text-lg transition-colors"
            disabled={status === 'loading'}
          />
        </div>

        {status === 'error' && errorMessage && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              <span>{buttonText}</span>
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-slate-500 text-center">
        We'll never spam you or share your email. You can unsubscribe anytime.
      </p>
    </div>
  );
}

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
  title?: string;
  description?: string;
}

export function EmailCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
}: EmailCaptureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <EmailCapture
          onSubmit={onSubmit}
          title={title}
          description={description}
        />
      </div>
    </div>
  );
}