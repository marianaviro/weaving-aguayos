<script>
  import "../styles.css";
  export let data;
  let summary = {
    name: data.country[0]?.destination,
    migrants: data.country?.reduce((prev, curr) => {
      let c = curr["2020"];
      let sum = prev + c;
      return sum;
    }, 0),
    countries: data.country.length,
  };
</script>

<div class="layout">
  <div class="sidebar">
    <div class="link">
      <a href="/">
        {`< all countries`}
      </a>
    </div>
    <div class="link">
      <p class="name">
        {summary.name}
      </p>
      <p class="text">welcomed</p>
      <p class="figure">
        <b>{`${summary.migrants.toLocaleString("en-US")}`}</b>
        migrants
      </p>
      <p class="figure">
        from
        <b>{`${summary.countries}`}</b>
        countries
      </p>
      <p class="year">in 2020</p>
    </div>
    <div class="spacer"></div>
  </div>
  <main>
    <slot />
  </main>
</div>

<style>
  .name {
    font-weight: bold;
  }
  .spacer {
    height: 10vh;
  }
  .link {
    padding: 1.5em;
    position: relative;
    left: 0px;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 200px;
  }
  .sidebar a {
    text-align: left;
    text-decoration: none;
    color: black;
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
    .link {
      padding: 1em;
      position: relative;
      left: 15px;
    }
  }
</style>
