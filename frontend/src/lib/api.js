// Point the shop at another host with VITE_API_URL. Defaults to the local API.
const fromEnv = import.meta.env.VITE_API_URL;
export const API_BASE = (fromEnv === undefined ? "http://localhost:5000" : fromEnv).replace(/\/$/, "");

export function imageUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function averageRating(product) {
  const reviews = product?.reviews;
  if (Array.isArray(reviews) && reviews.length) {
    const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    return total / reviews.length;
  }
  return Number(product?.avgRating) || 0;
}

export function reviewCount(product) {
  if (Array.isArray(product?.reviews)) return product.reviews.length;
  return Number(product?.avgRating) > 0 ? 1 : 0;
}


export function bottleNotes(description = "") {
  const withMatch = description.match(/\bwith\s+([^.]+)/i);
  const raw = withMatch ? withMatch[1] : description;
  const parts = raw
    .replace(/\bnotes?\b/gi, "")
    .split(/,|\band\b|&/i)
    .map((part) => part.replace(/^[\s.:;-]+|[\s.:;-]+$/g, "").replace(/^(a|an|the)\s+/i, "").trim())
    .filter((part) => part.length > 2 && part.length < 52);
  const unique = [];
  parts.forEach((part) => {
    const label = part.charAt(0).toUpperCase() + part.slice(1);
    if (!unique.includes(label)) unique.push(label);
  });
  return unique.slice(0, 4);
}
