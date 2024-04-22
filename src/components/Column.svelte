<script>
  import Tile from "./Tile.svelte";
  import { palette, magnitude, icon } from "$lib/index.js";
  export let padding;
  export let x;
  export let y;
  export let size;
  export let subreg;
  export let num;
  export let country;
  export let bg;

  let mags = magnitude(num, padding.top, padding.bottom);
</script>

{#each mags as tile, i}
  <rect
    {x}
    y={y(i)}
    width={size}
    height={size}
    fill={tile.empty ? bg : icon(tile.mag, palette(subreg)).color}
  />
{/each}

<style>
  rect {
    transition:
      x 250ms,
      y 250ms;
  }
</style>
