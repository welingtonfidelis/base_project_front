import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutRenderer } from "./components/layouts";
import { routes } from "./routes";
import { checkPermissionsService } from "./services/util/checkPermissions";

export const AppRouter = () => {
  const { checkPermissions } = checkPermissionsService();

  return (
    <BrowserRouter>
      <LayoutRenderer>
        <Routes>
          {routes
            .filter((item) => checkPermissions(item.permissions))
            .map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
        </Routes>
      </LayoutRenderer>
    </BrowserRouter>
  );
};
