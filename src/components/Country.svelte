<script>
  import * as d3 from "d3";
  import { draw } from "svelte/transition";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { palette, magnitude, icon, texture } from "$lib/index.js";

  export let isolated;
  export let name;
  export let dest_subregion;
  export let countries;
  export let paddingX;
  export let paddingY;
  export let w;
  export let h;
  export let handleClick;
  export let handleHover;

  countries = countries.sort((a, b) => b["2020"] - a["2020"]);

  let bg = palette(dest_subregion)[7];

  $: if (!isolated) {
    console.log(`not isolated`);
  }

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

<div
  class={isolated ? "country iso" : "country"}
  on:click={() => handleClick(name)}
  on:keydown={() => handleClick(name)}
  role="button"
  tabindex={name}
  aria-label={`See ${name}`}
  id={name}
  style={isolated ? `background-color: ${bg}` : ""}
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
              {#if isolated}
                {#if !tile.empty}
                  <g
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
                        magnitude(c["2020"], padding.top, padding.bottom)
                          .length /
                          2
                    ).svg}
                  </g>
                {/if}
              {/if}
            </g>
          {/each}
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>
  .column:hover {
  }
  .country {
    font-family: "Inconsolata", mono;
    background-color: #f6f3ef;
    /* border-radius: 2px; */
    /* Take up any available extra space */
    flex: 1;
  }

  .country:hover {
    cursor: pointer;
  }
  .country.iso:hover {
    cursor: default;
  }
  rect {
    transition:
      x 250ms,
      y 250ms;
  }
</style>
