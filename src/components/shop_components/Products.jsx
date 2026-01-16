import logger from "../../utils/logger";
import HomeProductCards from "../home_components/HomeProductCards";
import "./scss/products.scss";

const Products = ({ initialProductsData }) => {
  const productsData = initialProductsData;

  return (
    <>
      {logger.info("Rendering shop products", initialProductsData)}
      <section className="shop_product">
        <div className="shop_product_display">
          {productsData?.length > 0 ? (
            productsData.map(({ product_name, price, product_id, images }) => {
              return (
                <div key={product_id}>
                  <HomeProductCards
                    imageUrl={images[0]}
                    name={product_name}
                    price={price}
                    productId={product_id}
                  />
                </div>
              );
            })
          ) : (
            <p className="flex items-center justify-center w-full font-medium text-xl text-[var(--main-secondary)]">
              No Products Listed
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
