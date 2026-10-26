import type { ReactNode, SVGProps } from "react";

// 24px grid, 2px stroke, rounded caps. `filled` swaps to the solid variant where one exists.
export type IconProps = SVGProps<SVGSVGElement> & {
  filled?: boolean;
  size?: number;
  title?: string;
};

function Svg({ filled, size = 24, title, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" fill="none" />
    </Svg>
  );
}

export function SearchIcon({ filled, ...props }: IconProps) {
  return (
    <Svg {...props} strokeWidth={filled ? 3 : 2}>
      <circle cx="11" cy="11" r="7" fill="none" />
      <path d="m20 20-3.5-3.5" />
    </Svg>
  );
}

export function PlayCircleIcon({ filled, ...props }: IconProps) {
  return (
    <Svg {...props} filled={filled}>
      <circle cx="12" cy="12" r="10" />
      <path
        d="m10 8 6 4-6 4z"
        fill={filled ? "white" : "currentColor"}
        stroke={filled ? "white" : "currentColor"}
      />
    </Svg>
  );
}

export function FileIcon({ filled, ...props }: IconProps) {
  return (
    <Svg {...props} filled={filled}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" fill="none" stroke={filled ? "white" : "currentColor"} />
      <path d="M8 13h8M8 17h6" stroke={filled ? "white" : "currentColor"} />
    </Svg>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </Svg>
  );
}

export function ChartIcon({ filled, ...props }: IconProps) {
  return (
    <Svg {...props} strokeWidth={filled ? 3.5 : 2}>
      <path d="M5 20v-4M10 20v-8M15 20V8M20 20V4" />
    </Svg>
  );
}

export function ClockIcon({ filled, ...props }: IconProps) {
  return (
    <Svg {...props} filled={filled}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" fill="none" stroke={filled ? "white" : "currentColor"} />
    </Svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0z" />
    </Svg>
  );
}

export function ChevronRightIcon({ filled, ...props }: IconProps) {
  return (
    <Svg {...props} strokeWidth={filled ? 3 : 2}>
      <path d="m9 18 6-6-6-6" />
    </Svg>
  );
}

export function ChevronLeftIcon({ filled, ...props }: IconProps) {
  return (
    <Svg {...props} strokeWidth={filled ? 3 : 2}>
      <path d="m15 18-6-6 6-6" />
    </Svg>
  );
}

export function ChevronDownIcon({ filled, ...props }: IconProps) {
  return (
    <Svg {...props} strokeWidth={filled ? 3 : 2}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Svg {...props} filled={false}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </Svg>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2" />
    </Svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Svg {...props} filled={false}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </Svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Svg {...props} filled={false}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </Svg>
  );
}

export function ProgressCircleIcon(props: IconProps) {
  return (
    <Svg {...props} filled={false}>
      <path d="M12 2a10 10 0 1 1-9.5 6.9" strokeDasharray="3 3" />
      <path d="M12 2A10 10 0 0 0 2.5 8.9" />
    </Svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <Svg {...props} filled={false}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <Svg {...props} filled={false}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </Svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <Svg {...props} filled={false}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Svg>
  );
}

export function AccessibilityIcon(props: IconProps) {
  return (
    <Svg {...props} filled={false}>
      <circle cx="12" cy="4" r="2" />
      <path d="M4 8h16M12 8v6M9 21l3-7 3 7" />
    </Svg>
  );
}

export function VertexLogoMark(props: IconProps) {
  return (
    <Svg {...props} stroke="none" filled>
      <path d="M1 3h7l4 9 4-9h7L12 23z" className="text-primary-500" fill="currentColor" />
      <path d="M8 3h8l-4 9z" fill="white" opacity="0.35" />
    </Svg>
  );
}
