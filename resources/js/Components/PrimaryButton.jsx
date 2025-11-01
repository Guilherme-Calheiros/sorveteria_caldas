import { Button } from "@/components/ui/button"
import clsx from "clsx"

export default function PrimaryButton({ children, disabled, className, ...props }) {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={clsx(
        className,
        "transition-colors",
        disabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed opacity-70"
          : "bg-primary hover:bg-primary/90 text-white"
      )}
    >
      {children}
    </Button>
  )
}