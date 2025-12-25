"use client";

const ShopByCategory = ({data}) => {
  const categoriesData = [
    {
      name: "Fashion and Apparel",
      imageUrl: "fashion-category-bg.png",
    },
    {
      name: "Jewelries and Accessories",
      imageUrl: "jeweleries-category-bg.png",
    },
    {
      name: "Leather Shoes",
      imageUrl:
        "Stunning Handmade Mens brown leather dress shoes, penny loafer shoes for men, Mens shoes 2024 1.png",
    },
    {
      name: "Textile Bags",
      imageUrl: "green-bag.jpg",
    },
    {
      name: "Hair Accessories",
      imageUrl: "three-color-bows.jpg",
    },
    {
      name: "Art and Paintings",
      imageUrl: "woman-art.jpg",
    },
    {
      name: "Pottery and Ceramics",
      imageUrl: "traditional-vase.jpg",
    },
    {
      name: "Musical Instruments",
      imageUrl: "standing-talking-drum2.jpg",
    },
  ];

  const categories = data ?? categoriesData
  return (
    <>
      <section className="bg-[var(--main-tertiary-light)] w-full py-10 px-5 sm:px-10 md:px-13 lg:p-20 h-[340px] sm:h-[440px] md:h-[480px] lg:h-[520px]">
        <h2 className="font-normal w-full text-center text-[var(--text-primary)] mb-4 md:text-2xl text-xl">
          Shop by <span className="text-[var(--main-primary)]">category</span>
        </h2>

        <div className="overflow-x-auto flex gap-3 h-full py-3">
          {categories.map(({ name, imageUrl }) => {
            return (
              <div className="relative aspect-square h-full">
                <img
                  className="h-full w-full"
                  src={`designs/${imageUrl}`}
                  alt={`${name} image`}
                />
                <p className="absolute bottom-2 left-2 text-sm sm:text-base text-[var(--main-secondary-light)] font-normal">
                  {name}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ShopByCategory;
