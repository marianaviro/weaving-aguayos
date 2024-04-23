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
  let open = true;
  $: min_w = open ? 300 : 120;
  function handleClick() {
    open = !open;
    console.log(open);
  }
</script>

<div class="countries">
  <div class="sidebar">
    <div class="desc_container">
      <button class="toggle" on:click={() => handleClick()}>aguayos.wav</button>
    </div>
    <div class="desc_container">
      <p class="description">
        migration within latin american countries has been a source of
        connection between cultures that has influenced our communities in
        unique ways. migration within latin american countries has been a source
        of connection between cultures that has influenced our communities in
        unique ways.
      </p>
    </div>
    <div class="desc_container">
      <p class="data">data: UN migration stock 2020</p>
      <p class="author">author: mariana villamizar</p>
      <p class="date">apr 2024</p>
    </div>
  </div>

  <div class="container">
    {#each countries as c (c)}
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
    {/each}
  </div>
</div>

<style>
  .data,
  .author,
  .date {
    font-style: italic;
  }
  .sidebar {
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 3em;
    justify-content: start;
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
  .toggle {
    font-style: italic;
    font-weight: bold;
  }
  .desc_container {
    min-width: 300px;
  }
  a {
    padding: 40px 0px;
    text-decoration: none !important;
  }
  a p.name {
    text-decoration: none !important;
    text-decoration-style: none !important;
    color: black;
    margin-bottom: 10px;
  }
  .countries {
    padding: 2em;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    gap: 3em;
  }

  .container {
    display: flex;
    gap: 3em;
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

  .country:hover {
    box-shadow: #d3d2d1 10px 10px;
  }
  a:hover {
    font-weight: bold;
  }
  @media (max-width: 760px) {
    .countries {
      flex-direction: column;
    }
    .sidebar {
      justify-content: space-around;
    }
  }
</style>
