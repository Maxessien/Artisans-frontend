import { usePathname } from "next/navigation";
import { HeartIcon } from "../svg_components/NavigationSvg";
import Button from './../reusable_components/Buttons';



const HomeProductCards = ({ name, description, price, imageUrl, showBtn=false }) => {
  const pathname = usePathname()
  
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="relative rounded-md w-full">
          <button className="rounded-full p-2 bg-[var(--text-secondary-light)] shadow-[0px_0px_10px_-5px_black] absolute top-2 right-2">
            <HeartIcon className="text-(--main-primary)" size={22} />
          </button>
          <img
            className="w-full object-cover"
            src={imageUrl}
            alt={`${name} image`}
          />
        </div>
        <p className={`${pathname === "/explore" ? "text-base" : "text-lg"} text-[var(--text-primary)] text-left font-medium`}>
          {name}
        </p>
        {description && <p className={`${pathname === "/explore" ? "text-sm" : "text-base"} text-[var(--main-secondary)] text-left font-medium`}>
          {description}
        </p>}
        <p className={`${pathname === "/explore" ? "text-lg" : "text-xl"} text-[var(--main-primary)] text-left font-semibold`}>
          #{price}
        </p>
        {showBtn && (
          <Button width="100%">Add To Cart</Button>
        )}
      </div>
    </>
  );
};


export default HomeProductCards