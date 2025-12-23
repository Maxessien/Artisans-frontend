import { useMutation } from "@tanstack/react-query";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../axiosApiBoilerplates/authApi";
import { setUserAuth } from "../../store_slices/userAuthSlice";
import logger from "../../utils/logger";

const CartListProductCard = ({
  name,
  description,
  price,
  quantity,
  imageUrl,
  productId,
  isSelected,
}) => {
  const { idToken, userData } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const deleteFromCart = async () => {
    try {
      const res = await authApi(idToken).delete(
        `/user/${userData?.userId}/cart/${productId}`
      );
      logger.info("Deleted from cart", res);
    } catch (err) {
      logger.error("Failed deleting from cart", err);
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
      logger.info("Updated cart quantity", res.data);
      dispatch(
        setUserAuth({
          stateProp: "userData",
          value: res.data,
        })
      );
    } catch (err) {
      logger.error("Failed updating cart quantity", err);
    }
  };

  const { mutateAsync } = useMutation({ mutationFn: () => deleteFromCart() });

  return (
    <>
      <label className="flex justify-start items-center">
        <input type="checkbox" value={()=>isSelected(productId)} className="hidden" />
        <div className="h-[14px] w-[14px] flex justify-center items-center border-[var(--main-primary)] border-2">
          {()=>isSelected(productId) && (
            <div className="h-3 w-3 bg-[var(--main-primary)]"></div>
          )}
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--text-secondary-light)] shadow-sm border">
          {/* Image */}
          <img
            src={imageUrl}
            alt={name}
            className="w-20 h-20 rounded-lg object-cover"
          />

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">{name}</h3>

            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}

            <p className="text-sm font-bold mt-2">₦{price.toLocaleString()}</p>
          </div>

          {/* Quantity controls */}
          <div className="flex flex-col justify-between items-center">
            <button onClick={mutateAsync}>
              <FaTrash color="var(--main-primary)" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateCartQuantity(-1)}
                className="w-7 h-7 rounded-full bg-gray-200 text-sm font-bold"
              >
                <FaMinus />
              </button>

              <span className="text-sm font-medium">{quantity}</span>

              <button
                onClick={() => updateCartQuantity(1)}
                className="w-7 h-7 rounded-full bg-red-600 text-white text-sm font-bold"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </label>
    </>
  );
};

export default CartListProductCard;
