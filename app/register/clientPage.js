"use client";

import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AuthFormLayout from "./../../src/components/form_components/AuthFormLayout";
import { regApi } from "./../../src/axiosApiBoilerplates/regApi";
import AuthFormField from "./../../src/components/form_components/AuthFormField";

const ClientRegister = () => {
  const router = useRouter();

  const registerUser = async ({ email, password, name, phone }) => {
    const newUser = {
      email: email,
      phoneNumber: phone,
      displayName: name,
      password: password,
    };
    console.log(newUser);
    try {
      const res = await regApi.post("/auth/register", newUser);
      toast.success(res.data.message);
      router.push(`/verify?type=email&value=${email}`)
      return res.data;
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data) => registerUser(data),
    mutationKey: ["registerUser"],
  });
  return (
    <>
      <main>
        <AuthFormLayout type={"register"}>
          <AuthFormField
            submitFunction={mutateAsync}
            email
            phone
            password
            name
            confirmPassword
            buttonText={isPending ? "Signing Up..." : "Sign Up"}
            isSubmitting={isPending}
          />
        </AuthFormLayout>
      </main>
    </>
  );
};

export default ClientRegister;
