import { error } from "@sveltejs/kit";
import * as d3 from "d3";

export async function load({ fetch, params }) {
  const res = await fetch("/within_latam_subregions_2020.csv");
  const text = await res.text();
  const dataset = d3.csvParse(text, d3.autoType);
  let slug = params.slug
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .normalize("NFD") // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents and tildes
    .replace(/[^\w-]+/g, "");
  const country = dataset.filter(
    (c) =>
      c.destination
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .normalize("NFD") // Normalize unicode characters
        .replace(/[\u0300-\u036f]/g, "") // Remove accents and tildes
        .replace(/[^\w-]+/g, "") === slug
  );

  if (!country) throw error(404);

  return {
    country,
  };
}
