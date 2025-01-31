<script>
  import { fade } from "svelte/transition";
  import "../styles.css";
  import { palette } from "$lib/index.js";

  /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
  let { data, children } = $props();

  // data setup
  let summary = {
    name: data.country[0]?.destination,
    migrants: data.country?.reduce((prev, curr) => {
      let c = curr["2020"];
      let sum = prev + c;
      return sum;
    }, 0),
    countries: data.country.length,
  };

  // background setup
  let dest_subregion = data.country[0]?.dest_subregion;
  let bg = palette(dest_subregion)[7];

  // sidebar setup
  let cw = $state();
  let large = $derived(cw > 800 ? true : false);
  let open = $state(true);
  let min_w = $derived(open ? 300 : 120);
  function handleClick() {
    open = !open;
  }
</script>

<div class="layout" bind:clientWidth={cw}>
  <div class="back">
    <a href="/#gallery">
      {`< Back to countries`}
    </a>
  </div>

  <div class="sidebar">
    {#if open || large}
      <div class="cell desc" transition:fade={{ duration: 250 }}>
        <p class="name">
          {summary?.name}
        </p>
        <p class="text">welcomed</p>
        <p class="figure">
          <b>{`${summary?.migrants.toLocaleString("en-US")}`}</b>
          migrants
        </p>
        <p class="figure">
          from
          <b>{`${summary?.countries}`}</b>
          countries
        </p>
        <p class="year">in 2020</p>
      </div>
    {/if}
  </div>
  <main style={`background-color: ${bg}`}>
    {@render children()}
  </main>
</div>

<style>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column-reverse;
  }
  .name {
    font-weight: bold;
  }
  .close {
    text-align: right;
  }
  .cell {
    position: relative;
    left: 0px;
  }
  .desc {
    padding: 3em 1.5em 1.5em 1.5em;
  }
  .back {
    transition: transform 500ms;
    position: fixed;
    top: 2em;
    left: 2em;
    z-index: 999;
  }
  .back a {
    width: 100%;
    height: 100%;
    text-align: left;
    text-decoration: none;
    color: #f6f3ef;
  }
  .back a:hover {
    cursor: pointer;
    font-style: italic;
    transform: translateX(-5px);
    transition: transform 500ms;
  }
  main {
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .sidebar {
    background-color: #f6f3ef;
    padding: 1em 2em;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* .sidebar button.toggle {
    border: none;
    background-color: #f6f3ef;
    text-align: left;
    cursor: pointer;
  } */
  @media screen and (min-width: 640px) {
    .layout {
      flex-direction: row;
    }
    .cell {
      padding: 1em 3em 1em 1em;
      position: relative;
      left: 15px;
    }
    .sidebar {
      width: 25%;
      min-width: 200px;
      padding-top: 5em;
    }

    .back {
      top: 2em;
      left: 2em;
      z-index: 9999;
    }

    .back a {
      color: #3d003b;
    }
  }
</style>
