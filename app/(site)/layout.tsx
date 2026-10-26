import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgba(15,23,42,0.025)_6px_7px)] bg-[#fbf9f8]">
      <div className="relative mx-auto flex w-full min-w-0 max-w-[1440px] flex-col overflow-hidden border-x border-neutral-200/70 bg-[#fbf9f8]">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
