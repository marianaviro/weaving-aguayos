<script>
  import "./styles.css";
  import * as d3 from "d3";
  import { palette } from "$lib/index.js";
  import Gallery from "../components/Gallery.svelte";
  import Cover from "../components/Cover.svelte";
  import Step from "../components/Step.svelte";
  import IconScroll from "../components/IconScroll.svelte";
  import Photo from "../components/Photo.svelte";

  let { data } = $props();
  let selectedCountry = $state("");
  let scrollY = $state(0); // Current scroll position
  let scrollHeight = $state(0); // Total scrollable height
  let progress = $state(0); // Scroll progress (0 to 1)
  let started = $state(false);
  let zoom = $state(0.75);

  const handleZoom = (p) => {
    if (p < 9) {
      zoom = 0.75;
    } else if (p >= 9 && p < 13) {
      // zoom = 1.2;
      zoom = 1.4;
    } else if (p >= 13) {
      zoom = 0.6;
      // zoom = 0.75;
    }
    console.log("Zoom: " + zoom);
  };

  const handleScroll = () => {
    scrollY = window.scrollY;
    scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress = scrollHeight ? (scrollY / scrollHeight) * 100 : 0;
    if (progress > 0) {
      started = true;
    } else {
      started = false;
    }
    handleZoom(progress);

    console.log("Scroll Y: " + scrollY);
    console.log("Scroll Height: " + scrollHeight);
    console.log("Progress: " + progress);
  };

  $effect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<article>
  <section id="scrolly">
    <IconScroll {started} />
    <div class="background">
      <div class="visual" style={"background-size: " + 80 * zoom + "vh;"}>
        <div class="left"></div>
        <div class="right">
          <Photo
            active={progress > 1 && progress <= 6}
            source="/los-andes.jpg"
            alt="Los Andes mountain range"
          />
          <Photo
            active={progress > 6 && progress <= 9}
            source="/tradition.jpg"
            alt="Incan woman wearing an aguayo to carry their baby"
          />
        </div>
      </div>
    </div>
    <div id="foreground" class="foreground">
      <div class="step-container">
        <Cover
          content={{
            title: "When Threads Move",
            intro:
              "The beauty of migratory flows within Latin America and the Caribbean",
            author: "by Mariana Villamizar, Jan 2024",
          }}
        />
        <Step
          content={{
            subtitle: "",
            text: "On the Andean mountain range, the largest in the world and the backbone of the Americas, the Aymara people created the aguayos, a beautiful centuries-old form of storytelling through fabric.",
          }}
        />
        <Step
          content={{
            subtitle: "",
            text: "Aguayos are used for carrying babies and transporting goods, and are worn as a symbol of Andean culture.",
          }}
        />
        <Step
          content={{
            subtitle: "",
            text: "Each color, pattern, and technique used to weave an aguayo has its own meaning, resulting in hundreds of traditional designs each with its own significance.",
          }}
        />
        <Step
          content={{
            subtitle: "",
            text: "Each artisan chooses from those designs to encode their stories and those of their communities, resulting in interwoven design fabrics conveying not only the artisan's own dexterity but their traditions",
          }}
        />
        <Step
          content={{
            subtitle: "",
            text: "What if countries were fabrics? What if migration was weaving cultures? What if each migrant was a thread encoding stories, traditions, and knowledge?",
          }}
        />
        <Step
          content={{
            subtitle:
              "This project is a tribute to the beauty of these weavings, to Latin America and the Caribbean, to migration.",
            text: "",
          }}
        />
      </div>
    </div>
  </section>
  <section id="gallery"><Gallery {data} bind:selectedCountry /></section>
  <div class="header container">
    <p class="title">How to read this:</p>
    <p>
      A country’s aguayo shows the magnitude of people migrating from different
      countries of origin. Click or hover over a column to learn the exact
      number of migrants.
    </p>
  </div>
</article>

<style>
  article {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  #scrolly {
    position: relative;
    padding: 0;
  }

  .background {
    width: 100%;
    height: 100svh;
    position: sticky;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    top: 0;
    -webkit-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
    z-index: 1;
    overflow: hidden;
    pointer-events: all;
  }

  .foreground {
    pointer-events: none;
    /* width: 100%; */
    margin-top: -100vh;
    margin-left: 0;
  }

  .step-container {
    position: relative;
    z-index: 99;
    pointer-events: none;
  }

  .visual {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    position: relative;
    pointer-events: none;
    background-image: url("/home.svg");
    background-position: top left;
    transition: all 1s ease-in-out;
    -webkit-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
  }

  .visual .left {
    width: 0;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .visual .right {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    pointer-events: none;
  }

  @media screen and (min-width: 800px) {
    .foreground {
      margin-left: 2em;
    }

    .background {
      width: 100%;
      height: 100svh;
      position: sticky;
      pointer-events: none;
    }

    .visual {
      background-position: top left;
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
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
