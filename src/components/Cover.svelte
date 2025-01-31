<script>
  import "../routes/styles.css";
  import IconScroll from "./IconScroll.svelte";

  let { content, started } = $props();
</script>

<div class="cover">
  <div class="purple">
    <div class="border"></div>
    <div class="cover-container">
      <p class="title">{content.title}</p>
      <p class="intro">
        {content.intro}
      </p>
      <p class="author">{content.author}</p>
    </div>
    <div class="border"></div>
  </div>
  <div class="white"><IconScroll {started} /></div>
</div>

<style>
  .cover .white {
    display: flex;
    flex-direction: row;
    align-content: center;
    height: 25vh;
    background-color: #f5f3ef;
  }
  .cover .border {
    margin: 0;
    padding: 0;
    height: 25px;
    background-image: url("/border.svg");
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-color: #3d003b;
  }

  .cover .purple {
    filter: drop-shadow(0 -3 5px #470045);
    z-index: 999;
  }

  .cover .cover-container {
    padding: 3rem;
    text-align: left;
  }
  .cover {
    margin: 35vh auto;
    background-color: #3d003b;
    width: 100vw;
    height: auto;
    pointer-events: none;
    filter: drop-shadow(0 0 5px #47004577);
  }

  .cover p {
    padding: 0;
    pointer-events: auto;
    position: relative;
    margin: 16px 0;
  }
  .cover .title {
    font-weight: bold;
    color: #f85230;
    font-size: 1.5rem;
  }
  .cover .intro {
    color: #f5f3ef;
    font-size: 1rem;
    max-width: 350px;
  }
  .cover .author {
    color: #88419d;
    font-size: 1rem;
  }
  @media screen and (min-width: 800px) {
    .cover {
      margin: 35vh 0 0 -2em;
    }
    .cover .cover-container {
      padding: 3em 3em 3em 5em;
    }
    .cover p {
      padding: 0 2rem 0 0;
    }
  }
</style>
