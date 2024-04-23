<script>
  import "../styles.css";
  export let data;
  console.log(data);
</script>

<div class="layout">
  <div class="sidebar">
    <a href="/">Go back</a>
  </div>
  <main>
    <slot />
  </main>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
  }
  main {
    flex: 1;
  }
  .sidebar {
    padding: 1em;
  }
  .sidebar a {
    text-align: left;
    text-decoration: none;
    color: black;
  }
  .sidebar:hover a {
    cursor: pointer;
    text-decoration: underline;
  }
  @media (min-width: 640px) {
    .layout {
      flex-direction: row;
    }
  }
</style>
