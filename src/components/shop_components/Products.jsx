import logger from "../../utils/logger";
import ProductCards from "../home_components/ProductCards";
import "./scss/products.scss";

const Products = ({ initialProductsData }) => {
  const productsData = initialProductsData;

  return (
    <>
      {logger.info("Rendering shop products", initialProductsData)}
      <section className="shop_product">
        <h2>Shop</h2>
        <div className="shop_product_display">
          {productsData?.length > 0 ? (
            productsData.map(({ name, price, productId, images }) => {
              return (
                <div key={productId}>
                  <ProductCards
                    imageUrl={images[0].url}
                    name={name}
                    price={price}
                    productId={productId}
                  />
                </div>
              );
            })
          ) : (
            <p className="flex items-center justify-center w-full font-bold text-xl text-[var(--main-secondary-light)]">
              No Products Listed
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
