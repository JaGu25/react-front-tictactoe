import { cn } from "@/shared/lib/utils"; // Si usas la utilidad `cn` para concatenar clases opcionalmente.
import { Button } from "@/shared/components/shadcn/button";
import { Loader2 } from "lucide-react"; // Ícono de carga (puedes usar cualquier otro).

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function LoadingButton({
  isLoading,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn(
        "relative",
        isLoading && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <div className="text-center">
          <Loader2 strokeWidth={3} className="animate-spin" />
        </div>
      )}
      <span className={cn(isLoading && "hidden")}>{children}</span>
    </Button>
  );
}
