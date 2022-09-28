import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutRenderer } from './components/layouts';

import { useRoutes } from "./useRoutes"

export const AppRouter = () => {
    const { routes } = useRoutes();

    return (
        <BrowserRouter>
            <LayoutRenderer>
                <Routes>
                    {routes.map(({ path, element: Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Routes>
            </LayoutRenderer>
        </BrowserRouter>
    )
}