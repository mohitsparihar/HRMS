import { useRoutes } from "react-router-dom";
import { routes } from "./config/routes";
import { Suspense } from "react";

function App() {
  const element = useRoutes(routes);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

export default App;
