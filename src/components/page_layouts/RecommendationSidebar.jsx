"use client";
import { useRouter } from "next/navigation";
import { Cards } from "../reusable_components/CardsLayouts";

const RecListProductCards = ({ name, price, productId, images }) => {
  const router = useRouter();
  return (
    <>
      <Cards
        onClick={() => router.push(`/shop/${productId}`)}
        className="flex justify-start gap-3"
      >
        <div className="w-10 aspect-square">
          <img
            src={images[0].url}
            alt={`${name} image`}
            className="object-cover w-full"
          />
        </div>
        <div>
          <p className="text-base font-semibold text-[var(--text-primary-light)] mb-2">
            {name}
          </p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            &#8358;{price}
          </p>
        </div>
      </Cards>
    </>
  );
};

const RecommendationSidebar = ({ products, layoutStyle = "" }) => {
  return (
    <>
      <aside
        className={`px-2 py-3 w-full h-full bg-[--text-secondary-light] ronded-md shadow-[0px_0px_6px_-3px_var(--text-primary)] ${layoutStyle}`}
      >
        <h1 className="text-lg font-semibold text-black">
          Recommended Products
        </h1>
        <ul className="space-y-2">
            {products?.map((product) => (
              <li>
              <RecListProductCards {...product} />
              </li>
            ))}
        </ul>
      </aside>
    </>
  );
};

export default RecommendationSidebar;
