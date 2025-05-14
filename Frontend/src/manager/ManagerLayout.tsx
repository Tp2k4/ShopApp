import { Header, Navigation } from "../shared/components/ui";

import { ReactNode } from "react";

interface ManagerLayoutProps {
  account?: any;
  children?: ReactNode;
}

function ManagerLayout({ account, children }: ManagerLayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header />
      {/* name={account.fullName} */}
      <div className="flex w-[75%] h-full gap-[var(--medium-gap)]">
        <Navigation />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}

export default ManagerLayout;
