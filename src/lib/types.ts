import { Contact, Lane, Prisma, Tag, Ticket, User } from "@prisma/client";
import { getAuthUserDetails, getMedia, getPipelineDetails, getUserPermissions } from "./queries";
import { db } from "./db";
import { z } from "zod";

const __getUsersWithAgencySubAccountPermissionsSidebarOptions = async (agencyId: string) => {
  return await db.user.findFirst({
    where: { Agency: { id: agencyId } },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });
};

export type UsersWithAgencySubAccountPermissionsSidebarOptions = Prisma.PromiseReturnType<
  typeof __getUsersWithAgencySubAccountPermissionsSidebarOptions
>;

export type AuthUserWithAgencySigebarOptionsSubAccounts = Prisma.PromiseReturnType<typeof getAuthUserDetails>;
export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<typeof getUserPermissions>;
export type GetMediaFiles = Prisma.PromiseReturnType<typeof getMedia>;
export type CreateMediaType = Prisma.MediaCreateWithoutSubaccountInput;
export const CreatePipelineFormSchema = z.object({
  name: z.string().min(1),
});
export type TicketAndTags = Ticket & {
  Tags: Tag[];
  Assigned: User | null;
  Customer: Contact | null;
};
export type LaneDetail = Lane & {
  Tickets: TicketAndTags[];
};

export const CreateFunnelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
});

export type PipelineDetailsWithLanesCardsTagsTickets = Prisma.PromiseReturnType<typeof getPipelineDetails>;

export const LaneFormSchema = z.object({
  name: z.string().min(1),
});

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/;

export const TicketFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  value: z.string().refine((value) => currencyNumberRegex.test(value), {
    message: "Value must be a valid price.",
  }),
});

export const ContactUserFormSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
});

export type Address = {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
};

export type ShippingInfo = {
  address: Address;
  name: string;
};
