<script>
  import "../routes/styles.css";
  let current = $state(0);

  let explanation = $derived.by(() => {
    if (current === 0) {
      return {
        measure: "A country's aguayo",
        people: "shows data on the",
        action: "migrants they welcomed",
        countries: "from Latin American",
        sp1: "and Caribbean countries",
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
  <div class="carousel">
    <button class="toggle" onclick={toggleLeft} onkeydown={toggleLeft}>
      <img class="scroll-icon left" src="/scroll-icon.svg" alt="scroll icon" />
    </button>
    <div class="content">
      <div class="image">
        <img
          src={"/how-to/how-to-" + current + ".png"}
          alt="How to read these visualizations"
        />
      </div>

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
          <p class="white">{explanation.sp1}</p>
        {:else if explanation.specialtype === 2}
          <p class="white">{explanation.measure}</p>
          <p class="white">{explanation.people}</p>
          <p class="white">{explanation.action}</p>
          <p class="white">{explanation.countries}</p>
          <p class="white">{explanation.sp1}</p>
        {/if}
      </div>
    </div>
    <button class="toggle" onclick={toggleRight} onkeydown={toggleRight}>
      <img class="scroll-icon right" src="/scroll-icon.svg" alt="scroll icon" />
    </button>
  </div>
  <p class="pager">{current + 1} / 10</p>
</div>

<style>
  .how-to {
    padding: 3em 0.5em;
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

  .how-to .content {
    /* width: 80vw; */
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    min-height: 500px;
  }

  .how-to .border {
    margin: 0;
    padding: 0;
    height: 25px;
    background-image: url("/border.svg");
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-color: #330033;
  }

  .how-to .explanation {
    margin: auto 2em;
    margin-top: 2em;
    width: 300px;
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

  .how-to .carousel {
    display: flex;
    flex-direction: row;
    align-items: start;
    min-height: 450px;
  }

  .how-to .carousel .image {
    max-width: 600px;
    width: 100%;
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
    margin: auto 0;
  }
  .how-to .toggle:hover {
    opacity: 0.5;
  }
  @media screen and (min-width: 800px) {
    .how-to .content {
      flex-direction: row;
      min-width: 500px;
      min-height: 500px;
      justify-content: stretch;
      margin: 0 auto;
    }
    .how-to .carousel {
      align-items: center;
    }
    .how-to .scroll-icon.right {
      margin-right: 0.7em;
      margin-left: 1.7em;
    }
    .how-to .scroll-icon.left {
      margin-left: 0.7em;
      margin-right: 1.7em;
    }
    .how-to .image {
      margin: auto;
    }
    .how-to .explanation {
      margin: auto 2em;
    }
  }
</style>
