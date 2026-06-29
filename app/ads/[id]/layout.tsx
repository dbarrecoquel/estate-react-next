import { AdDetailProvider } from "@/context/ads-detail.context";

export default function AdDetailLayout({ children }: { children: React.ReactNode }) {
  return <AdDetailProvider>{children}</AdDetailProvider>;
}