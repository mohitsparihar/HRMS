import { useRoutes } from "react-router-dom";
import { routes } from "./config/routes";
import { Suspense } from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

function App() {
  const element = useRoutes(routes);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        {element}
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;