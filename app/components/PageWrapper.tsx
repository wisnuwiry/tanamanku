import { ReactNode } from "react";

export default function PageWrapper({children}: {children: ReactNode}) {
    return <div className="max-w-3xl m-auto">
        {children}
    </div>
}