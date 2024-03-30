import AgencyDetails from "@/components/forms/agency-details";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const AgencyPage = async ({ searchParams }: { searchParams: { plan: Plan; state: string; code: string } }) => {
  const agencyId = await verifyAndAcceptInvitation();
  console.log(searchParams);
  const user = await getAuthUserDetails();

  if (agencyId) {
    // if there is an user and the user has an agency then we check the user role
    // if it is a subaccount user or guest we redirect them to the subaccount page
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      // if the logged user is an owner or admin of the agency we check if the user has a plan
      if (searchParams.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`);
      }
      if (searchParams.state) {
        // when we are using connect, to connect any user Stripe account to the agency
        // we have a state param that has the path and the agency id
        const statePath = searchParams.state.split("___")[0];
        const stateAgencyId = searchParams.state.split("___")[1];

        if (!stateAgencyId) return <div>Not authorized</div>;

        return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`);
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Not authorized</div>;
    }
  }

  // if the user does not have an agency, then we get the current user and show the agency creation form
  const authUser = await currentUser();

  return (
    <div className="flex justify-center items-center">
      <div className="w-full dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="max-w-[850px] border-[1px] p-4 rounded-xl bg-background/90 mt-4 mb-4">
          <h1 className="text-4xl mb-5"> Create An Agency</h1>
          <AgencyDetails data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }} />
        </div>
      </div>
    </div>
  );
};

export default AgencyPage;
