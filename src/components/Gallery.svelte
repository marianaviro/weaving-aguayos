<script>
  import "../routes/styles.css";
  import * as d3 from "d3";
  import { fade, draw, fly } from "svelte/transition";
  import { icon, palette, magnitude } from "$lib/index.js";

  /**
   * @typedef {Object} Props
   * @property {any} data - data setup
   */

  /** @type {Props} */
  let { data, selectedCountry = $bindable() } = $props();

  let dataset = data.dataset;
  let groupedData = d3.group(dataset, (d) => d.destination);

  // design setup
  let paddingX = 5;
  let paddingY = 8;
  const padding = { top: paddingY, right: paddingX, bottom: paddingY, left: 0 };
  let width = 270;
  let height = 180;
  let tileSize = width / (33 + paddingX);

  // container setup
  let cw = $state();
  let visible = $state(true);

  function toggleControls() {
    visible = !visible;
  }

  // filters and sorts
  let sort = $state(1);
  let filter = $state("");

  let countries = $derived.by(() => {
    let c = [...groupedData.keys()];
    if (sort < 3) {
      c.sort((a, b) => {
        let totalA = groupedData.get(a).reduce((acc, curr) => {
          return acc + curr["2020"];
        }, 0);
        let totalB = groupedData.get(b).reduce((acc, curr) => {
          return acc + curr["2020"];
        }, 0);
        if (sort === 1) return totalB - totalA;
        else return totalA - totalB;
      });
    } else {
      c.sort();
    }
    return c;
  });

  function clearSearch() {
    sort = 1;
    filter = "";
  }
</script>

<div class="gallery">
  <div class="controls">
    <button class="toggle" onclick={toggleControls} onkeydown={toggleControls}>
      <p class="text">
        {visible ? "[ Hide filters - ]" : "[ Show filters + ]"}
      </p>
    </button>
    {#if visible}
      <div class="sortfilter">
        <div class="sorts">
          <p>Sort by:</p>
          {#each [1, 2, 3] as sort_type}
            <label>
              <input type="radio" value={sort_type} bind:group={sort} />
              {sort_type === 1
                ? "Migrants welcomed (Desc)"
                : sort_type === 2
                  ? "Migrants welcomed (Asc)"
                  : "Alphabetical (A to Z)"}
            </label>
          {/each}
        </div>
        <div class="filters">
          <p>Search:</p>
          <label for="filter"> <input id="filter" bind:value={filter} /></label>
        </div>
        <button class="toggle" onclick={clearSearch} onkeydown={clearSearch}>
          <p class={filter == "" ? "text inactive" : "text"}>
            [ Clear search ]
          </p>
        </button>
      </div>
    {/if}
  </div>
  <div class="wrapper">
    <div class="countries" bind:clientWidth={cw}>
      <div class="container">
        {#each countries as c (c)}
          {#if c.toLowerCase().startsWith(filter.toLowerCase())}
            <div class="link" key={c} id={c}>
              <a
                href="/{c
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^\w-]+/g, '')}"
              >
                <p class="name">{c}</p>
                <div
                  class="country"
                  id={c}
                  in:draw={{ duration: 1000 }}
                  style={`background-color: ${
                    palette(groupedData.get(c)[0].dest_subregion)[7]
                  }; border-top: 7px solid ${
                    palette(groupedData.get(c)[0].dest_subregion)[4]
                  }; border-bottom: 7px solid ${
                    palette(groupedData.get(c)[0].dest_subregion)[4]
                  };`}
                >
                  <svg {width} {height}>
                    <g transform={`translate(${padding.left}, ${padding.top})`}>
                      {#each groupedData
                        .get(c)
                        .sort((a, b) => b["2020"] - a["2020"]) as country, i (i)}
                        <g class="column">
                          {#each magnitude(country["2020"], padding.top, padding.bottom) as tile, j (j)}
                            <g
                              transform={`translate(${tileSize * i}, ${tileSize * j})`}
                            >
                              <rect
                                width={tileSize}
                                height={tileSize}
                                fill={tile.empty
                                  ? palette(country.dest_subregion)[7]
                                  : icon(
                                      tile.mag,
                                      palette(country.orig_subregion)
                                    ).color}
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
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .controls .text.inactive {
    opacity: 0.35;
  }
  .controls {
    z-index: 99;
    position: sticky;
    top: 0;
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: space-between;
    padding: 3em 3em 2em 3em;
    border-bottom: rgba(0, 0, 0, 0.2) solid 0.5px;
    background-color: #f6f3ef;
  }

  button.toggle {
    border: none;
    background-color: transparent;
    text-align: right;
    cursor: pointer;
    font-style: italic;
    min-width: 100px;
  }
  button.toggle:hover {
    color: #ff6633;
  }

  .sortfilter {
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    flex-direction: column;
  }

  .sorts {
    display: flex;
    justify-content: start;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 1em 0em;
  }

  .sorts label {
    cursor: pointer;
    font-style: normal;
  }

  .sorts label:hover {
    color: #ff6633;
  }

  .filters p,
  .sorts p {
    margin-bottom: 0.5em;
  }

  #filter {
    width: 300px;
    border: none;
    padding: 0.25em 0.5em;
  }

  .countries {
    display: flex;
    flex-direction: column;
    /* width: 100vw; */
  }

  .container {
    display: flex;
    gap: 3em;
    padding: 0em 3em 5em 3em;
    flex-wrap: wrap;
    flex-direction: row;
    scroll-behavior: smooth;
    justify-content: space-around;
    align-content: start;
    word-break: break-word;
  }

  .country {
    width: 100%;
    height: 100%;
    border-radius: 1px;
    padding: 0px;
    box-shadow: #e7d7e7 0px 0px;
  }

  .country:hover {
    box-shadow: #e7d7e7 10px 10px;
  }

  .link {
    padding: 2em 0;
    position: relative;
    left: 0px;
    transition: transform 250ms;
    transition-timing-function: ease-in-out;
  }
  .link:hover {
    cursor: pointer;
    font-style: italic;
    transform: translate(-5px, -5px);
    transition: transform 250ms;
    transition-timing-function: ease-in-out;
  }
  .link a {
    width: 100%;
    height: 100%;
    text-decoration: none !important;
  }
  a p.name {
    color: #330033;
    margin-bottom: 10px;
  }
  @media screen and (min-width: 917px) {
    .controls {
      flex-direction: row;
      align-items: start;
    }
    .countries {
      flex-direction: row;
    }
    .sortfilter {
      flex-direction: row;
    }
    .filters,
    .sorts {
      padding: 0em 3em;
    }
  }
</style>
