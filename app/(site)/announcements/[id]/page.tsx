import { cookies } from "next/headers";
import Link from "next/link";

interface AnnouncementDetailResponse {
  id: number;
  breed: string;
  announcementStatus: string;
  shelterName: string;
  createdAt: string;
  imageUrl: string;
  gender: string;
  health: string;
  personality: string;
  age: number;
  announcementPeriod: string;
}

const animalstatus: Record<"IN_PROGRESS" | "COMPLETED", string> = {
  IN_PROGRESS: "입양 중",
  COMPLETED: "입양완료",
};

const baseUrl = process.env.API_BASE_URL ?? "http://localhost:2222/api/v1"; // ✅ 포트 확인도!

async function fetchAnnouncementDetail(
  id: string
): Promise<AnnouncementDetailResponse> {
  const accessToken = cookies().get("accessToken")?.value;

  const res = await fetch(`${baseUrl}/announcements/${id}`, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch announcement detail");
  }

  return res.json();
}

const AnnouncementDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const detail = await fetchAnnouncementDetail(params.id);

  return (
    <main className="max-w-2xl mx-auto py-12 px-6 bg-white">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-600 text-center">
        {detail.breed} 상세정보
      </h1>

      {detail.imageUrl ? (
        <img
          src={detail.imageUrl}
          alt={detail.breed}
          className="w-full max-w-md rounded-2xl mb-8 object-cover mx-auto shadow-md"
        />
      ) : (
        <div className="w-full max-w-md h-64 bg-gray-100 rounded-2xl mb-8 flex items-center justify-center text-gray-400 mx-auto font-semibold">
          이미지 없음
        </div>
      )}

      {/* 상세정보 박스만 노란 배경 */}
      <section className="bg-yellow-50 rounded-2xl p-8 shadow-inner space-y-5 text-gray-800 text-lg">
        {[
          { label: "성별", value: detail.gender },
          { label: "품종", value: detail.breed },
          { label: "건강 상태", value: detail.health },
          { label: "성격", value: detail.personality },
          { label: "나이", value: `${detail.age}세` },
          { label: "보호소", value: detail.shelterName },
          {
            label: "등록일",
            value: new Date(detail.createdAt).toLocaleDateString(),
          },
          {
            label: "공고 기간",
            value: new Date(detail.announcementPeriod).toLocaleDateString(),
          },
          {
            label: "상태",
            value:
              animalstatus[
                detail.announcementStatus as "IN_PROGRESS" | "COMPLETED"
              ],
          },
        ].map(({ label, value }, i) => (
          <p key={i} className="flex items-center">
            <strong className="w-28 text-orange-500">{label}:</strong>
            <span className="ml-2 text-gray-900 font-normal">{value}</span>
          </p>
        ))}
      </section>
      <Link
        href={`/announcements/${detail.id}/apply`}
        className="
     mt-4
w-full
rounded-full      
bg-amber-400
py-3
font-semibold
text-white
shadow-md
transition
hover:bg-amber-500
disabled:opacity-50
disabled:cursor-not-allowed
block               
mx-auto             
text-center

    "
      >
        신청하기{" "}
      </Link>
    </main>
  );
};

export default AnnouncementDetailPage;
