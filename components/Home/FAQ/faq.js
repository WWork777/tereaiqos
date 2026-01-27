"use client";

import { useState } from "react";
import Script from "next/script";
import styles from "./FAQ.module.scss";

export default function FAQ() {
  const faqs = [
    {
      question: "В чем принципиальное отличие стиков Terea от Heets?",
      answer:
        "Terea использует технологию индукционного нагрева SMART CORE, где нагревательный элемент встроен непосредственно в стик, в то время как Heets нагреваются внешним лезвием устройства. Это исключает необходимость чистки девайса и обеспечивает более стабильный температурный режим.",
    },
    {
      question:
        "Можно ли использовать Terea с IQOS 3 DUO или другими старыми моделями?",
      answer:
        "Нет, стики Terea совместимы исключительно с линейкой ILUMA (ILUMA, ILUMA PRIME, ILUMA ONE). Для моделей IQOS 2.4+, 3 DUO, Lil Solid и других ранних версий предназначены стики Heets. Совместное использование невозможно из-за различий в технологии нагрева.",
    },
    {
      question: "Какие гарантии подлинности продукции вы предоставляете?",
      answer:
        "Каждая пачка Terea имеет полный комплект защиты: акцизные марки с уникальным QR-кодом для проверки через приложение «Честный ЗНАК», голографические наклейки, серийные номера, соответствие ГОСТу. Перед отправкой мы проверяем каждую единицу товара и предоставляем фото упаковки по запросу.",
    },
    {
      question: "Какой срок годности у стиков Terea и условия хранения?",
      answer:
        "Срок годности составляет 18 месяцев с даты производства при соблюдении условий хранения: температура +10°C до +25°C, влажность не более 70%, защита от прямых солнечных лучей. Мы храним продукцию на оборудованных складах и отправляем свежие партии с запасом срока годности не менее 12 месяцев.",
    },
    {
      question: "Какие варианты оплаты и доставки доступны?",
      answer:
        "Принимаем оплату наличными курьеру, переводом на карту, через СБП. Доставляем по Москве (1-3 часа), МО (до 6 часов), отправляем в регионы через СДЭК/Boxberry (1-4 дня). Минимальный заказ для доставки — 10 пачек или 1 блок. Самовывоз временно недоступен.",
    },
    {
      question: "Есть ли скидки при оптовой покупке?",
      answer:
        "Да, действует прогрессивная система скидок: от 20 пачек — 5%, от 50 пачек — 8%, от 100 пачек — 12%, от 200 пачек — индивидуальные условия. Для постоянных клиентов формируем персональные предложения и предоставляем доступ к закрытым акциям.",
    },
    {
      question: "Что делать, если стики повреждены при доставке?",
      answer:
        "При получении обязательно проверяйте целостность упаковки. В случае повреждений или несоответствия заказу — фотографируйте и сразу связывайтесь с менеджером. Замену или возврат средств осуществляем в течение 24 часов после обращения.",
    },
    {
      question: "Можно ли смешивать разные вкусы в одном заказе?",
      answer:
        "Да, вы можете комбинировать любые вкусы Terea в любых пропорциях. При заказе от 10 пачек разных вкусов предоставляем дополнительную скидку 3% на весь заказ. Формируем удобную упаковку с маркировкой каждого вкуса.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className={styles.faq}>
      <h2 className={styles.title}>Частые вопросы о покупке стиков Terea</h2>

      {/* JSON-LD для SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            name: "Вопросы и ответы о покупке и использовании стиков Terea",
            description:
              "Подробные ответы о совместимости, качестве, условиях покупки и доставки стиков Terea для IQOS ILUMA в Москве",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className={styles.list}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.item} ${openIndex === index ? styles.active : ""}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <button
              type="button"
              className={styles.question}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(openIndex === index ? null : index);
              }}
              aria-expanded={openIndex === index}
              aria-controls={`answer-${index}`}
            >
              {faq.question}
              <span className={styles.icon}>
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <p
              id={`answer-${index}`}
              className={`${styles.answer} ${openIndex === index ? styles.open : ""}`}
              aria-hidden={openIndex !== index}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
