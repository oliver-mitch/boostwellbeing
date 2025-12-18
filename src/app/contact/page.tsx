'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, CheckCircle, Building2, Mail, Phone, User, Users, MessageSquare, Send } from 'lucide-react';
import { BoostIcon } from '@/components/icons/BoostIcon';
import ScrollVideoBackground from '@/components/ScrollVideoBackground';

interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  numberOfEmployees: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    numberOfEmployees: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');

        // Reset form after success
        setTimeout(() => {
          setFormData({
            fullName: '',
            companyName: '',
            email: '',
            phone: '',
            numberOfEmployees: '',
            message: '',
          });
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
        console.error('Form submission error:', data.error);
      }
    } catch (error) {
      setStatus('error');
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Scroll-Reactive Video Background */}
      <ScrollVideoBackground
        videoSrc="/videos/office-background.mp4"
        opacity={0.5}
        blur={true}
        parallaxSpeed={0.3}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-lg">
                <BoostIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  <span className="text-brand-blue">Boost</span>
                  <span className="text-white">Wellbeing</span>
                </span>
                <span className="text-xs text-white/70 font-medium">Better Health Starts at Work</span>
              </div>
            </Link>

            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Let's Build a Healthier Team Together
            </h1>

            <p className="text-xl text-white/90 leading-relaxed">
              Schedule a free consultation to discover how Southern Cross workplace health insurance can transform your business
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Request Your Free Consultation</h2>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Thank You!</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We'll contact you within 24 hours to schedule your consultation
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your.email@company.co.nz"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="021 123 4567"
                      />
                    </div>
                  </div>

                  {/* Number of Employees */}
                  <div>
                    <label htmlFor="numberOfEmployees" className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Employees *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select
                        id="numberOfEmployees"
                        name="numberOfEmployees"
                        value={formData.numberOfEmployees}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Select range</option>
                        <option value="5-10">5-10 employees</option>
                        <option value="11-25">11-25 employees</option>
                        <option value="26-50">26-50 employees</option>
                        <option value="51-100">51-100 employees</option>
                        <option value="100+">100+ employees</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your team's needs..."
                      />
                    </div>
                  </div>

                  {/* Privacy Statement */}
                  <p className="text-xs text-slate-500">
                    Your information is secure and will only be used to provide your Southern Cross health insurance consultation
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white py-4 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Get My Free Consultation
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              {/* What You'll Get */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Get</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Free 30-Minute Consultation</p>
                      <p className="text-sm text-white/80">No obligation, no pressure – just expert advice</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Customized Plan Design</p>
                      <p className="text-sm text-white/80">Tailored to your business needs and budget</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Transparent Pricing</p>
                      <p className="text-sm text-white/80">Clear, upfront costs with no hidden fees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Dedicated Account Manager</p>
                      <p className="text-sm text-white/80">Ongoing support from day one</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                <Shield className="w-16 h-16 text-white mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Trusted by 3,500+ NZ Businesses</h4>
                <p className="text-white/80">
                  Join businesses across New Zealand who chose Southern Cross for their team's health
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Questions? Get in Touch</h3>
                <div className="space-y-3 text-white/80">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <a href="mailto:contact@boostwellbeing.co.nz" className="hover:text-white transition-colors">
                      contact@boostwellbeing.co.nz
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>Mon-Fri: 9am - 5pm NZST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900 text-white py-12 border-t border-white/10 mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-white/60">
            <p>BoostWellbeing is an authorized partner helping businesses access Southern Cross Health Insurance workplace schemes.</p>
            <p className="mt-4">&copy; 2025 BoostWellbeing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
