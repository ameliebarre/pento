import { notFound } from "next/navigation";

const CATEGORY_LABELS: Record<string, string> = {
  sofas: "Sofas",
  armchairs: "Armchairs",
  chairs: "Chairs",
  tables: "Tables",
  lighting: "Lighting",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];

  if (!label) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">{label}</h1>
    </div>
  );
}
