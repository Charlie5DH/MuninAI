import { z } from "zod";
import BarChart from "@/components/icons/BarChart";
import Headphone from "@/components/icons/Headphone";
import Pipelines from "@/components/icons/Pipelines";
import Calendar from "@/components/icons/Calendar";
import Settings from "@/components/icons/Settings";
import CheckCircle from "@/components/icons/CheckCircle";
import Chip from "@/components/icons/Chip";
import Compass from "@/components/icons/Compass";
import Database from "@/components/icons/Database";
import Flag from "@/components/icons/Flag";
import Home from "@/components/icons/Home";
import Info from "@/components/icons/BarChart";
import LinkIcon from "@/components/icons/LinkIcon";
import Message from "@/components/icons/Message";
import Payment from "@/components/icons/Payment";
import Notification from "@/components/icons/Notification";
import Power from "@/components/icons/Power";
import Receipt from "@/components/icons/Receipt";
import Shield from "@/components/icons/Shiled";
import Tune from "@/components/icons/Tune";
import Star from "@/components/icons/Star";
import Video from "@/components/icons/VideoRecorder";
import Wallet from "@/components/icons/Wallet";
import Warning from "@/components/icons/Warning";
import Person from "@/components/icons/Person";
import SiteCategory from "@/components/icons/SiteCategory";
import ClipboardIcon from "@/components/icons/ClipboardIcon";
import Lock from "@/components/icons/Lock";
import Send from "@/components/icons/Send";

export const typeWriterHeader = [
  {
    text: "Manage",
  },
  {
    text: "all",
  },
  {
    text: "your",
  },
  {
    text: "plants,",
  },
  {
    text: "in one place.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export const NewAgencyFormSchema = z.object({
  name: z.string().min(2, { message: "Agency name must be atleast 2 chars." }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  agencyLogo: z.string().min(1),
});

export const icons = [
  {
    value: "chart",
    label: "Bar Chart",
    path: BarChart,
  },
  {
    value: "headphone",
    label: "Headphones",
    path: Headphone,
  },
  {
    value: "send",
    label: "Send",
    path: Send,
  },
  {
    value: "pipelines",
    label: "Pipelines",
    path: Pipelines,
  },
  {
    value: "calendar",
    label: "Calendar",
    path: Calendar,
  },
  {
    value: "settings",
    label: "Settings",
    path: Settings,
  },
  {
    value: "check",
    label: "Check Circled",
    path: CheckCircle,
  },
  {
    value: "chip",
    label: "Chip",
    path: Chip,
  },
  {
    value: "compass",
    label: "Compass",
    path: Compass,
  },
  {
    value: "database",
    label: "Database",
    path: Database,
  },
  {
    value: "flag",
    label: "Flag",
    path: Flag,
  },
  {
    value: "home",
    label: "Home",
    path: Home,
  },
  {
    value: "info",
    label: "Info",
    path: Info,
  },
  {
    value: "link",
    label: "Link",
    path: LinkIcon,
  },
  {
    value: "lock",
    label: "Lock",
    path: Lock,
  },
  {
    value: "messages",
    label: "Messages",
    path: Message,
  },
  {
    value: "notification",
    label: "Notification",
    path: Notification,
  },
  {
    value: "payment",
    label: "Payment",
    path: Payment,
  },
  {
    value: "power",
    label: "Power",
    path: Power,
  },
  {
    value: "receipt",
    label: "Receipt",
    path: Receipt,
  },
  {
    value: "shield",
    label: "Shield",
    path: Shield,
  },
  {
    value: "star",
    label: "Star",
    path: Star,
  },
  {
    value: "tune",
    label: "Tune",
    path: Tune,
  },
  {
    value: "videorecorder",
    label: "Video Recorder",
    path: Video,
  },
  {
    value: "wallet",
    label: "Wallet",
    path: Wallet,
  },
  {
    value: "warning",
    label: "Warning",
    path: Warning,
  },
  {
    value: "person",
    label: "Person",
    path: Person,
  },
  {
    value: "category",
    label: "Category",
    path: SiteCategory,
  },
  {
    value: "clipboardIcon",
    label: "Clipboard Icon",
    path: ClipboardIcon,
  },
];
