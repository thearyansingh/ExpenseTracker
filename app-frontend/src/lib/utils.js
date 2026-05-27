export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getApiErrorMessage(error) {
  if (error?.code === "ERR_NETWORK" || error?.message === "Network Error") {
    const base = process.env.NEXT_PUBLIC_API_URL || "the API server";
    if (typeof window !== "undefined" && base.includes("localhost")) {
      return `Cannot reach the API at ${base}. On a phone, replace localhost with your PC's Wi‑Fi IP (e.g. http://192.168.1.10:5000) in .env.local, restart the frontend, and open the app via http://YOUR_PC_IP:3000`;
    }
    return `Cannot reach the API at ${base}. Check that the backend is running and your device is on the same Wi‑Fi.`;
  }
  const data = error?.response?.data;
  if (data?.errors?.length) {
    return data.errors.map((e) => e.message).join(". ");
  }
  if (data?.message) return data.message;
  if (error?.message) return error.message;
  return "Something went wrong. Please try again.";
}

export function getFieldErrors(error) {
  const details = error?.response?.data?.errors;
  if (!Array.isArray(details)) return {};
  const map = {};
  for (const item of details) {
    const key = Array.isArray(item.path) ? item.path[0] : item.path;
    if (key) map[key] = item.message;
  }
  return map;
}
