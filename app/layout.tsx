import Bottom from "./components/Bottom";
import Navigator from "./components/Navigator";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <Navigator />
        <main className="flex-grow">{children}</main>
        <Bottom />
      </body>
    </html>
  );
}
