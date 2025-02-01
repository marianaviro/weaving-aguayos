<script>
  import "../routes/styles.css";
  let { content } = $props();
</script>

<div class="step">
  <p class="subtitle">{content.subtitle}</p>
  <p class="body">
    {content.text}
  </p>
</div>

<style>
  .step {
    margin-top: -80vh;
    margin: 70vh auto;
    max-width: 550px;
    width: auto;
    height: auto;
    padding: 3em;
    pointer-events: none;
    text-align: left;
    background-color: #f5f3ef;
    border-radius: 3px;
    filter: drop-shadow(0 0 5px #47004577);
  }
  .step .subtitle {
    color: #ff6633;
    font-weight: bold;
    font-size: 1.25em;
  }
  .step .body {
    color: #330033;
    font-size: 1em;
    line-height: 1.7em;
  }
  .step p {
    padding: 0;
    pointer-events: auto;
    position: relative;
    margin: 16px 0;
  }
  @media screen and (min-width: 800px) {
    .step {
      margin: 40vh 0 0 2em;
      width: 600px;
      padding: 4em;
    }

    .visual .left {
      width: 350px;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
    }

    .visual .right {
      width: calc(100% - 350px);
      height: 100%;
      position: relative;
      pointer-events: none;
    }
  }
</style>
