export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems() {
  const res = await fetch("https://iluma-store.ru/api/products/getterea", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
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
      title: `Стики TEREA — купить`,
      description: `Купить стики TEREA для IQOS ILUMA. Все вкусы, оригинал, доставка.`,
      url: `https://tereaiqos.ru/products/stiki-terea-dlya-iqos-iluma`,
      images: [
        {
          url: `/favicon/web-app-manifest-512x512`,
          alt: `Ilumastore`,
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
    console.error(error);
    return <p>Ошибка загрузки данных</p>;
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
