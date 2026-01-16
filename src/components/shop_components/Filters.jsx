import { useForm } from "react-hook-form";
import Button from "../reusable_components/Buttons";
import "./scss/filters.scss";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../store_slices/productPageSlice";
import { useRouter, useSearchParams } from "next/navigation";

const Filters = ({ closeFilterFn, categories }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { currentSize } = useSelector((state) => state.screenSize);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      sortType: searchParams.get("sort") || "date_added",
      sortOrder: searchParams.get("order") || "desc",
      minPrice: searchParams.get("price")?.split("-")[0] || 5,
      maxPrice: searchParams.get("price")?.split("-")[1] || 400000,
      categories: searchParams.get("cat")?.split("-")?.map((val)=>decodeURIComponent(val)) || categories,
    },
  });

  const submitFilter = ({
    sortType,
    sortOrder,
    minPrice,
    maxPrice,
    categories,
  }) => {
    dispatch(setPage(1));
    closeFilterFn ? closeFilterFn() : null;
    router.push(
      `/shop${
        searchParams.get("search")?.length > 0 &&
        typeof searchParams.get("search") === "string"
          ? `?search=${searchParams.get("search")}&`
          : "?"
      }cat=${encodeURIComponent(categories.map((cat)=>encodeURIComponent(cat)).join(
        "-")
      )}&sort=${sortType}&order=${sortOrder}&price=${minPrice}-${maxPrice}&page=1`
    );
  };

  return (
    <>
      <form className={`filter_form`} onSubmit={handleSubmit(submitFilter)}>
        {currentSize <= 768 && (
          <Button
            size="small"
            buttonFn={() => (closeFilterFn ? closeFilterFn() : null)}
          >
            <FaTimes />
          </Button>
        )}
        <h3>Sort By</h3>
        <div className="sort_options">
          <label htmlFor="sortType">
            <span>Type</span>
            <select id="sortType" {...register("sortType")}>
              <option value="ratings">Popularity</option>
              <option value="date_added">Recent</option>
              <option value="price">Price</option>
            </select>
          </label>
          <label htmlFor="sortOrder">
            <span>Order</span>
            <select id="sortOrder" {...register("sortOrder")}>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </label>
        </div>
        {categories?.length > 0 && (
          <>
            <h3>Categories</h3>
            <div className="category_options">
              {categories.map((category) => {
                return (
                  <label key={category} htmlFor={category}>
                    <input
                      type="checkbox"
                      value={category}
                      id={category}
                      {...register("categories")}
                    />
                    <span>{category}</span>
                  </label>
                );
              })}
            </div>
          </>
        )}
        <h3>Price Range</h3>
        <div className="price_range">
          <label htmlFor="min">
            <span>Min</span>
            <input type="number" id="min" {...register("minPrice")} />
          </label>
          <label htmlFor="max">
            <span>Max</span>
            <input type="number" id="max" {...register("maxPrice")} />
          </label>
        </div>
        <Button
          type="secondary"
          rounded="6px"
          extraStyles={{
            borderWidth: "1px",
            borderColor: "var(--text-primary)",
            marginRight: "8px",
          }}
          buttonFn={() => {
            reset();
            router.push("/shop");
          }}
          buttonType="button"
        >
          Reset
        </Button>
        <Button
          rounded="6px"
          buttonType="submit"
          extraStyles={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1rem" }}
        >
          Apply Filters
        </Button>
      </form>
    </>
  );
};

export default Filters;
