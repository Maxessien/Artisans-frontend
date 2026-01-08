"use client";

import { useState } from "react";
import { fetchProductReviews } from "../../utils/fetchingHelpers";
import { useQuery } from "@tanstack/react-query";
import { FaFilter, FaStar } from "react-icons/fa";
import { CommentCard } from "./ProductReviewSubComp";
import Button from './../reusable_components/Buttons';


const ProductReviews = ({ initReviews, productId, totalPages }) => {
  const [reviewPage, setReviewPages] = useState({
    currentPage: initReviews.length > 0 ? 1 : 0,
    totalPages: totalPages,
  });

  const { data } = useQuery({
    queryKey: ["reviews", reviewPage.currentPage],
    onSuccess: () =>
      setReviewPages((state) => ({
        ...state,
        currentPage: state.currentPage + 1,
      })),
    queryFn: () => fetchProductReviews(productId, reviewPage.currentPage + 1),
    enabled: !initReviews || initReviews?.length === 0,
    ...(initReviews?.length > 0 ? { initialData: initReviews } : {}),
  });

  const averageStars =
    data.reduce((prev, curr) => {
      return curr.rating + prev;
    }, 0) / data.length;

  return (
    <>
      <section className="w-full py-5 space-y-5">
        <header className="flex justify-between items-center">
          <h2 className="font-semibold text-3xl text-[var(--text-primary)] space-x-1">
            <span>{averageStars}</span>
            <span className="font-normal text-lg text-[var(--main-tertiary)]">
              OUT OF 5
            </span>
          </h2>
          <div className="flex flex-col gap-2 items-end justify-center">
            <div className="flex gap-2 justify-end items-center">
              {Array(5)
                .fill("star")
                .map((_, index) => {
                  return (
                    <FaStar
                      size={24}
                      color={`${
                        index <= averageStars
                          ? "rgb(255, 221, 0)"
                          : "var(--main-tertiary)"
                      }`}
                    />
                  );
                })}
            </div>
            <p className="text-base text-[var(--main-tertiary)] font-semibold">
              {data?.length} Reviews
            </p>
          </div>
        </header>
        <ul className="w-full flex flex-col justify-start items-start gap-3">
          <RatingsStarsList data={data} stars={5} />
          <RatingsStarsList data={data} stars={4} />
          <RatingsStarsList data={data} stars={3} />
          <RatingsStarsList data={data} stars={2} />
          <RatingsStarsList data={data} stars={1} />
        </ul>

        <div className="w-full flex justify-between items-center">
          <button className="inline-flex gap-1 px-3 py-2 rounded-full bg-[var(--main-tertiary)]"><FaFilter />{" "}Filters</button>
          <span className="text-base text-[var(--main-tertiary)] font-medium">{data.length}{" "}reviews</span>
        </div>

        <ul className="w-full flex flex-col">
          {data?.map((reviews, index)=>{
            return <CommentCard key={reviews.id ?? reviews.reviewId ?? index} {...reviews} />
          })}
        </ul>

        <Button width="100%">Write Review</Button>
      </section>
    </>
  );
};

export default ProductReviews;
