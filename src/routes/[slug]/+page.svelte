<script>
  import * as d3 from "d3";
  import { fade } from "svelte/transition";
  import { palette, magnitude, icon, texture } from "$lib/index.js";

  // set up data
  let { data } = $props();
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
  let mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? true
      : false;
  let legend = $state(false);
  let show = $state(true);
  let currentCountry = $state();
  let ci = $state();
  let cj = $state();
  let magnitudes = [
    "At least 1 person",
    "More than 10",
    "More than 100",
    "More than 1,000",
    "More than 10,000",
    "More than 100,000",
    "More than 1,000,000",
    "Migrants welcomed:",
  ];
  let tooltip = $derived(
    currentCountry
      ? { "country": currentCountry, "migrants": countries[ci]["2020"] }
      : {}
  );

  function handleHover(e) {
    show = false;
    let i = e.target.id?.split(" ")[0];
    let j = e.target.id?.split(" ")[1];
    currentCountry = countries[i]?.origin;
    ci = i;
    cj = j;
  }

  function toggleLegend() {
    show = true;
    legend = !legend;
  }

  function showAll() {
    show = true;
  }

  let width = $state(1440);
  let height = $state(800);

  let y = $derived(
    d3
      .scaleLinear()
      .domain([0, 13 + padding.top + padding.bottom])
      .range([0, height])
  );

  let size = $derived(y(1));
</script>

<!-- Tooltip -->
<div
  class={legend ? "tooltip unfocused" : "tooltip"}
  opacity={legend ? 0.5 : 1}
>
  {#if currentCountry}
    <p class="figure">
      <b>{`${tooltip.migrants?.toLocaleString("en-US")}`}</b>
      people
    </p>
    <p class="text">migrated from</p>
    <p class="ori-des">
      <b>{tooltip?.country}</b> to <b>{name}</b>
    </p>
    <p class="year">in 2020</p>
  {:else}<p class="text">
      ({mobile ? "click" : "hover"} over the weaving)
    </p>{/if}
</div>

<!-- Legend -->
<button class="legend" onclick={toggleLegend} onkeydown={toggleLegend}>
  <p class="text">
    {legend ? "[hide legend -]" : "[show legend +]"}
  </p>
</button>

<!-- Aguayo -->
<div
  class="country"
  id={name}
  style={`background-color: ${bg}`}
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <svg
    width={size * (countries.length + 2)}
    {height}
    preserveAspectRatio="xMinYMid"
  >
    <g transform={`translate(${padding.left}, ${padding.top})`}>
      {#each countries as c, i (i)}
        <g
          id={c.origin}
          class="column"
          onmouseover={handleHover}
          onfocus={handleHover}
          onmouseout={showAll}
          onblur={showAll}
          aria-label={`${c.origin}`}
          role="presentation"
        >
          {#each magnitude(c["2020"], padding.top, padding.bottom) as tile, j (j)}
            <g
              transform={`translate(${size * i}, ${y(j)})`}
              opacity={!legend ||
              (legend && !tile.down && ci == i) ||
              (show && !tile.down)
                ? 1
                : 0.3}
            >
              <rect
                id={`${i} ${j}`}
                width={size}
                height={size}
                fill={tile.empty
                  ? bg
                  : icon(tile.mag, palette(c.orig_subregion)).color}
                style={`filter: brightness(${ci == i && !legend ? 1.3 : 1}); transition: filter 150ms;
                transition-timing-function: ease-out;`}
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
          <!-- Countries -->
          <text
            x={size * (i + 1) - 7}
            y={height - 30}
            opacity={ci == i ? 1 : 0.1}
            style={`transition: opacity 100ms;
              transition-timing-function: ease-out;`}
            fill="#f6f3ef"
            transform={`rotate(-90, ${size * (i + 1) - 7}, ${height - 30})`}
            >{c.origin}</text
          >
        </g>
      {/each}
    </g>
    <!-- Magnitudes -->
    <g
      opacity={legend ? 1 : 0}
      transform={`translate(${padding.left}, ${padding.top})`}
      style="transition: opacity 250ms"
    >
      {#each magnitudes as mag, k}
        <!-- <text
          y={height / 2 - size * k + 5 - size / 2}
          x={size * (countries.length + 2) - 150}
          fill="#f6f3ef">{mag}</text
        > -->
        <text
          y={height / 2 - size * (k + 1) + 12}
          x="20"
          fill="#f6f3ef"
          font-size="0.85em">{mag}</text
        >
        <line
          x1="0"
          x2={size * countries.length}
          y1={height / 2 - size * k + size / 2}
          y2={height / 2 - size * k + size / 2}
          stroke="#f6f3ef"
          stroke-width="0.7"
          stroke-dasharray={k == 0 ? "" : "0.5 3"}
          stroke-linecap="round"
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  .unfocused {
    opacity: 0.1;
  }
  .legend {
    border: none;
    background-color: transparent;
    text-align: left;
    cursor: pointer;
    opacity: 0.5;
    right: 1em;
  }
  .legend:hover {
    opacity: 1;
  }
  .ori-des {
  }
  .text,
  .year {
    font-style: italic;
    opacity: 0.5;
    font-weight: 300;
  }
  .tooltip,
  .legend {
    position: fixed;
    top: 5em;

    padding-left: 2em;
    text-align: left;
    min-width: 150px;
    z-index: 10;
    color: white;
    transition: opacity 250ms;
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
  }
  rect {
    transition:
      x 250ms,
      y 250ms;
  }
  @media screen and (min-width: 640px) {
    .tooltip {
      top: 3.5em;
    }
    .legend {
      right: 2em;
    }
  }
</style>
