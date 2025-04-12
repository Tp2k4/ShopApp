import { ReactNode } from "react";

import Header from "../../shared/components/Header";
import Navigation from "../../shared/components/Navigation";

type ManagerLayoutProps = {
  children?: ReactNode;
};

function ManagerLayout({ children }: ManagerLayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header />

      <div className="flex w-[75%] h-full gap-[var(--medium-gap)]">
        <Navigation />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}

export default ManagerLayout;
