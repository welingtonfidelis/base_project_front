import { BrowserRouter, Routes as RoutesRouter, Route } from "react-router-dom";

import { Login } from "./pages/login";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesRouter>
        <Route path="/" element={<Login />} />
      </RoutesRouter>
    </BrowserRouter>
  );
};
