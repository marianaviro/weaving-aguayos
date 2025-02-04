<script>
  import "../routes/styles.css";
  let { active, source, alt, attr, attrUrl } = $props();
</script>

<div class={active ? "photo active" : "photo"}>
  <img src={source} {alt} />
  {#if attr}
    <p class="attr"><a href={attrUrl} target="_blank">{attr}.</a></p>
  {/if}
</div>

<style>
  .photo {
    position: absolute;
    /* max-width: 70vw; */
    display: flex;
    flex-direction: column;
    /* margin: 60px 0 0 60px; */
    justify-content: center;
    align-items: start;
    z-index: 110;
    background-color: #f6f3ef;
    padding: 2em;
    border-radius: 3px;
    filter: drop-shadow(0 0 5px #47004577);
    transform: translateX(100vw);
    transition: transform 0.75s ease-in-out;
  }

  .photo.active {
    transform: translateX(0);
  }
  .photo p.attr {
    margin-top: 1em;
    font-size: 0.5em;
    color: #330033;
    opacity: 0.35;
    cursor: pointer;
  }
  @media screen and (min-width: 800px) {
    .photo img {
      max-height: 80vh;
      max-width: 80vw;
    }

    .photo {
    }
  }
  @media screen and (min-width: 1200px) {
    .photo img {
      max-height: 80vh;
      max-width: 80vw;
    }

    .photo {
      /* margin: 60px 0 0 60px; */
    }
  }
</style>
