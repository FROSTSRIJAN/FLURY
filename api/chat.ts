export const config = {
  runtime: "edge",
};

const DEFAULT_API_KEY = "sk-58c08ba36fd445409c082365bfd2c475";
const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const apiKey = process.env.NVIDIA_API_KEY || DEFAULT_API_KEY;

  const upstream = await fetch(NVIDIA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      Accept: "text/event-stream",
    },
    body: await request.text(),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
