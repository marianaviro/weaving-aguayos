<script>
  import "../routes/styles.css";
  let { content } = $props();
</script>

<section id="highlight">
  <div class="border"></div>
  <div class="banner">
    {"This project is a tribute to the beauty of these weavings, to diversity, to Latin America and the Caribbean, to migration."}
  </div>
  <div class="border"></div>
</section>

<style>
  #highlight {
    background-color: #ff6633;

    filter: drop-shadow(0 0 5px #47004577);
    width: 100%;
  }
  #highlight .banner {
    font-size: 2em;
    max-width: 650px;
  }

  .banner {
    padding: 3em 2em;
    pointer-events: none;
    color: #3d003b;
  }

  #highlight .border {
    margin: 0;
    padding: 0;
    height: 25px;
    background-image: url("/border-purple.svg");
    background-repeat: repeat-x;
    background-size: auto 100%;
  }
</style>
