import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export default function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section margin-top-lg" aria-label="Preguntas Frecuentes">
      <h2 className="text-center" style={{ marginBottom: '1.5rem' }}>Preguntas Frecuentes</h2>
      <div className="faq-list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="faq-item">
              <button
                className="faq-trigger"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{item.question}</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {isOpen && (
                <div 
                  id={`faq-answer-${index}`} 
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                >
                  <p style={{ margin: 0 }}>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
