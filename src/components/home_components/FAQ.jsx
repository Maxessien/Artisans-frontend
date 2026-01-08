"use client"

import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { homeSectionPadding } from "./AboutUs";

const FaqDropdown = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div
        className={`flex justify-between gap-2 ${
          expanded
            ? "border-2 border-[var(--main-primary)]"
            : "shadow-[0px_0px_10px_-5px_black]"
        } p-3 rounded-md w-full`}
      >
        <div>
          <p className="text-lg text-[var(--text-primary)] mb-2 font-normal">
            {question}
          </p>
          {expanded && (
            <AnimatePresence>
              <motion.p
                className="text-base text-[var(--text-primary-light)] font-normal"
                animate={{ scaleY: [0, 1] }}
                exit={{ scaleY: [1, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {answer}
              </motion.p>
            </AnimatePresence>
          )}
        </div>
        <button
          className={`p-3 h-max text-base rounded-full ${
            expanded
              ? "bg-[var(--text-secondary-light)]"
              : "bg-[var(--text-secondary-light)]"
          }`}
          onClick={() => setExpanded(!expanded)}
        >
          <MdArrowDropDown />
        </button>
      </div>
    </>
  );
};

const FAQ = () => {
  const faqMockDataset = [
    {
      question: "How do I place an order?",
      answer: "Simply browse any product, select your preferred options, and click “Add to Cart”. Then proceed to checkout to complete your purchase."
    },
    {
      question: "Are all products handmade?",
      answer: "Most products are handmade but a few of them are manufactured with machineries for faster production."
    },
    {
      question: "Are the artisans verified?",
      answer: "Yes all Artisans are verified."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, simply navigate to the order section in your account page."
    },
  ]
  return (
    <>
      <section className={`bg-[var(--main-tertiary-light)] ${homeSectionPadding} w-full min-w-screen`}>
        <div className="w-full flex flex-col sm:flex-row items-center sm:utems-stretch justify-between gap-2 mb-5">
          <h2 className="text-2xl text-[var(--text-primary)] font-normal">Frequently <span className="text-[var(--main-primary)]">Asked Questions</span></h2>
          <p className="text-lg text-[var(--text-primary)] text-left w-full sm:w-[45%] font-normal">
            Find answers to the most common questions about shopping on our
            platform.
          </p>
        </div>
        <section className="flex flex-col sm:flex-row gap-8 w-full">
          <img className="w-full sm:w-[50%]" src="designs/woman-standing.png" alt="Rep image" />
          <div className="w-full sm:w-[50%] flex flex-col gap-3 items-start">
            {faqMockDataset?.map((data)=><FaqDropdown {...data} />)}
          </div>
        </section>
      </section>
    </>
  );
};

export default FAQ;
