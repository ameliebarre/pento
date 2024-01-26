import LogoutButton from "@/components/LogoutButton";

export default function Profile() {
  return (
    <div className="flex flex-row gap-y-24 px-[92px] pt-10">
      <div className="sticky top-0 basis-72">
        <h1 className="text-[32px] font-bold">My account</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
