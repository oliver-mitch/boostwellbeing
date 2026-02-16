'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader, Calendar } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: 'email' | 'phone';
  requestCallback: boolean;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  showCalendly?: boolean;
  calendlyUrl?: string;
  className?: string;
}

export function ContactForm({
  onSubmit,
  showCalendly = true,
  calendlyUrl = 'https://calendly.com/turtlemoney',
  className = '',
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email',
    requestCallback: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-+()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      await onSubmit(formData);
      setStatus('success');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredContact: 'email',
        requestCallback: false,
      });

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-green-50 border-2 border-green-200 rounded-2xl text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
        <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
        <p className="text-slate-600">
          Thanks for reaching out. We'll get back to you within 24 hours.
        </p>
        {showCalendly && (
          <div className="pt-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-secondary px-6 py-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Or Book a Call Now</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Smith"
            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
              errors.name ? 'border-red-300' : 'border-slate-200'
            } focus:border-turtle-green-500 focus:outline-none transition-colors`}
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
              errors.email ? 'border-red-300' : 'border-slate-200'
            } focus:border-turtle-green-500 focus:outline-none transition-colors`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="021 123 4567"
            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
              errors.phone ? 'border-red-300' : 'border-slate-200'
            } focus:border-turtle-green-500 focus:outline-none transition-colors`}
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Message *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tell us what you're looking for..."
            rows={5}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
              errors.message ? 'border-red-300' : 'border-slate-200'
            } focus:border-turtle-green-500 focus:outline-none transition-colors resize-none`}
          />
        </div>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Preferred Contact Method
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleChange('preferredContact', 'email')}
            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
              formData.preferredContact === 'email'
                ? 'border-turtle-green-500 bg-turtle-green-50 text-turtle-green-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Mail className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm font-medium">Email</span>
          </button>
          <button
            type="button"
            onClick={() => handleChange('preferredContact', 'phone')}
            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
              formData.preferredContact === 'phone'
                ? 'border-turtle-green-500 bg-turtle-green-50 text-turtle-green-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Phone className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm font-medium">Phone</span>
          </button>
        </div>
      </div>

      {/* Request Callback */}
      <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
        <input
          type="checkbox"
          checked={formData.requestCallback}
          onChange={(e) => handleChange('requestCallback', e.target.checked)}
          className="mt-1 w-5 h-5 text-turtle-green-500 border-slate-300 rounded focus:ring-turtle-green-500"
        />
        <div>
          <span className="font-medium text-slate-900">Request a callback</span>
          <p className="text-sm text-slate-600 mt-1">
            We'll call you within 4 business hours to discuss your needs
          </p>
        </div>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </>
        )}
      </button>

      {status === 'error' && (
        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-center">
          Failed to send message. Please try again or call us directly.
        </div>
      )}

      {/* Calendly Option */}
      {showCalendly && status === 'idle' && (
        <div className="text-center pt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">or</span>
            </div>
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 btn-secondary px-6 py-3"
          >
            <Calendar className="w-5 h-5" />
            <span>Book a Call Instead</span>
          </a>
        </div>
      )}
    </form>
  );
}