const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://india-post-accessibility-audit.onrender.com";

export async function runAccessibilityAudit(url) {
  const response = await fetch(`${API_BASE_URL}/audit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Audit failed");
  }

  return data;
}
