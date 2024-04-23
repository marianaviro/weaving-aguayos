<script>
  import * as d3 from "d3";
  import { palette, magnitude, icon, texture } from "$lib/index.js";

  // set up data
  export let data;
  let countries = data.country.sort((a, b) => b["2020"] - a["2020"]);
  console.log(countries);

  // set up info
  let name = data.country.destination;
  let dest_subregion = data.country[0].dest_subregion;
  console.log(dest_subregion);

  // set up styles
  let paddingX = 5;
  let paddingY = 8;
  const padding = { top: paddingY, right: paddingX, bottom: paddingY, left: 0 };
  let bg = palette(dest_subregion)[7];

  // interaction
  function handleHover() {}

  let width = 1440;
  let height = 800;

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

<div
  class="country"
  id={name}
  style={`background-color: ${bg}`}
  bind:clientWidth={width}
  bind:clientHeight={height}
>
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
              {#if !tile.empty}
                <g
                  viewBox={`0 0 ${size} ${size}`}
                  x={x(i)}
                  y={y(j)}
                  width={size}
                  height={size}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  style={texture(tile.mag, palette(c.orig_subregion), false)
                    .style}
                  >{@html texture(
                    tile.mag,
                    palette(c.orig_subregion),
                    j <
                      magnitude(c["2020"], padding.top, padding.bottom).length /
                        2
                  ).svg}
                </g>
              {/if}
            </g>
          {/each}
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>
  .country {
    padding: 0;
    font-family: "Inconsolata", mono;
    background-color: #f6f3ef;
    /* border-radius: 2px; */
    flex: 1;
    min-height: 0;
    max-height: 100vh;
  }
  rect {
    transition:
      x 250ms,
      y 250ms;
  }
</style>
