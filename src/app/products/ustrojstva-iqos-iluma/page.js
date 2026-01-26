export const dynamic = "force-dynamic";
import ClientFilters from "./client";

async function fetchItems() {
  const res = await fetch("https://iluma-store.ru/api/products/getiqos", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json();
}

export async function generateMetadata() {
  const title = "IQOS ILUMA для стиков TEREA";
  return {
    title,
    description:
      "Устройства IQOS ILUMA для стиков TEREA. Оригинал, гарантия, наличие.",
    alternates: {
      canonical: `https://tereaiqos.ru/products/stiki-terea-dlya-iqos-iluma`,
    },
    openGraph: {
      title: `IQOS ILUMA для стиков TEREA`,
      description: `Устройства IQOS ILUMA для стиков TEREA. Оригинал, гарантия, наличие.`,
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
        Оригинальные устройства IQOS ILUMA — купить в Москве и России
      </h1>
      <ClientFilters items={items} />
    </div>
  );
}
