import { useEffect, useState } from "react";
import { PreviousPage } from "../svg_components/FormSvg";
import { useRouter } from "next/navigation";
import Button from "./../reusable_components/Buttons";
import { authApi } from "../../axiosApiBoilerplates/authApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const DigitCodeVerification = ({
  otpType = "email",
  numberOfDigits = 4,
  pageTitle,
  pageDescription,
  otpLifespan,
}) => {
  const [focusedInput, setFocusedInput] = useState(1);
  const [timeLeft, setTimeLeft] = useState(otpLifespan);
  const { idToken } = useSelector((state) => state.userAuth);
  const { register, handleSubmit } = useForm();

  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((state) => state - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const submitOtp = async (data) => {
    try {
      let otp = "";
      for (const value in data) otp += value;
      await authApi(idToken).post("/auth/otp/verify", {
        type: otpType,
        otpValue: otp,
      });
      toast.success("OTP verified successfully");
    } catch (err) {
      console.log(err);
      toast.error("Invalid OTP");
    }
  };

  const requestOtp = async (type, value) => {
    try {
      await authApi(idToken).post("/auth/otp", { type: type, value: value });
      toast.success("OTP Sent");
    } catch (err) {
      console.log(err);
      toast.error("Couldn't send OTP, try again later");
    }
  };

  return (
    <>
      <header className="flex flex-col items-start">
        <div onClick={() => router.back()}>
          <PreviousPage />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl text-[--text-primary] font-medium">
            {pageTitle}
          </h1>
          {pageDescription?.length > 0 && (
            <h2 className="text-lg text-[--main-secondary] font-normal">
              {pageDescription}
            </h2>
          )}
        </div>
      </header>
      <form
        onSubmit={() => handleSubmit(submitOtp)}
        className="h-full w-full max-w-lg flex flex-col justify-center gap-2.5 mx-auto"
      >
        <div>
          {Array(numberOfDigits)
            .fill("holder")
            .map((_, index) => {
              return (
                <input
                  {...register(`digit${index + 1}`)}
                  autoFocus={index + 1 === focusedInput}
                  maxLength={1}
                  onChange={({ target: { value } }) =>
                    value.length === 1
                      ? setFocusedInput((state) => state + 1)
                      : null
                  }
                  type="number"
                />
              );
            })}
        </div>
        {timeLeft > 0 ? (
          <p>
            Resend code at{" "}
            {`${Math.floor(timeLeft / 60).toString()}:${(timeLeft % 60)
              .toString()
              .padStart(2, 0)}`}
          </p>
        ) : (
          <Button buttonFn={() => requestOtp()} size="small">
            Resend OTP
          </Button>
        )}

        <Button className="mt-4" buttonType="submit" width="full">
          Submit
        </Button>
      </form>
    </>
  );
};

export default DigitCodeVerification;
