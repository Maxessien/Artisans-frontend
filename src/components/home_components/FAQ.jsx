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
            : "bg-[var(--main-secondary)]"
        } p-3 rounded-md`}
      >
        <div>
          <p className="text-lg text-[var(--text-primary)] mb-2 font-normal">
            {question}
          </p>
          {expanded && (
            <AnimatePresence>
              <motion.p
                className="text-lg text-[var(--text-primary)] font-normal"
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
          className={`p-3 text-base rounded-full ${
            expanded
              ? "bg-[var(--main-secondary-light)]"
              : "bg-[--text-secondary-light]"
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
  return (
    <>
      <section className={`${homeSectionPadding} w-full min-w-screen`}>
        <div className="w-full flex justify-between gap-2">
          <h2>Frequently Asked Questions</h2>
          <p>
            Find answers to the most common questions about shopping on our
            platform.
          </p>
        </div>
        <section>
          <img src="designs/woman-standing.png" alt="Rep image" />
          <div></div>
        </section>
      </section>
    </>
  );
};

export default FAQ;
