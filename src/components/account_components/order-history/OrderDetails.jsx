import { PayStackIcon } from "../../svg_components/PaymentSvg";

const OrderDetails = ({ 
  orderId, 
  orderDate,
  deliveryDate,
  receiverInfo, 
  paymentMethod, 
}) => {

  return (
    <div className="w-full max-w-md bg-(--text-secondary-light) rounded-lg p-6 space-y-6">
      {/* Order Info Section */}
      <section className="grid grid-cols-2 gap-4 pb-6 border-b border-(--text-secondary-light)">
        <div>
          <p className="text-sm text-(--main-secondary) mb-1">Order ID</p>
          <p className="text-base font-semibold text-(--text-primary)">{orderId}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-(--main-secondary) mb-1">Order Date</p>
          <p className="text-base font-normal text-(--text-primary)">{orderDate}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-(--main-secondary) mb-1">Order Delivered</p>
          <p className="text-base font-normal text-(--text-primary)">{deliveryDate}</p>
        </div>
      </section>

      {/* Receiver Info Section */}
      <section className="pb-6 border-b border-(--text-primary-light)">
        <h3 className="text-lg font-semibold text-(--text-primary) mb-4">Receiver Info</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-(--main-secondary)">Name</span>
            <span className="text-sm font-medium text-(--text-primary)">{receiverInfo?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-(--main-secondary)">Address</span>
            <span className="text-sm font-medium text-(--text-primary) text-right max-w-[200px]">
              {receiverInfo?.address}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-(--main-secondary)">Phone no.</span>
            <span className="text-sm font-medium text-(--text-primary)">{receiverInfo?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-(--main-secondary)">Email</span>
            <span className="text-sm font-medium text-(--text-primary)">{receiverInfo?.email}</span>
          </div>
        </div>
      </section>

      {/* Payment Method Section */}
      <section className="pb-6 border-b border-(--main-secondary)">
        <h3 className="text-lg font-semibold text-(--text-primary) mb-4">Payment Method</h3>
        <div className="flex items-center gap-3">
          <PayStackIcon />
          <span className="text-base font-medium text-(--text-primary)">{paymentMethod}</span>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;