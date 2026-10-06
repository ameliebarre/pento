import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  title: string;
  children: React.ReactNode;
  /** Tighter title spacing, for cards whose header is followed by helper text. */
  compact?: boolean;
};

export function AuthCard({ title, children, compact }: AuthCardProps) {
  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-sm ring-0">
        <CardHeader>
          <CardTitle as="h1" className={cn("text-center text-4xl", compact ? "pb-4" : "pb-8")}>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">{children}</CardContent>
      </Card>
    </div>
  );
}
