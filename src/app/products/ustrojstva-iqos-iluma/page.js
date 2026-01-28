export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

async function fetchItems() {
  const baseUrl =
    process.env.NODE_ENV === "production" && typeof window === "undefined"
      ? "http://localhost:3006"
      : "";

  try {
    return await safeFetch(`${baseUrl}/api/products/getiqos`, {
      cache: "no-store",
    });
  } catch (error) {
    console.error("Fetch error for iqos devices:", error.message);
    throw new Error("Ошибка загрузки товаров");
  }
}

export async function generateMetadata() {
  const title = "IQOS ILUMA для стиков TEREA Мсоква";

  return {
    title,
    description:
      "Устройства IQOS ILUMA для стиков TEREA. Оригинал, гарантия, наличие.",
    alternates: {
      canonical: `https://tereaiqos.ru/products/ustrojstva-iqos-iluma`,
    },
    openGraph: {
      title,
      description:
        "Устройства IQOS ILUMA для стиков TEREA. Оригинал, гарантия, наличие.",
      url: `https://tereaiqos.ru/products/ustrojstva-iqos-iluma`,
      images: [
        {
          url: `https://tereaiqos.ru/favicon/web-app-manifest-512x512.png`,
          alt: `IQOS ILUMA устройства`,
        },
      ],
    },
  };
}

export default async function Page() {
  let items = [];

  try {
    items = await fetchItems();
  } catch (error) {
    console.error("Page fetch error:", error);
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Ошибка загрузки</h1>
        <p>Не удалось загрузить список устройств.</p>
        <a href="/" style={{ color: "blue" }}>
          На главную
        </a>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="page-title">
        Оригинальные устройства IQOS ILUMA — купить в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
