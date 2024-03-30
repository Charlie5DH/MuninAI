import { getAuthUserDetails } from "@/lib/queries";
import React from "react";
import MenuOptions from "./MenuOptions";

const Sidebar = async ({ id, type }: { id: string; type: "agency" | "subaccount" }) => {
  const user = await getAuthUserDetails(); // get the current user details
  if (!user) return null;
  if (!user.Agency) return;

  const details = type === "agency" ? user.Agency : user.Agency.SubAccount.find((sub) => sub.id === id); // get the agency or subaccount details
  const isWhiteLabelAgency = user.Agency.whiteLabel;
  if (!details) return;

  let sideBarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg";

  if (!isWhiteLabelAgency) {
    // if the agency is not white label, then we need to check if the user is a subaccount
    if (type === "subaccount") {
      sideBarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOpt =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)?.SidebarOption || [];

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find((permission) => permission.subAccountId === subaccount.id && permission.access)
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
