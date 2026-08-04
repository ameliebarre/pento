import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/generated/prisma/client";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2 text-sm">{product.description}</p>
        </CardContent>
        <CardFooter>
          <span className="font-medium">{formatPrice(product.price.toString(), product.currency)}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
