"use client";

import Link from "next/link";
import { registerSchema } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) });

  async function onSubmit(data: IFormInput) {
    console.log(data);

    // TODO: fetch API to handle authentication
    // ...

    router.push("/");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="font-bold text-2xl">Register and create your &nbsp;</h1>
        <h2 className="font-medium text-2xl">Pento account</h2>
      </div>
      <form
        action=""
        method="POST"
        className="w-3/6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mb-4">
          {/* Name field */}
          <label htmlFor="name">Username</label>
          <input
            {...register("name", { required: true })}
            id="name"
            name="name"
            type="text"
            className="h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900 focus:ring-1 focus:ring-primary focus:ring-offset-4 focus:ring-offset-white focus:outline-none"
            autoComplete="off"
          />
          {errors.name && (
            <p className="text-red-500 mt-2">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          {/* Email Input */}
          <label htmlFor="name">Email</label>
          <input
            {...register("email", { required: true })}
            id="email"
            name="email"
            type="text"
            className="h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900 focus:ring-1 focus:ring-primary focus:ring-offset-4 focus:ring-offset-white focus:outline-none"
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
            className="h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900 focus:ring-1 focus:ring-primary focus:ring-offset-4 focus:ring-offset-white focus:outline-none"
            autoComplete="off"
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password.message}</p>
          )}
        </div>
        <input
          type="submit"
          value="Sign up"
          className="rounded-full bg-primary w-[250px] m-auto block h-11 text-white cursor-pointer ease-out duration-300 border-2 border-primary hover:bg-white hover:text-primary hover:font-semibold"
        />
        <p className="mt-6 text-center">
          Already have an account ?{" "}
          <Link href="/account/login" className="font-semibold underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
