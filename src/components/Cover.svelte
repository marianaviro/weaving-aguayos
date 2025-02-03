<script>
  import "../routes/styles.css";
  import IconScroll from "./IconScroll.svelte";

  let { content, started } = $props();
</script>

<div class="cover">
  <div class="purple">
    <div class="border"></div>
    <div class="cover-container">
      <div></div>
      <p class="title">{content.title}</p>
      <p class="intro">
        {content.intro}
      </p>
      <p class="author">BY: {content.author}</p>
      <p class="data">
        Data from the <span
          ><a href={content.dataUrl} aria-labelledby={content.dataSrc}
            >{content.dataSrc}</a
          ></span
        >
      </p>
    </div>
    <div class="border"></div>
  </div>
  <div class="white">
    <IconScroll {started} />
  </div>
</div>

<style>
  .cover a:hover {
    color: #f85230;
    cursor: pointer;
  }
  .cover .white {
    display: flex;
    flex-direction: row;
    align-content: center;
    height: 14vh;
    background-color: #f5f3ef;
    justify-content: start;
  }
  .cover .border {
    margin: 0;
    padding: 0;
    height: 25px;
    background-image: url("/border-purple.svg");
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-color: #330033;
  }

  .cover .purple {
    filter: drop-shadow(0 -3 5px #470045);
    z-index: 999;
  }

  .cover .cover-container {
    padding: 1.8em 3em;
    text-align: left;
  }

  .cover p {
    padding: 0;
    pointer-events: auto;
    position: relative;
    margin: 16px 0;
  }
  .cover p a {
    color: #993399;
    font-style: italic;
    text-align: right;
  }
  .cover p.title {
    font-weight: bold;
    color: #ff6633;
    font-size: 2em;
    line-height: 1.2em;
    margin-top: 0;
  }
  .cover .intro {
    color: #f5f3ef;
    max-width: 300px;
  }
  .cover .author {
    color: #993399;
    font-size: 0.9rem;
    margin-bottom: 0;
    text-transform: uppercase;
  }

  .cover .jump {
    font-size: 0.9rem;
    color: #ff6633;
  }

  .cover .jump a {
    text-decoration: none;
  }

  .cover {
    margin: 18vh 0 0 0;
    background-color: #330033;
    width: 100%;
    height: auto;
    pointer-events: none;
    filter: drop-shadow(0 0 5px #47004577);
  }
  @media screen and (min-width: 800px) {
    .cover {
      margin: 25vh 0 0 0;
    }
    .cover .white {
      height: 10vh;
    }
  }
  @media screen and (min-width: 1200px) {
    .cover {
      margin: 25vh 0 0 0;
    }
    .cover .cover-container {
      padding: 3em 3em 3em 5em;
    }
    .cover p {
      padding: 0 2rem 0 0;
    }
    .cover .white {
      height: 20vh;
    }
  }
</style>
