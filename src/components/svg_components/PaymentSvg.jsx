const PaymentCompleteIcon = (props) => {
  return (
    <svg
      {...props}
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="71.3541" cy="140.967" r="0.248619" fill="#D9D9D9" />
      <circle cx="90" cy="90" r="90" fill="#EDFBEA" />
      <circle cx="89.9995" cy="89.9995" r="67.6802" fill="#41D52B" />
      <mask
        id="mask0_2225_862"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="46"
        y="44"
        width="88"
        height="92"
      >
        <path
          d="M90.0052 48.6006L100.879 56.5328L114.34 56.508L118.474 69.3171L129.379 77.2079L125.195 90.0004L129.379 102.793L118.474 110.684L114.34 123.493L100.879 123.468L90.0052 131.4L79.1315 123.468L65.6703 123.493L61.5366 110.684L50.6318 102.793L54.8153 90.0004L50.6318 77.2079L61.5366 69.3171L65.6703 56.508L79.1315 56.5328L90.0052 48.6006Z"
          fill="white"
          stroke="white"
          strokeWidth="8.27997"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M75.5127 90.0004L85.8627 100.35L106.563 79.6504"
          stroke="black"
          strokeWidth="8.27997"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_2225_862)">
        <path
          d="M40.3203 40.3193H139.68V139.679H40.3203V40.3193Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export { PaymentCompleteIcon };
