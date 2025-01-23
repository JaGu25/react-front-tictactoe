import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/shadcn/alert-dialog";
import { createContext, useContext, useState } from "react";

export interface ErrorPresentation {
  title: string;
  message: string;
}

interface ErrorContextProps {
  setError: (error: ErrorPresentation) => void;
  resetError: () => void;
}

const ErrorContext = createContext<ErrorContextProps | null>(null);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<ErrorPresentation | null>(null);

  const resetError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ setError, resetError }}>
      {children}
      {error && (
        <AlertDialog open={!!error} onOpenChange={resetError}>
          <AlertDialogContent className="border-red-200">
            <AlertDialogHeader>
              <AlertDialogTitle>{error?.title || "Error"}</AlertDialogTitle>
              <AlertDialogDescription>
                {error?.message || "An unexpected error occurred."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={resetError}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError debe ser usado dentro de un ErrorProvider");
  }
  return context;
};
