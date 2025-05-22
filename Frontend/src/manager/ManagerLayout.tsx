import { Header, Navigation } from "../shared/components/ui";

import { ReactNode, useState } from "react";

interface ManagerLayoutProps {
  children?: ReactNode;
}

function ManagerLayout({ children }: ManagerLayoutProps) {
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [navIsOpen, setNavIsOpen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden min-h-0">
      <Header
        setNavIsOpen={setNavIsOpen}
        navIsOpen={navIsOpen}
        className="border-b border-[var(--line-color)] "
        name={userData?.name}
      />
      <div className="flex w-full h-[calc(100vh_-_var(--header-height))]">
        <Navigation
          className={`fixed left-0 top-[calc(var(--header-height))] z-40 rounded-none border-r border-[var(--line-color)] lg:flex lg:static lg:translate-x-0 ${
            navIsOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        />

        <main className="w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default ManagerLayout;
