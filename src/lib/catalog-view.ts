import type { Product } from "../data/catalog";
import { categories, products } from "../data/catalog";
import { CATALOG_SORT_LOCALE } from "../config/site";
import {
  categoryTranslations,
  productTranslations,
  productTranslationsExtra,
  ui,
  whatsappCatalogs,
} from "../i18n/ui";

export type Locale = "es" | "en" | "fr";
export type UiKey = keyof typeof ui.es;
type LocalizedProduct = Pick<Product, "name" | "description">;
type ProductTranslationMap = Partial<
  Record<string, Partial<Record<Locale, LocalizedProduct>>>
>;

export const translate = (locale: Locale, key: UiKey): string =>
  ui[locale][key] as string;

export const localizedCategory = (locale: Locale, category: string) =>
  categoryTranslations[category]?.[locale] ?? category;

export const localizedProduct = (locale: Locale, product: Product) =>
  (productTranslations as ProductTranslationMap)[product.id]?.[locale] ??
  (productTranslationsExtra as ProductTranslationMap)[product.id]?.[locale] ??
  product;

const catalogForProduct = (_product: Pick<Product, "id">) =>
  "principal" as const;

export const whatsappForProduct = (locale: Locale, product: Product) =>
  whatsappCatalogs[catalogForProduct(product)][locale === "fr" ? "fr" : "es"];

const clean = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const excerpt = (html: string) => {
  const text = clean(html);
  return text.slice(0, 118) + (text.length > 118 ? "…" : "");
};

export const formatPrice = (locale: Locale, price: number) => {
  if (price <= 0) return translate(locale, "ask");

  const priceLocale =
    locale === "en" ? "en-GB" : locale === "fr" ? "fr-FR" : "es-ES";
  return (price * 1.21).toLocaleString(priceLocale, {
    style: "currency",
    currency: "EUR",
  });
};

export const visibleCategories = categories;
export const featuredProducts = [products[3], products[4], products[6]];
export const catalogProducts = [...products].sort((left, right) =>
  localizedProduct(CATALOG_SORT_LOCALE, left).name.localeCompare(
    localizedProduct(CATALOG_SORT_LOCALE, right).name,
    CATALOG_SORT_LOCALE,
    { sensitivity: "base" },
  ),
);
export const heroImages = [
  "/images/hero/1.jpeg",
  "/images/hero/2.jpeg",
  "/images/hero/3.jpeg",
  "/images/hero/4.jpeg",
  "/images/hero/5.jpeg",
  "/images/hero/6.jpeg",
  "/images/hero/7.jpeg",
  "/images/hero/8.jpeg",
  "/images/hero/9.jpeg",
];
