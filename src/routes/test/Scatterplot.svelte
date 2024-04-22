<script>
  import * as d3 from "d3";
  import Axis from "./Axis.svelte";

  export let dataset;
  export let xFeature;
  export let yFeature;
  export let colorFeature;
  export let color;
  export let highlightedPlayer;

  const margin = { top: 35, right: 20, bottom: 50, left: 60 };

  let borderBoxSize;

  $: width = borderBoxSize
    ? Math.min(borderBoxSize[0].blockSize, borderBoxSize[0].inlineSize)
    : 400;

  $: height = borderBoxSize
    ? Math.min(borderBoxSize[0].blockSize, borderBoxSize[0].inlineSize)
    : 400;

  $: x = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => d[xFeature]))
    .range([margin.left, width - margin.right]);

  $: y = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => d[yFeature]))
    .range([height - margin.bottom, margin.top]);
</script>

<div class="scatterplot" bind:borderBoxSize>
  <svg {width} {height}>
    <g>
      {#each dataset as d}
        <circle
          cx={x(d[xFeature])}
          cy={y(d[yFeature])}
          fill={color(d[colorFeature])}
          r={3}
        />
      {/each}

      {#if highlightedPlayer}
        [colorFeature])} r={3} />
        <circle
          cx={x(highlightedPlayer[xFeature])}
          cy={y(highlightedPlayer[yFeature])}
          fill={color(highlightedPlayer[colorFeature])}
          r={6}
          stroke={"black"}
          strokeWidth={2}
        />
      {/if}
    </g>
    <Axis
      label={xFeature}
      scale={y}
      orientation={"left"}
      {width}
      {height}
      {margin}
    />
    <Axis
      label={yFeature}
      scale={x}
      orientation={"bottom"}
      {width}
      {height}
      {margin}
    />
  </svg>
</div>

<style>
  .scatterplot {
    height: 100%;
    /* Take up any available extra space */
    flex: 1;
  }
  circle {
    transition:
      cx 250ms,
      cy 250ms;
  }
</style>
