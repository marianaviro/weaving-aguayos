<script>
  import * as d3 from "d3";
  import { fade } from "svelte/transition";
  import { palette, magnitude, icon, texture } from "$lib/index.js";

  // set up data
  export let data;
  let countries = data.country.sort((a, b) => b["2020"] - a["2020"]);

  // set up info
  let name = data.country[0]?.destination;
  let dest_subregion = data.country[0]?.dest_subregion;

  // set up styles
  let paddingX = 5;
  let paddingY = 8;
  const padding = { top: paddingY, right: paddingX, bottom: paddingY, left: 0 };
  let bg = palette(dest_subregion)[7];

  // interaction
  let currentCountry;
  let ci;
  $: tooltip = currentCountry
    ? { "country": currentCountry, "migrants": countries[ci]["2020"] }
    : {};

  function handleHover(e) {
    let i = e.target.id?.split(" ")[0];
    currentCountry = countries[i]?.origin;
    ci = i;
  }

  let width = 1440;
  let height = 800;

  $: y = d3
    .scaleLinear()
    .domain([0, 13 + padding.top + padding.bottom])
    .range([0, height]);

  $: size = y(1);
</script>

<div class="tooltip">
  {#if currentCountry}
    <p class="figure">
      <b>{`${tooltip.migrants?.toLocaleString("en-US")}`}</b>
      people
    </p>
    <p class="text">migrated from</p>
    <p class="text">
      <b>{tooltip?.country}</b> to <b>{name}</b>
    </p>
    <p class="year">in 2020</p>
  {:else}<p class="text">(hover over the weaving)</p>{/if}
</div>

<div
  class="country"
  id={name}
  style={`background-color: ${bg}`}
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <svg width={size * (countries.length + 2)} {height}>
    <g transform={`translate(${padding.left}, ${padding.top})`}>
      {#each countries as c, i (i)}
        <g
          id={c.origin}
          class="column"
          on:mouseover={handleHover}
          on:focus={handleHover}
          aria-label={`${c.origin}`}
          role="presentation"
        >
          {#each magnitude(c["2020"], padding.top, padding.bottom) as tile, j (j)}
            <g transform={`translate(${size * i}, ${y(j)})`}>
              <rect
                id={`${i} ${j}`}
                width={size}
                height={size}
                fill={tile.empty
                  ? bg
                  : icon(tile.mag, palette(c.orig_subregion)).color}
                style={`filter: brightness(${ci == i ? 1.2 : 1})`}
              />
              {#if !tile.empty}
                <g
                  viewBox={`0 0 ${size} ${size}`}
                  x={size * i}
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
  .name {
    font-weight: bold;
  }
  .text,
  .year {
    font-style: italic;
  }
  .tooltip {
    position: fixed;
    bottom: 2em;
    right: 2em;
    text-align: left;
    min-width: 150px;
    z-index: 999;
    color: white;
  }
  svg {
    max-width: 1440px;
    cursor: pointer;
  }
  .country {
    padding: 0;
    font-family: "Inconsolata", mono;
    background-color: #f6f3ef;
    flex: 1;
    min-height: 0;
    max-height: 100vh;
    overflow-x: scroll;
  }
  rect {
    transition:
      x 250ms,
      y 250ms;
  }
</style>
