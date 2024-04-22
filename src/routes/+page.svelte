<script>
  import { onMount } from "svelte";
  import "./styles.css";
  import * as d3 from "d3";
  import { palette } from "$lib/index.js";
  import Country from "../components/Country.svelte";

  export let data;
  let dataset = data.dataset;
  let groupedData = d3.group(dataset, (d) => d.destination);
  let countries = [...groupedData.keys()];

  $: selectedCountry = null;
  $: isolated = false;

  let cw;
  let ch;

  // design setup
  let paddingX = 5;
  let paddingY = 8;
  $: w = selectedCountry ? cw : 150;
  $: h = selectedCountry ? ch : 100;

  function handleClick(country) {
    let c = groupedData.get(country);
    selectedCountry = c;
    isolated = true;
  }

  function handleHover(country) {}

  function handleBack() {
    selectedCountry = null;
    isolated = true;
  }
</script>

<div
  class={selectedCountry ? "countries iso" : "countries"}
  bind:clientWidth={cw}
  bind:clientHeight={ch}
>
  <div class="container" bind:clientWidth={w}>
    {#if selectedCountry}
      <div class="menu">
        <button
          on:click={handleBack}
          style={`color: ${palette(selectedCountry.dest_subregion)[7]}`}
          >Go back</button
        >
      </div>
      <Country
        {isolated}
        name={selectedCountry[0].destination}
        dest_subregion={selectedCountry[0].dest_subregion}
        countries={selectedCountry}
        {paddingX}
        {paddingY}
        {w}
        {h}
        {handleClick}
        {handleHover}
      />
    {:else}
      {#each countries as c}
        <Country
          {isolated}
          name={c}
          dest_subregion={groupedData.get(c)[0].dest_subregion}
          countries={groupedData.get(c)}
          {paddingX}
          {paddingY}
          {w}
          {h}
          {handleClick}
          {handleHover}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .countries {
    padding: 2em;
    height: 100vh;
    width: 100vw;
    display: flex;
    gap: 2em;
  }

  .countries.iso {
    padding: 0;
  }

  .container {
    /* Use rest of vertical space not used by header */
    flex: 1;
    /* Allowing main to shrink */
    min-height: 0;
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
    flex-direction: column;
  }

  button {
    background-color: #f6f3ef;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
  }

  button:hover {
    background-color: #f6f3ef;
  }
</style>
