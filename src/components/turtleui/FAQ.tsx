'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export function FAQ({ items, className = '' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-turtle-green-300"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left group"
          >
            <span className="text-lg font-semibold text-slate-900 group-hover:text-turtle-green-600 transition-colors pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-6 h-6 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180 text-turtle-green-500' : ''
              }`}
            />
          </button>

          <div
            className={`transition-all duration-200 ease-in-out ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="px-6 pb-5 pt-2">
              <p className="text-slate-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface FAQSectionProps {
  title: string;
  description?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ title, description, items, className = '' }: FAQSectionProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{title}</h2>
        {description && (
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">{description}</p>
        )}
      </div>

      <FAQ items={items} />
    </div>
  );
}