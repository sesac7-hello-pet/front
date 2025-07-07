import { cookies } from "next/headers";

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
  console.log(detail.imageUrl);
  console.log(detail.breed);

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-600">
        {detail.breed} 상세정보
      </h1>
      {detail.imageUrl ? (
        <img
          src={detail.imageUrl}
          alt={detail.breed}
          className="w-full max-w-md rounded-xl mb-8 object-cover mx-auto shadow-md"
        />
      ) : (
        <div className="w-full max-w-md h-64 bg-gray-200 rounded-xl mb-8 flex items-center justify-center text-gray-400 mx-auto">
          이미지 없음
        </div>
      )}
      <section className="space-y-4 text-gray-800 text-lg">
        <p>
          <strong>성별:</strong> {detail.gender}
        </p>
        <p>
          <strong>품종:</strong> {detail.breed}
        </p>
        <p>
          <strong>건강 상태:</strong> {detail.health}
        </p>
        <p>
          <strong>성격:</strong> {detail.personality}
        </p>
        <p>
          <strong>나이:</strong> {detail.age}세
        </p>
        <p>
          <strong>보호소:</strong> {detail.shelterName}
        </p>
        <p>
          <strong>등록일:</strong>{" "}
          {new Date(detail.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>공고 기간:</strong>{" "}
          {new Date(detail.announcementPeriod).toLocaleDateString()}
        </p>
        <p>
          <strong>상태:</strong> {detail.announcementStatus}
        </p>
      </section>
    </main>
  );
};

export default AnnouncementDetailPage;
