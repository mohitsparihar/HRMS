import { useRoutes } from "react-router-dom";
import { routes } from "./config/routes";
import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { Loader } from "lucide-react";

function App() {
  const element = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <Loader className="animate-spin"/>
          </div>
        }
      >
        {element}
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
