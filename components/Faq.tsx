"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    question: "Are your products original and branded (Nike, Adidas, Levi’s, etc.)?",
    answer: (
      <>
        Yes, we showcase only authentic products from trusted brands like{" "}
        <strong>Nike, Adidas, Levi’s, Puma</strong>, and more.
      </>
    ),
  },
  {
    question: "Can I place an order directly through this website?",
    answer: (
      <>
        <strong>No.</strong> This website is a showcase of our collection. To
        purchase, please visit our physical store or contact us directly.
      </>
    ),
  },
  {
    question: "How can I buy the products I see here?",
    answer: (
      <>
        You can note the product and reach out to us via <strong>phone</strong>,{" "}
        <strong>WhatsApp</strong>, or by visiting our shop. Our team will assist
        you with availability and pricing.
      </>
    ),
  },
  {
    question: "Do you update your collection regularly?",
    answer: (
      <>
        Yes, we frequently update our showcase with the latest arrivals,
        seasonal trends, and exclusive collections.
      </>
    ),
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-10 max-w-xl mx-auto px-2">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Frequently Asked Questions
      </h2>
      <dl className="mt-6 space-y-6 divide-y divide-gray-200">
        {faqItems.map((item, index) => (
          <div key={index} className="pt-6">
            <dt className="text-lg">
              <button
                type="button"
                className="flex items-start justify-between w-full text-left text-gray-400"
                aria-controls={`faq-${index}`}
                aria-expanded={openIndex === index}
                onClick={() => toggle(index)}
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <span className="flex items-center ml-6 h-7 transition-transform duration-300">
                  <svg
                    className={`w-6 h-6 transform ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
            </dt>
            <dd
              className={`pr-12 mt-2 text-base text-gray-500 transition-all duration-300 ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
              id={`faq-${index}`}
            >
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
