'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  Mail,
  Phone,
  Building2,
  CheckCircle,
  Users,
  Send,
  MessageSquare,
  User,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';

interface ContactFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  numberOfEmployees: string;
  message: string;
  interest: 'group-health' | 'wellbeing' | 'both';
}

export default function BoostWellbeingContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    numberOfEmployees: '',
    message: '',
    interest: 'both',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          numberOfEmployees: '',
          message: '',
          interest: 'both',
        });
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="container-turtle py-6">
        <div className="flex items-center justify-between">
          <Link href="/boostwellbeing" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BoostWellbeing
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/boostwellbeing/group-health" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Group Health
            </Link>
            <Link href="/boostwellbeing/survey" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Wellbeing Survey
            </Link>
            <Link href="/boostwellbeing/contact" className="text-blue-600 font-semibold">
              Contact
            </Link>
            <Link href="/boostwellbeing" className="text-slate-700 hover:text-blue-600 transition-colors">
              ← Back Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container-turtle py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            Get Your Free Business Quote
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            Let's Talk About Your Team's Wellbeing
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Schedule a free consultation with our HR benefits specialist to discuss how
            Southern Cross Group Health Insurance can support your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card-turtle p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Request a Quote</h2>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                  <p className="text-slate-600">
                    We've received your request and will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  {/* Contact Name */}
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-slate-700 mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
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
                      Phone Number *
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
                        <option value="15-25">15-25 employees</option>
                        <option value="26-50">26-50 employees</option>
                        <option value="51-100">51-100 employees</option>
                        <option value="101-250">101-250 employees</option>
                        <option value="251+">251+ employees</option>
                      </select>
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-slate-700 mb-2">
                      I'm interested in *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                    >
                      <option value="both">Group Health Insurance & Wellbeing Survey</option>
                      <option value="group-health">Group Health Insurance Only</option>
                      <option value="wellbeing">Wellbeing Survey for My Team</option>
                    </select>
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Request Free Quote
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting this form, you agree to be contacted by our team regarding your enquiry.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* What Happens Next */}
            <div className="card-turtle p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">What happens next?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">We'll Review Your Request</h4>
                    <p className="text-sm text-slate-600">
                      Our HR benefits specialist will review your details within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Free Consultation Call</h4>
                    <p className="text-sm text-slate-600">
                      We'll schedule a 30-minute call to understand your needs and answer questions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Customized Quote</h4>
                    <p className="text-sm text-slate-600">
                      Receive a tailored quote showing investment, employee value, and ROI projections
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="card-turtle p-8 bg-gradient-to-br from-blue-50 to-green-50">
              <h3 className="text-xl font-bold text-slate-900 mb-6">What you'll get</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-700">Free consultation with HR benefits specialist</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-700">No-obligation customized quote</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-700">ROI projection and cost-benefit analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-700">Implementation roadmap and timeline</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-700">Access to wellbeing survey for your team</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="card-turtle p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Other ways to reach us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href="mailto:hello@boostwellbeing.co.nz" className="text-slate-700 hover:text-blue-600 transition-colors">
                    hello@boostwellbeing.co.nz
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href="tel:+64800BOOST" className="text-slate-700 hover:text-blue-600 transition-colors">
                    0800 BOOST (26678)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">Mon-Fri: 9am - 5pm NZST</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="card-turtle p-6 bg-gradient-to-r from-blue-600 to-green-600 text-white text-center">
              <Shield className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <h3 className="font-bold mb-2">Haven't taken the survey yet?</h3>
              <p className="text-sm text-blue-50 mb-4">
                Get insights into your team's wellbeing first
              </p>
              <Link
                href="/boostwellbeing/survey"
                className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:shadow-lg transition-all"
              >
                Take Wellbeing Survey
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-20">
        <div className="container-turtle">
          <div className="text-center text-sm text-slate-600">
            <p className="mb-2">
              <strong>BoostWellbeing</strong> - Powered by Southern Cross Health Insurance
            </p>
            <p>© 2025 BoostWellbeing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
