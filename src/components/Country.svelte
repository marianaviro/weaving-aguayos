<script>
  import * as d3 from "d3";
  import { draw } from "svelte/transition";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { palette, magnitude, icon, texture } from "$lib/index.js";

  export let name;
  export let dest_subregion;
  export let countries;
  export let paddingX;
  export let paddingY;
  export let w;
  export let h;

  countries = countries.sort((a, b) => b["2020"] - a["2020"]);

  let slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "");

  let bg = palette(dest_subregion)[7];

  const padding = { top: paddingY, right: paddingX, bottom: paddingY, left: 0 };

  let width = w;
  let height = h;

  $: x = d3
    .scaleLinear()
    .domain([0, 48 + padding.right])
    .range([0, width]);

  $: y = d3
    .scaleLinear()
    .domain([0, 13 + padding.top + padding.bottom])
    .range([0, height]);

  $: size = x(1);
</script>

<div>
  <a href="/{slug}">
    <div class="country" id={name}>
      <svg {width} {height}>
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {#each countries as c, i (i)}
            <g class="column">
              {#each magnitude(c["2020"], padding.top, padding.bottom) as tile, j (j)}
                <g transform={`translate(${x(i)}, ${y(j)})`}>
                  <rect
                    width={size}
                    height={size}
                    fill={tile.empty
                      ? bg
                      : icon(tile.mag, palette(c.orig_subregion)).color}
                  />
                </g>
              {/each}
            </g>
          {/each}
        </g>
      </svg>
    </div>
  </a>
</div>

<style>
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  .country {
    font-family: "Inconsolata", mono;
    background-color: #f6f3ef;
    flex: 1;
  }

  .country:hover {
    cursor: pointer;
  }

  rect {
    transition:
      x 250ms,
      y 250ms;
  }
</style>
