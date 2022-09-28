import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DrawerMenu } from './components/drawerMenu';
import { useRoutes } from "./useRoutes"

export const AppRouter = () => {
    const { routes } = useRoutes();

    return (
        <>
            <DrawerMenu />
            <BrowserRouter>
                <Routes>
                    {routes.map(({ path, element: Component }) => {
                        return <Route key={path} path={path} element={<Component />} />
                    })}
                </Routes>
            </BrowserRouter>
        </>
    )
}