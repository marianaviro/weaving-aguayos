<script>
  import "../routes/styles.css";
  let { active, source, alt } = $props();
</script>

<div class={active ? "photo active" : "photo"}>
  <img src={source} {alt} />
</div>

<style>
  .photo {
    position: absolute;
    max-width: 80vw;
    display: flex;
    margin: 60px 0 0 60px;
    justify-content: center;
    align-items: center;
    z-index: 110;
    background-color: #f6f3ef;
    padding: 2em;
    border-radius: 3px;
    filter: drop-shadow(0 0 5px #47004577);
    transform: translateX(100vw);
    transition: transform 0.75s ease-in;
  }

  .photo.active {
    transform: translateX(0);
  }
  @media screen and (min-width: 800px) {
    .photo img {
      max-height: 80vh;
      max-width: 90vw;
    }

    .photo {
    }
  }
</style>
