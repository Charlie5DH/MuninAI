import {
  Agency,
  AgencySidebarOption,
  Contact,
  Lane,
  Notification,
  Plan,
  Prisma,
  Role,
  SubAccount,
  SubAccountSidebarOption,
  Tag,
  Ticket,
  User,
} from "@prisma/client";
import { db } from "@/lib/db";
import {
  _getTicketsWithAllRelations,
  getAuthUserDetails,
  getFunnels,
  getMedia,
  getPipelineDetails,
  getTicketsWithTags,
  getUserPermissions,
} from "@/lib/queries";
import Stripe from "stripe";
import { z } from "zod";

export type PriceCard = {
  title: string;
  description: string;
  price: string;
  duration: string;
  highlight: string;
  features: string[];
  priceId: string;
};

export type FileUploadProps = {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo"; // type of file to upload
  onChange: (url?: string) => void; // function to set the uploaded file url
  value?: string; // url of the uploaded file
};

export type EditorBtns =
  | "text"
  | "container"
  | "section"
  | "contactForm"
  | "paymentForm"
  | "link"
  | "2Col"
  | "video"
  | "__body"
  | "image"
  | null
  | "3Col";

export type SideBarProps = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
  sidebarOpened?: boolean;
  setSidebarOpened?: (opened: boolean) => void;
};

export type PricesList = Stripe.ApiList<Stripe.Price>;

export type TicketDetails = Prisma.PromiseReturnType<typeof _getTicketsWithAllRelations>;

export type ModalData = {
  user?: User;
  agency?: Agency;
  ticket?: TicketDetails[0];
  contact?: Contact;
  plans?: {
    defaultPriceId: Plan;
    plans: PricesList["data"];
  };
};

export type NotificationWithUser =
  | ({
      User: {
        id: string;
        name: string;
        avatarUrl: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        agencyId: string | null;
      };
    } & Notification)[]
  | undefined;

export type InfoBarProps = {
  notifications: NotificationWithUser | [];
  role?: Role;
  className?: string;
  subAccountId?: string;
};

export type UserDetailsProps = {
  id: string | null;
  type: "agency" | "subaccount";
  userData?: Partial<User>;
  subAccounts?: SubAccount[];
};

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

export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<typeof getUserPermissions>;

export type AuthUserWithAgencySigebarOptionsSubAccounts = Prisma.PromiseReturnType<typeof getAuthUserDetails>;
export type FunnelsForSubAccount = Prisma.PromiseReturnType<typeof getFunnels>[0];
export const CreateFunnelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
});
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

export type TicketWithTags = Prisma.PromiseReturnType<typeof getTicketsWithTags>;
export type UpsertFunnelPage = Prisma.FunnelPageCreateWithoutFunnelInput;

export const FunnelPageSchema = z.object({
  name: z.string().min(1),
  pathName: z.string().optional(),
});

export type StripeCustomerType = {
  email: string;
  name: string;
  shipping: ShippingInfo;
  address: Address;
};
