import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FilterAccordionSectionProps = {
  value: string;
  title: string;
  children: React.ReactNode;
};

export function FilterAccordionSection({ value, title, children }: FilterAccordionSectionProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
