import React from "react"
import { DrawerMenu } from "../../drawerMenu"

export const AuthenticatedLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <div>
            <DrawerMenu />
            {children}
        </div>
    )
}