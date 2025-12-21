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

const ShopMain = ({ initialShopData }) => {
  const { currentPage, totalPages } = useSelector((state) => state.productPage);
  const dispatch = useDispatch();
  const initCurrentPages = currentPage ? currentPage : 1;
  const initTotalPages = totalPages ? totalPages : initialShopData.totalPages;
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
            extraStyles={{ fontSize: "1.125rem", fontWeight: 700, padding: "0.5rem" }}
            buttonFn={() => dispatch(prevPage())}
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
                  buttonFn={() => dispatch(setPage(page + 1))}
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
            buttonFn={() => dispatch(nextPage())}
          >
            <MdArrowForward />
          </Button>
        )}
      </div>
    </>
  );
};

export default ShopMain;
