import type { IconName } from "@/content/types";

type UtilityIcon = "arrow-right" | "arrow-up-right" | "check" | "menu" | "close" | "search" | "mail" | "minus";

const paths: Record<IconName | UtilityIcon, React.ReactNode> = {
  message: <path d="M4 5h16v11H9l-5 4V5Z M8 9h8 M8 12h5" />,
  funnel: <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />,
  calendar: <path d="M4 6h16v14H4V6Z M4 10h16 M8 3v5 M16 3v5 M8 14h3" />,
  inbox: <path d="M3 13l3-8h12l3 8v6H3v-6Z M3 13h5l1 2h6l1-2h5" />,
  document: <path d="M6 3h8l4 4v14H6V3Z M14 3v4h4 M9 12h6 M9 16h6" />,
  chart: <path d="M4 20V4 M4 20h16 M8 16v-4 M12 16V8 M16 16v-7" />,
  book: <path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2V5Z M4 20a2 2 0 0 0 2 1h13 M9 7h6" />,
  assistant: <path d="M5 8h14v10H5V8Z M12 4v4 M9 13h.01 M15 13h.01 M9 21h6 M2 12v3 M22 12v3" />,
  plug: <path d="M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-12 0V8Z M12 17v4" />,
  building: <path d="M5 21V4h10v17 M15 9h4v12 M3 21h18 M8 8h1 M11 8h1 M8 12h1 M11 12h1 M8 16h1 M11 16h1" />,
  wrench: <path d="M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9a4 4 0 0 0-2-2Z M14 6l2-2" />,
  pipe: <path d="M3 8h8a3 3 0 0 1 3 3v10 M3 12h6a1 1 0 0 1 1 1v8 M3 6v8 M10 21h6" />,
  sparkle: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z M19 3v4 M17 5h4" />,
  hammer: <path d="M14 4l6 6-3 3-6-6 3-3Z M11 7l-8 8 3 3 8-8" />,
  truck: <path d="M2 6h12v10H2V6Z M14 10h4l3 3v3h-7v-6Z M6 19a2 2 0 1 0 0-.01 M17 19a2 2 0 1 0 0-.01" />,
  scissors: <path d="M6 7a2.5 2.5 0 1 0 0-.01 M6 17a2.5 2.5 0 1 0 0-.01 M8 8l12 10 M8 16L20 6" />,
  briefcase: <path d="M3 7h18v13H3V7Z M8 7V4h8v3 M3 12h18" />,
  heart: <path d="M12 20s-8-4.5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6.5-8 11-8 11Z" />,
  phone: <path d="M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  "arrow-right": <path d="M4 12h16 M14 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17L17 7 M8 7h9v9" />,
  check: <path d="M5 12l5 5 9-10" />,
  menu: <path d="M3 7h18 M3 12h18 M3 17h18" />,
  close: <path d="M5 5l14 14 M19 5L5 19" />,
  search: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M16 16l5 5" />,
  mail: <path d="M3 5h18v14H3V5Z M3 6l9 7 9-7" />,
  minus: <path d="M5 12h14" />,
};

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.5,
}: {
  name: IconName | UtilityIcon;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
