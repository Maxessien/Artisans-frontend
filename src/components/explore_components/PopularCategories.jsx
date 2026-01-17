"use client";
import { useRouter } from 'next/navigation';

const PopularCategory = ({initCategories}) => {
  const router = useRouter()
  const categoriesData = [
    {
      title: "Fashion and Apparel",
      image_url: "fashion-category-bg.png",
    },
    {
      title: "Jewelries and Accessories",
      image_url: "jeweleries-category-bg.png",
    },
    {
      title: "Leather Shoes",
      image_url:
        "Stunning Handmade Mens brown leather dress shoes, penny loafer shoes for men, Mens shoes 2024 1.png",
    },
    {
      title: "Textile Bags",
      image_url: "green-bag.jpg",
    },
    {
      title: "Hair Accessories",
      image_url: "three-color-bows.jpg",
    },
    {
      title: "Art and Paintings",
      image_url: "woman-art.jpg",
    },
    {
      title: "Pottery and Ceramics",
      image_url: "traditional-vase.jpg",
    },
    {
      title: "Musical Instruments",
      image_url: "standing-talking-drum2.jpg",
    },
  ];

  const categories = initCategories?.length > 0 ? initCategories : categoriesData
  return (
    <>
      <section className="w-full py-10 px-5 sm:px-10 md:px-13 lg:p-20 h-[340px] sm:h-[440px] md:h-[480px] lg:h-[520px]">
        <h2 className="font-normal w-full text-left text-[var(--text-primary)] mb-4 md:text-2xl text-xl">
          Popular Categories
        </h2>

        <div className="overflow-x-auto flex gap-3 h-full py-3">
          {categories?.map(({ title, image_url }) => {
            return (
              <div onClick={()=>router.push(`/shop?cat=${encodeURIComponent(title)}`)} className="relative aspect-square h-full">
                <img
                  className="h-full w-full"
                  src={`designs/${image_url}`}
                  alt={`${title} image`}
                />
                <p className="absolute bottom-2 left-2 text-sm sm:text-base text-[var(--main-secondary-light)] font-normal">
                  {title}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default PopularCategory;
