"use client";

import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { regApi } from "../../axiosApiBoilerplates/regApi";
import { requestOtp } from "../../utils/auth.client";
import logger from "../../utils/logger";
import Button from "./../reusable_components/Buttons";

const DigitCodeVerification = ({
  otpType = "email",
  otpValue,
  numberOfDigits = 6,
  pageTitle,
  pageDescription,
  otpLifespan,
}) => {
  const [timeLeft, setTimeLeft] = useState(otpLifespan);
  const [inputs, setInputs] = useState(Array(numberOfDigits).fill(""));
  const [isLoading, setIsLoading] = useState(false)

  // const router = useRouter();

  const inputsRef = useRef([]);
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (timeLeft >= 0) setTimeLeft((state) => state - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    if (timeLeft < 0) clearInterval(timerRef.current)
  }, [timeLeft])

  const submitOtp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const otp = inputs.join("");
      if (otp?.trim().length < numberOfDigits)
        throw new Error("incomplete OTP");
      await regApi.post("/auth/otp/verify", {
        type: otpType,
        otpValue: otp,
      });
      toast.success("OTP verified successfully");
    } catch (err) {
      logger.error("OTP verification failed", err);
      toast.error("Invalid OTP");
    } finally {
      setIsLoading(false)
    }
  };

  const inputOnchangeFn = ({ target: { value } }, index) => {
    if (value.length > 1) return;
    const stateCopy = [...inputs];
    stateCopy[index] = value;
    logger.info("Updated OTP input", { stateCopy, otp: stateCopy.join("") });
    setInputs(stateCopy);
    if (value.length === 1 && index + 1 < numberOfDigits)
      inputsRef.current[index + 1].focus();
  };

  return (
    <>
      <header className="flex flex-col items-start mb-5">
        {/* <div onClick={() => router.back()}>
          <PreviousPage />
        </div> */}
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <h1 className="text-2xl text-[--text-primary] font-medium">
            {pageTitle}
          </h1>
          {pageDescription?.length > 0 && (
            <h2 className="text-base max-w-100 text-center text-[var(--main-secondary)] font-normal">
              {pageDescription}
            </h2>
          )}
        </div>
      </header>
      <form
        onSubmit={(e) => submitOtp(e)}
        className="h-full w-max flex flex-col justify-center gap-2.5 mx-auto"
      >
        <div className="flex gap-1.5 justify-center items-center">
          {Array(numberOfDigits)
            .fill("holder")
            .map((_, index) => {
              return (
                <input
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="h-15 w-15 text-center text-2xl font-semibold text-[var(--text-primary)] rounded-md border-2 border-[var(--text-primary-light)]"
                  autoFocus={index === 0}
                  value={inputs[index]}
                  onChange={(e) => inputOnchangeFn(e, index)}
                  onKeyDown={({ key, target: { value } }) => {
                    logger.info("OTP input length", value.length);
                    if (key === "Backspace" && value.length === 0) {
                      inputOnchangeFn({ target: { value } }, index)
                      inputsRef.current[index - 1].focus();
                    }
                  }}
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
          <Button
            width="max-content"
            buttonFn={async () => {
              try {
                setIsLoading(true)
                await requestOtp(otpType, otpValue)
                toast.success("OTP sent")
              } catch (err) {
                logger.error("Failed to resend OTP", err)
                toast.error("OTP not sent, Try again later")
              } finally{
                setIsLoading(false)
              }
            }}
            size="small"
            isDisabled={isLoading}
          >
            Resend OTP
          </Button>
        )}

        <Button isDisabled={isLoading} extraStyles={{ marginTop: "1rem" }} buttonType="submit" width="100%">
          Submit
        </Button>
      </form>
    </>
  );
};

export default DigitCodeVerification;
