<script>
  import * as d3 from "d3";
  import Scatterplot from "./Scatterplot.svelte";
  import "./style.css";
  import Barchart from "./Barchart.svelte";

  // data comes from the load function in +page.js
  export let data;

  // default features to visualize
  let xFeature = "strikeout";
  let yFeature = "hit";
  let colorFeature = "all_star";

  let highlightedPlayer = null;
  function onhover(player) {
    highlightedPlayer = player;
  }

  $: categories = d3
    .groupSort(
      data.dataset,
      (g) => g.length,
      (d) => d[colorFeature]
    )
    .reverse();

  $: color = d3.scaleOrdinal().domain(categories).range(d3.schemeTableau10);
</script>

<div class="container">
  <div class="main">
    <Scatterplot
      dataset={data.dataset}
      {xFeature}
      {yFeature}
      {colorFeature}
      {color}
      {highlightedPlayer}
    />
    <Barchart dataset={data.dataset} feature={colorFeature} {color} />
    <Scatterplot
      dataset={data.dataset}
      {xFeature}
      {yFeature}
      {colorFeature}
      {color}
      {highlightedPlayer}
    />
  </div>
</div>

<style>
  .container {
    /* set the font */
    font-family: system-ui, sans-serif;
    font-size: 16px;
    padding: 2em;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  .main {
    /* Use rest of vertical space not used by header */
    flex: 1;
    /* Allowing main to shrink */
    min-height: 0;
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
  }
</style>
