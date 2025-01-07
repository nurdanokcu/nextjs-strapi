export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchStrapiData(endpoint:string, options = {}) {
  const finalUrl = `${BASE_URL}/api/${endpoint}`;
  try {
    const res = await fetch(finalUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
