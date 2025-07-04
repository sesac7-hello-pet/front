import Bottom from "../components/Bottom";
import Navigator from "../components/Navigator";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigator />
      <main className="flex-grow">{children}</main>
      <Bottom />
    </div>
  );
}
