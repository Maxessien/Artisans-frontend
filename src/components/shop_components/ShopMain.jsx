import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  prevPage,
  setPage,
} from "../../store_slices/productPageSlice";
import logger from "../../utils/logger";
import Button from "../reusable_components/Buttons";
import Products from "./Products";
import { useRouter, useSearchParams } from "next/navigation";

const ShopMain = ({ initialShopData }) => {
  const { currentPage, totalPages } = useSelector((state) => state.productPage);
  const dispatch = useDispatch();
  const searchParam = useSearchParams();
  const router = useRouter();
  const initCurrentPages = currentPage ? currentPage : 1;
  const initTotalPages = totalPages ? totalPages : initialShopData.totalPages;

  const redirectToNewPage = (pageNumber) => {
    if (!Number.isFinite(pageNumber)) return;
    const newUrl = `/shop?${
      searchParam.get("page")
        ? searchParam
            .toString()
            .replace(`page=${searchParam.get("page")}`, `page=${pageNumber}`)
        : `${searchParam.toString()}&page=${pageNumber}`
    }`;
    router.push(newUrl);
  };
  return (
    <>
      <Products
        initialProductsData={initialShopData?.data}
        pageNumber={initCurrentPages}
      />
      <div className="flex items-center pb-8 justify-center gap-3 mt-4 w-full">
        {initCurrentPages > 1 && (
          <Button
            type="primary"
            size="small"
            extraStyles={{
              fontSize: "1.125rem",
              fontWeight: 700,
              padding: "0.5rem",
            }}
            buttonFn={() => {
              const pageNum = currentPage - 1;
              dispatch(prevPage());
              redirectToNewPage(pageNum);
            }}
          >
            <MdArrowBack />
          </Button>
        )}
        {Array(initTotalPages)
          .fill(0)
          .map((_, page) => {
            logger.info("Rendering pagination page", page + 1);
            return (
              <div key={page}>
                <Button
                  size="small"
                  width="35px"
                  extraStyles={{ height: "35px", textAlign: "center" }}
                  type={initCurrentPages === page + 1 ? "primary" : "secondary"}
                  buttonFn={() => {
                    const pageNum = page + 1;
                    dispatch(setPage(page + 1));
                    redirectToNewPage(pageNum);
                  }}
                >
                  {page + 1}
                </Button>
              </div>
            );
          })}
        {initCurrentPages < initTotalPages && (
          <Button
            type="primary"
            size="small"
            extraStyles={{ fontSize: "1.125rem", fontWeight: 700 }}
            buttonFn={() => {
              const pageNum = currentPage + 1;
              dispatch(nextPage());
              redirectToNewPage(pageNum);
            }}
          >
            <MdArrowForward />
          </Button>
        )}
      </div>
    </>
  );
};

export default ShopMain;
