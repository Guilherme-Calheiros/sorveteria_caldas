import { Button } from "@/components/ui/button";

export default function DangerButton({ children, ...props }) {
  return (
    <Button variant="destructive" {...props}>
      {children}
    </Button>
  );
}