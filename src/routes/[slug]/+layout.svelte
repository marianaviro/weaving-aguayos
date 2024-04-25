<script>
  import { fade } from "svelte/transition";
  import "../styles.css";
  export let data;

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

  // sidebar setup
  let cw;
  $: large = cw > 800 ? true : false;
  let open = true;
  $: min_w = open ? 300 : 120;
  function handleClick() {
    open = !open;
  }
</script>

<div class="layout" bind:clientWidth={cw}>
  <div class="sidebar">
    <div class="cell link">
      <a href="/">
        {`< all countries`}
      </a>
    </div>
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
    {#if !large}
      <div class="cell close">
        <button class="toggle" on:click={() => handleClick()}
          >{`[${open ? "close x" : "info +"}]`}</button
        >
      </div>
    {/if}
  </div>
  <main>
    <slot />
  </main>
</div>

<style>
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
  .link {
    transition: transform 500ms;
  }
  .link a {
    width: 100%;
    height: 100%;
  }
  .layout {
    display: flex;
    flex-direction: column;
  }
  main {
    flex: 1;
    overflow-x: hidden;
  }
  .sidebar {
    background-color: #f6f3ef;
    padding: 2em;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .sidebar a {
    text-align: left;
    text-decoration: none;
    color: black;
  }
  .sidebar button.toggle {
    border: none;
    background-color: #f6f3ef;
    text-align: left;
    cursor: pointer;
  }
  .link:hover {
    cursor: pointer;
    font-style: italic;
    transform: translateX(-5px);
    transition: transform 500ms;
  }
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
    }
  }
</style>
