<script>
  import "../routes/styles.css";
  let current = $state(0);
  let { dataSrc, dataUrl } = $props();

  let explanation = $derived.by(() => {
    if (current === 0) {
      return {
        measure: "A country's aguayo",
        people: "shows data on the",
        action: "migrants they welcomed",
        countries: "from within the region.",
        specialtype: 1,
      };
    } else if (current === 1) {
      return {
        measure: "The columns show their",
        people: "",
        action: "",
        countries: "countries of origin",
      };
    } else if (current === 2) {
      return {
        measure: "The amplitude shows",
        people: "how many people",
        action: "migrated.",
        countries: "",
      };
    } else if (current === 3) {
      return {
        measure: "At least",
        people: "1 person",
        action: "migrated from",
        countries: "24 countries",
      };
    } else if (current === 4) {
      return {
        measure: "More than",
        people: "10 people",
        action: "migrated from",
        countries: "23 countries",
      };
    } else if (current === 5) {
      return {
        measure: "More than",
        people: "100 people",
        action: "migrated from",
        countries: "21 countries",
      };
    } else if (current === 6) {
      return {
        measure: "More than",
        people: "1,000 people",
        action: "migrated from",
        countries: "18 countries",
      };
    } else if (current === 7) {
      return {
        measure: "More than",
        people: "10,000 people",
        action: "migrated from",
        countries: "16 countries",
      };
    } else if (current === 8) {
      return {
        measure: "More than",
        people: "100,000 people",
        action: "migrated from",
        countries: "4 countries",
      };
    } else if (current === 9) {
      return {
        measure: "More than",
        people: "1,000,000 people",
        action: "migrated from",
        countries: "2 countries",
      };
    }
  });

  function toggleRight() {
    if (current === 9) {
      current = 0;
    } else {
      current++;
    }
  }

  function toggleLeft() {
    if (current === 0) {
      current = 9;
    } else {
      current--;
    }
  }
</script>

<div class="how-to">
  <div class="border"></div>
  <p class="title">How to read what's next</p>
  <p class="data">
    Source: <span
      ><a href={dataUrl} aria-labelledby={dataSrc}>{dataSrc}</a></span
    >
  </p>
  <div class="image">
    <img
      src={"/how-to/how-to-" + current + ".png"}
      alt="How to read these visualizations"
    />
  </div>
  <div class="carousel">
    <button class="toggle" onclick={toggleLeft} onkeydown={toggleLeft}>
      <img class="scroll-icon left" src="/scroll-icon.svg" alt="scroll icon" />
    </button>
    <div class="explanation">
      {#if !explanation.specialtype}
        <p class="white">{explanation.measure}</p>
        <p class="blue">{explanation.people}</p>
        <p class="white">{explanation.action}</p>
        <p class="yellow">{explanation.countries}</p>
      {:else if explanation.specialtype === 1}
        <p class="white">{explanation.measure}</p>
        <p class="white">{explanation.people}</p>
        <p class="white">{explanation.action}</p>
        <p class="white">{explanation.countries}</p>
      {:else if explanation.specialtype === 2}
        <p class="white">{explanation.measure}</p>
        <p class="white">{explanation.people}</p>
        <p class="white">{explanation.action}</p>
        <p class="white">{explanation.countries}</p>
        <p class="white">{explanation.sp1}</p>
      {/if}
    </div>
    <button class="toggle" onclick={toggleRight} onkeydown={toggleRight}>
      <img class="scroll-icon right" src="/scroll-icon.svg" alt="scroll icon" />
    </button>
  </div>
  <p class="pager">{current + 1} / 10</p>
  <div class="border"></div>
</div>

<style>
  .how-to {
    padding: 3em 1em;
    background-color: #330033;
    color: #f6f3ef;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .how-to .title {
    font-size: 1.25em;
  }

  .how-to .border {
    margin: 0;
    padding: 0;
    height: 25px;
    background-image: url("/border-orange.svg");
    background-repeat: repeat-x;
    background-size: auto 100%;
  }

  .how-to .explanation {
    width: 280px;
    height: 230px;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .how-to .carousel {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
  }

  .how-to .scroll-icon {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
  }
  .how-to .scroll-icon.left {
    transform: rotate(90deg);
    margin-left: 0.5em;
  }
  .how-to .scroll-icon.right {
    transform: rotate(-90deg);
    margin-right: 0.5em;
  }
  .how-to .toggle {
    border: none;
    background-color: transparent;
    text-align: right;
    cursor: pointer;
    font-style: normal;
  }
  .how-to .toggle:hover {
    opacity: 0.5;
  }

  .how-to .purple {
    color: #993399;
  }
  .how-to .white {
    color: #f6f3ef;
  }

  .how-to .blue {
    color: #33cccc;
    font-weight: bold;
  }
  .how-to .yellow {
    color: #ffcc66;
    font-weight: bold;
  }

  @media screen and (min-width: 800px) {
    .how-to .image {
      max-width: 600px;
    }
    .how-to .explanation {
      height: 180px;
    }
  }

  @media screen and (min-width: 1200px) {
    /* .how-to .carousel {
      align-items: center;
    }
    .how-to .scroll-icon.right {
      margin-left: 1.7em;
    }
    .how-to .scroll-icon.left {
      margin-right: 1.7em;
    }
    .how-to .image {
      max-width: 800px;
    } */
  }
</style>
