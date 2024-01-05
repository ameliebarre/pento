"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;

    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error(result?.error);
        setIsLoading(false);
      } else {
        toast.success("Welcome back !");
        setIsLoading(false);
        router.push("/");
      }
    } catch (e: unknown) {
      setIsLoading(false);
      toast.error("Oops !! Something went wrong. Please retry.");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="font-bold text-2xl">Login to your &nbsp;</h1>
        <h2 className="font-medium text-2xl">Pento account</h2>
      </div>
      <form
        action=""
        method="POST"
        className="w-3/6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mb-4">
          {/* Email Input */}
          <label htmlFor="name">Email</label>
          <input
            {...register("email", { required: true })}
            id="email"
            name="email"
            type="text"
            className={[
              "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
              "focus:ring-1 focus:ring-primary focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
            ].join(" ")}
            autoComplete="off"
          />
          {errors.email && (
            <p className="text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-8">
          {/* Password Input */}
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            id="password"
            name="password"
            type="password"
            className={[
              "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
              "focus:ring-1 focus:ring-primary focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
            ].join(" ")}
            autoComplete="off"
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={[
            "rounded-full bg-primary w-[250px] m-auto block h-11 text-white cursor-pointer ease-out duration-300 border-2 border-primary",
            "hover:bg-white hover:text-primary hover:font-semibold",
            "disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default",
          ].join(" ")}
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader size="20" color="#FFFFFF" className="mt-2" />
          ) : (
            "Login"
          )}
        </button>
        <Link
          href="/account/register"
          className="mt-6 text-center block font-semibold underline"
        >
          Create an account
        </Link>
      </form>
    </div>
  );
}
