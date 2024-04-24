<script>
  import "./styles.css";
  import * as d3 from "d3";
  import { fade, draw, fly } from "svelte/transition";
  import { icon, palette, magnitude } from "$lib/index.js";

  // data setup
  export let data;
  let dataset = data.dataset;
  let groupedData = d3.group(dataset, (d) => d.destination);
  let countries = [...groupedData.keys()];

  // design setup
  let paddingX = 5;
  let paddingY = 8;
  const padding = { top: paddingY, right: paddingX, bottom: paddingY, left: 0 };
  let width = 270;
  let height = 180;
  let tileSize = width / (33 + paddingX);

  // sidebar setup
  let cw;
  $: large = cw > 800 ? true : false;
  let open = false;
  function handleClick() {
    open = !open;
    console.log(open);
  }
</script>

<div class="countries" bind:clientWidth={cw}>
  <div class="sidebar" id="sidebar">
    <div class="desc_container">
      <p class="logo">aguayos.weav</p>
    </div>
    {#if open}
      <div transition:fade={{ duration: 250 }}>
        <div class="cell">
          <p class="description">
            migration within latin american countries has been a source of
            connection between cultures that has influenced our communities in
            unique ways. migration within latin american countries has been a
            source of connection between cultures that has influenced our
            communities in unique ways.
          </p>
        </div>
        <div class="cell">
          <p class="data"><b>data:</b> UN migration stock 2020</p>
          <p class="author"><b>author:</b> mariana villamizar</p>
          <p class="date"><b>date:</b> apr 2024</p>
        </div>
      </div>
    {/if}
    <div class="desc_container close">
      <button class="toggle" on:click={() => handleClick()}
        >{`[${open ? "close x" : "about +"}]`}</button
      >
    </div>
  </div>

  <div class="container">
    {#each countries as c (c)}
      <div class="link">
        <a
          href="/{c
            .toLowerCase()
            .replace(/\s+/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w-]+/g, '')}"
        >
          <p class="name">{c.toLowerCase()}</p>
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
                            : icon(tile.mag, palette(country.orig_subregion))
                                .color}
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
    {/each}
  </div>
</div>

<style>
  .sidebar {
    transition:
      height 2s,
      width 2s;
  }
  .close {
    text-align: right;
  }
  .countries {
    display: flex;
    flex-direction: column;
  }
  .container {
    flex: 1;
    overflow-x: hidden;
  }
  .sidebar {
    padding: 2em;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 200px;
  }
  .data,
  .author,
  .date {
    font-style: italic;
  }
  .sidebar button.toggle {
    border: none;
    background-color: #f6f3ef;
    text-align: left;
    cursor: pointer;
  }
  .sidebar .description {
    text-align: left;
  }
  .logo {
    font-style: italic;
    font-weight: bold;
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
    color: black;
    margin-bottom: 10px;
  }
  .countries {
    height: 100vh;
    width: 100vw;
    display: flex;
  }

  .container {
    display: flex;
    gap: 3em;
    padding: 3em;
    flex-wrap: wrap;
    flex-direction: row;
    scroll-behavior: smooth;
    justify-content: space-around;
    word-break: break-word;
  }

  .country {
    width: 100%;
    height: 100%;
    border-radius: 1px;
    padding: 0px;
    box-shadow: #d3d2d1 0px 0px;
  }
  .cell {
    padding: 3em 1.5em 1.5em 1.5em;
  }

  .country:hover {
    box-shadow: #d3d2d1 10px 10px;
  }
  @media screen and (min-width: 800px) {
    .countries {
      flex-direction: row;
    }
    .desc_container {
      padding: 1em 3em 1em 1em;
      position: relative;
      left: 15px;
    }
    .sidebar {
      width: 25%;
      gap: 3em;
    }
  }
</style>
