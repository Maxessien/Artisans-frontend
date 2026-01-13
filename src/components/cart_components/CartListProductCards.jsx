import { useMutation } from "@tanstack/react-query";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { authApi } from "../../axiosApiBoilerplates/authApi";
import logger from "../../utils/logger";
import { toast } from "react-toastify";
import Button from "../reusable_components/Buttons";

const CartListProductCard = ({
  name,
  description,
  price,
  quantity,
  imageUrl,
  productId,
  cartId,
  isSelected,
  selectFn,
  removeFn = () => null,
  updateFn = () => null,
}) => {
  const { idToken, userData } = useSelector((state) => state.userAuth);
  const deleteFromCart = async () => {
    try {
      const res = await authApi(idToken).delete(`/user/cart/${cartId}`);
      removeFn(cartId);
      logger.info("Deleted from cart", res.data);
      toast.success("Item sucessfully deleted from cart");
    } catch (err) {
      logger.error("Failed deleting from cart", err);
      toast.error("Couldn't delete product from cart, Try again later");
    }
  };

  const updateCartQuantity = async (value) => {
    try {
      const res = await authApi(idToken).post(
        `/user/${userData?.userId}/cart`,
        {
          productId: productId,
          quantity: value,
        }
      );
      updateFn(cartId, quantity + value);
      logger.info("Updated cart quantity", res.data);
    } catch (err) {
      logger.error("Failed updating cart quantity", err);
      toast.error("Couldn't update cart quantity, Try again later");
    }
  };

  const { mutateAsync } = useMutation({ mutationFn: () => deleteFromCart() });

  return (
    <>
      <div className="flex justify-start items-center gap-1 w-full">
        <input type="checkbox" defaultChecked={isSelected} className="hidden" />
        <div onClick={() => selectFn(productId)} className="h-[14px] w-[14px] flex justify-center items-center rounded-full border-[var(--main-primary)] border-2">
          {isSelected && (
            <div className="h-2 w-2 rounded-full bg-[var(--main-primary)]"></div>
          )}
        </div>
        <div className="flex h-full items-center gap-4 p-4 justify-between rounded-xl bg-[var(--text-secondary-light)] shadow-sm border">
          <div onClick={() => selectFn(productId)} className="flex items-center gap-3">
            {/* Image */}
            <img
              src={imageUrl}
              alt={name}
              className="w-20 h-20 rounded-lg object-cover"
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-(--text-primary)">
                {name}
              </h3>

              {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              )}

              <p className="text-sm font-bold mt-2">
                ₦{price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Quantity controls */}
          <div className="flex flex-col h-full justify-between items-center">
            <button onClick={mutateAsync}>
              <FaTrash color="var(--main-primary)" />
            </button>
            <div className="flex items-center gap-2">
              <Button buttonFn={() => updateCartQuantity(-1)} type="secondary">
                <FaMinus />
              </Button>

              <span className="text-sm font-medium">{quantity}</span>

              <Button buttonFn={() => updateCartQuantity(1)}>
                <FaPlus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartListProductCard;
