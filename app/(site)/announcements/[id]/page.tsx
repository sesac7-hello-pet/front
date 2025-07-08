import { cookies } from "next/headers";
import Link from "next/link";

interface AnnouncementDetailResponse {
  id: number;
  breed: string;
  announcementStatus: string;
  animalType: string;
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

const baseUrl = process.env.API_BASE_URL ?? "http://localhost:2222/api/v1";

async function fetchAnnouncementDetail(
  id: string
): Promise<AnnouncementDetailResponse> {
  const accessToken = cookies().get("accessToken")?.value;

  const url = `${baseUrl}/announcements/${id}`;
  console.log("🔍 요청 URL:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`❌ 요청 실패: ${res.status} - ${res.statusText}`);
    console.error("응답 내용:", errorText);
    throw new Error(`Failed to fetch announcement detail (${res.status})`);
  }

  return res.json();
}

const AnnouncementDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  let detail: AnnouncementDetailResponse;

  try {
    detail = await fetchAnnouncementDetail(params.id);
  } catch (err) {
    return (
      <main className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-bold text-red-600 text-center">
          데이터를 불러올 수 없습니다.
        </h1>
        <p className="text-center text-gray-600 mt-4">
          {err instanceof Error ? err.message : "알 수 없는 에러 발생"}
        </p>
      </main>
    );
  }

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

      <section className="bg-yellow-50 rounded-2xl p-8 shadow-inner space-y-5 text-gray-800 text-lg">
        {[
          { label: "동물 종류", value: detail.animalType },
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
        className="mt-4 w-full rounded-full bg-amber-400 py-3 font-semibold text-white shadow-md transition hover:bg-amber-500 block mx-auto text-center"
      >
        신청하기
      </Link>
    </main>
  );
};

export default AnnouncementDetailPage;
