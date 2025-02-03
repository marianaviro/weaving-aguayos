<script>
  import "../routes/styles.css";
  let { content } = $props();
</script>

<div class={content.subtitle ? "step highlighted" : "step"}>
  <p class="subtitle">{content.subtitle}</p>
  <p class="body">
    {@html content.text}
  </p>
</div>

<style>
  .step {
    font-size: 1.15em;
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

  .step.highlighted {
    background-color: #330033;
  }
  .step .subtitle {
    color: #ff6633;
    font-size: 2em;
    line-height: 1.2em;
  }
  .step .body {
    color: #330033;
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
  }
</style>
