import { useState } from "react";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the purpose of the Employee Management System?",
      answer:
        "The Employee Management System is designed to streamline HR processes, manage employee data, and facilitate communication within the organization.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your registered email.",
    },
    {
      question: "Can I update my personal information?",
      answer:
        "Yes, employees can update their personal information through their profile settings in the system.",
    },
    {
      question: "How do I apply for leave?",
      answer:
        "To apply for leave, navigate to the 'Leave Management' section and fill out the leave request form.",
    },
    {
      question: "Who do I contact for technical support?",
      answer:
        "For technical support, please contact the IT department via the support email or through the helpdesk portal.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="md:my-10 my-5">
        <SectionHeader title={"FAQ "}></SectionHeader>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border">
            <button
              className="flex justify-between w-full p-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              <span className="text-gray-500">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
