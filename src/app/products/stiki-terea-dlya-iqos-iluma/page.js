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
    return await safeFetch(`${baseUrl}/api/products/getterea`, {
      cache: "no-store",
    });
  } catch (error) {
    console.error("Fetch error for terea sticks:", error.message);
    throw new Error("Ошибка загрузки товаров");
  }
}

export async function generateMetadata() {
  const title = "Стики TEREA — купить";

  return {
    title,
    description:
      "Купить стики TEREA для IQOS ILUMA. Все вкусы, оригинал, доставка.",
    alternates: {
      canonical: `https://tereaiqos.ru/products/stiki-terea-dlya-iqos-iluma`,
    },
    openGraph: {
      title,
      description:
        "Купить стики TEREA для IQOS ILUMA. Все вкусы, оригинал, доставка.",
      url: `https://tereaiqos.ru/products/stiki-terea-dlya-iqos-iluma`,
      images: [
        {
          url: `https://tereaiqos.ru/favicon/web-app-manifest-512x512.png`,
          alt: `Стики TEREA`,
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
        <p>Не удалось загрузить список стиков.</p>
        <a href="/" style={{ color: "blue" }}>
          На главную
        </a>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="page-title">
        Купить стики Terea для IQOS ILUMA в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
