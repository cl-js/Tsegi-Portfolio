const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const CUSTOM_API_URL = import.meta.env.VITE_INQUIRY_API_URL?.replace(/\/$/, "");

export async function submitInquiry(payload) {
  if (CUSTOM_API_URL) {
    const response = await fetch(CUSTOM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Inquiry API rejected the request.");
    return response.json().catch(() => ({}));
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Inquiry backend is not configured yet.");
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ ...payload, status: "new" }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || "Supabase rejected the inquiry.");
  }

  return null;
}
