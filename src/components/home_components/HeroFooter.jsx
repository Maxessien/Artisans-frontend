import { FaLock, FaPhone, FaTruck } from "react-icons/fa";

const HeroFooterCards = ({ icon, title, description }) => {
  return (
    <>
      <div className="flex grow-0 gap-2">
        <div className="rounded-full bg-[var(--main-primary-lighter)] p-3 h-max inline-flex justify-center items-center">
          {icon}
        </div>
        <p className="space-y-2.5">
          <h3 className="text-xl text-[var(--text-primary)] font-medium">
            {title}
          </h3>
          <span className="text-base text-[var(--main-secondary)] font-medium">
            {description}
          </span>
        </p>
      </div>
    </>
  );
};

const ReturnParselSvg = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.12354 13.5344V8.32886H21.8633V13.5344C21.8633 17.4605 21.8633 19.4237 20.6436 20.6434C19.4239 21.8631 17.4607 21.8631 13.5345 21.8631H11.4523C7.52609 21.8631 5.56299 21.8631 4.34326 20.6434C3.12354 19.4237 3.12354 17.4605 3.12354 13.5344Z"
        stroke="#9D1F15"
        stroke-width="1.24932"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.12354 8.32879L4.02448 6.32667C4.72323 4.77392 5.07259 3.99755 5.78074 3.56042C6.4889 3.12329 7.39725 3.12329 9.21397 3.12329H15.7729C17.5896 3.12329 18.498 3.12329 19.2061 3.56042C19.9143 3.99755 20.2637 4.77392 20.9624 6.32667L21.8633 8.32879"
        stroke="#9D1F15"
        stroke-width="1.24932"
        stroke-linecap="round"
      />
      <path
        d="M12.4934 8.32879V3.12329"
        stroke="#9D1F15"
        stroke-width="1.24932"
        stroke-linecap="round"
      />
      <path
        d="M8.84941 14.0551H14.5755C15.7254 14.0551 16.6576 14.9873 16.6576 16.1373C16.6576 17.2873 15.7254 18.2195 14.5755 18.2195H13.5344M10.4111 11.9729L8.32886 14.0551L10.4111 16.1373"
        stroke="#9D1F15"
        stroke-width="1.24932"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const HeroFooter = () => {
  return (
    <>
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 lg:grid-cols-4 px-15 lg:px-25 pb-20 justify-center lg:justify-between items-start">
        <HeroFooterCards
          title="Fast Delivery"
          description="3-7 days nationwide."
          icon={<FaTruck />}
        />
        <HeroFooterCards
          title="Secure Payments"
          description="Encrypted payment options."
          icon={<FaLock />}
        />
        <HeroFooterCards
          title="7-days Guarantee"
          description="Easy returns/exchanges."
          icon={<ReturnParselSvg />}
        />
        <HeroFooterCards
          title="24/7 Support"
          description="Anytime assistance."
          icon={<FaPhone />}
        />
      </div>
    </>
  );
};

export default HeroFooter;
