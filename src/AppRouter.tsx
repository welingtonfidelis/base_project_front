import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutRenderer } from './components/layouts';
import { routes } from './routes';

export const AppRouter = () => {
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