import Bottom from "../components/Bottom";
import Navigator from "../components/Navigator";

const FOOTER_H = 64; // footer 높이(px) = py-3(≈12) ×2 + 텍스트 라인 ≈64

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 헤더 */}
      <Navigator />

      {/* 본문: footer 높이만큼 패딩 확보 */}
      <main className="flex-1">
        <div
          className="mx-auto w-full max-w-7xl px-4 py-8"
          style={{ paddingBottom: FOOTER_H }}
        >
          {children}
        </div>
      </main>

      {/* 고정 푸터 */}
      <Bottom />
    </div>
  );
}
