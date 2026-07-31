export const WINES = [
  {
    slug: "merlot",
    name: "J.O. Sullivan Founders Reserve Merlot",
    shortName: "Merlot",
    vintages: [2023, 2022, 2021, 2020, 2019, 2018, 2015, 2014, 2013],
  },
  {
    slug: "cabernet-sauvignon",
    name: "J.O. Sullivan Founders Reserve Cabernet Sauvignon",
    shortName: "Cabernet Sauvignon",
    vintages: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013],
  },
  {
    slug: "cabernet-franc",
    name: "J.O. Sullivan Founders Reserve Cabernet Franc",
    shortName: "Cabernet Franc",
    vintages: [2022, 2021],
  },
] as const;

export type WineSlug = (typeof WINES)[number]["slug"];

export function getWine(slug: string) {
  return WINES.find((w) => w.slug === slug) ?? null;
}
