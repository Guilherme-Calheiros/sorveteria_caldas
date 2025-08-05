import { Button } from "@/components/ui/button";

export default function PrimaryButton({ children, ...props }) {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
}