import Image from "next/image";

import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="flex h-[calc(100vh-75px)] w-full">
      <LoginForm />
      <div className="flex-1 relative">
        <Image
          src="/bg-login.png"
          alt="Furniture background image"
          objectFit="cover"
          objectPosition="center"
          fill
        />
      </div>
    </div>
  );
}
