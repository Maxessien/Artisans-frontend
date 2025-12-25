import Button from "../reusable_components/Buttons";

const DetailsList = ({ title = "", value = "" }) => {
  return (
    <li className="flex justify-between items-center gap-3 text-base text-(--main-secondary-light) font-normal">
      <span>{title}</span>
      <span className="text-(--text-primary)">{value}</span>
    </li>
  );
};

const PaymentSuccessful = () => {
  return (
    <>
      <div className="p-3 bg-(--main-tertiary) rounded-full">
        <div className="p-3 bg-green-600 rounded-full">
          <PaymentSuccessful />
        </div>
      </div>
      <header className="space-y-3">
        <h1 className="text-xl text-(--text-primary) w-full text-center font-normal">
          Payment Succesful
        </h1>
        <p className="text-base text-(--text-primary) w-full text-center font-normal">
          Your Order has been Placed and Processing has Started
        </p>
      </header>
      <section className="space-y-2 w-full bg-(--main-tertiary) rounded-md px-2 py-3">
        <h2 className="text-lg text-(--text-primary) w-full text-left font-normal">
          Payment Details
        </h2>
        <ul className="space-y-2">
          <DetailsList title="Transaction ID" value="5582  2232  2930" />
          <DetailsList title="Type of Transaction" value="Credit Card" />
          <DetailsList title="Date" value="07:00  |  19 Sep  2025" />
        </ul>
        <p className="flex justify-between items-center gap-3 text-base text-(--text-primary) font-normal">
          <span>Total Paid</span>
          <span>$#75,000</span>
        </p>
      </section>
      <div className="space-y-2">
        <Button width="100%">Track Your Order</Button>
        <Button type="secondary" width="100%">
          Go Home
        </Button>
      </div>
    </>
  );
};

export default PaymentSuccessful;
