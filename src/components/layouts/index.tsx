import React, { useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";

import { routes } from "../../routes";
import { GuestLayout } from "./guestLayout";

export const LayoutRenderer = ({ children }: React.PropsWithChildren) => {
    const location = useLocation();

    const PageLayout = useMemo(() => {
        const matched = routes.find((item) => matchPath(item.path, location.pathname));

        return matched?.layout || GuestLayout;
    }, [location.pathname]);
    
    return <PageLayout>{children}</PageLayout>
}