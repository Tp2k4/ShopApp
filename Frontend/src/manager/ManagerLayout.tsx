import { Header, Navigation } from "../shared/components/ui";

import { ReactNode } from "react";

interface ManagerLayoutProps {
  children?: ReactNode;
}

function ManagerLayout({ children }: ManagerLayoutProps) {
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <div className="overflow-y-auto w-screen h-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header name={userData?.role || "Guest"} />

      <div className="flex w-[75%] h-full gap-[var(--medium-gap)]">
        <Navigation />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}

export default ManagerLayout;
