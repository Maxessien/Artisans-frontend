import { notFound } from "next/navigation";
import DigitCodeVerification from "../../src/components/form_components/DigitCodeVerification";
import { requestOtp } from "../../src/utils/auth.client";

const VerifyPage = async ({ searchParams }) => {
  const sParams = await searchParams;
  const { type, value } = sParams;
  if (
    type !== "email" ||
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  )
    return notFound();

  await requestOtp(type, value);
  return (
    <main className="px-5 h-full">
      <DigitCodeVerification
        otpValue={value}
        otpType={type}
        pageTitle={"Verification Code"}
        pageDescription={`We have sent a verification code to ${value}`}
        otpLifespan={75}
      />
    </main>
  );
};

export default VerifyPage;
