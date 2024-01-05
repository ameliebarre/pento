import Image from "next/image";

import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="flex h-[calc(100vh-75px)] w-full">
      <RegisterForm />
      <div className="flex-1 relative">
        <Image
          src="/bg-register.png"
          alt="Furniture background image"
          objectFit="cover"
          objectPosition="center"
          fill
        />
      </div>
    </div>
  );
}
