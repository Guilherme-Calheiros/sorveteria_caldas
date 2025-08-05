import { Button } from "@/components/ui/button";

export default function SecondaryButton({ children, ...props }) {
  return (
    <Button variant="outline" {...props}>
      {children}
    </Button>
  );
}