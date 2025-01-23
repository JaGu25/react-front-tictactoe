import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { ErrorProvider } from "@/shared/providers/ErrorProvider";
import { router } from "@/routes";
import { Toaster } from "@/shared/components/shadcn/toaster";

function App() {
  return (
    <ThemeProvider storageKey="ui-theme" defaultTheme="system">
      <ErrorProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default App;
