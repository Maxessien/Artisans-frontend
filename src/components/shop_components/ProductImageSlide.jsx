"use client";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductImageSlide = ({ images, productName }) => {
  const [containerScroll, setContainerScroll] = useState({
    totalImages: images?.length,
    position: 0,
  });

  const scrollImage = (direction) => {
    direction === "forward"
      ? setContainerScroll((state) => ({
          ...state,
          position: state.position + 100 / state.totalImages,
        }))
      : setContainerScroll((state) => ({
          ...state,
          position: state.position - 100 / state.totalImages,
        }));
  };

  return (
    <>
      <div className="relative overflow-x-auto aspect-square w-full max-w-[520px] mx-auto sm:w-1/2">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: `${containerScroll.position}%` }}
          transition={{ duration: 0.4 }}
          className="flex justify-start snap-x w-max"
        >
          {containerScroll.position > 0 && (
            <button
              className="absolute top-1/2 left-4 p-2 inline-flex items-center justify-center"
              onClick={() => scrollImage("backward")}
            >
              <FaArrowLeft />
            </button>
          )}
          {images?.map(({ url }) => {
            return (
              <img
                src={url}
                alt={`${productName} image`}
                className="snap-start object-cover w-full z-1"
              />
            );
          })}
          {containerScroll.position < 100 - 100 / containerScroll.totalImages &&
            containerScroll.totalImages?.length > 1 && (
              <button
                className="absolute top-1/2 right-4 p-2 inline-flex items-center justify-center"
                onClick={() => scrollImage("forward")}
              >
                <FaArrowRight />
              </button>
            )}
        </motion.div>
      </div>
    </>
  );
};

export default ProductImageSlide;
