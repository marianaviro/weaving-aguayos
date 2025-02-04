<script>
  import "./styles.css";
  import Gallery from "../components/Gallery.svelte";
  import Cover from "../components/Cover.svelte";
  import Scrolly from "../components/Scrolly.svelte";
  import Howto from "../components/Howto.svelte";
  import Photo from "../components/Photo.svelte";
  import Highlight from "../components/Highlight.svelte";

  let { data } = $props();
  let dataSrc = "UN International Migrant Stock 2020.";
  let dataUrl =
    "https://www.un.org/development/desa/pd/content/international-migrant-stock";
  let selectedCountry = $state("");
  let scrollY = $state(0); // Current scroll position
  let scrollHeight = $state(0); // Total scrollable height
  let progress = $state(0); // Scroll progress (0 to 1)
  let currentStep = $state(0);
  let started = $state(false);
  let zoom = $state(0.75);

  let device = $state("");

  // handleResize();

  // const handleZoom = (p) => {
  //   if (p < 9) {
  //     zoom = 0.75;
  //   } else if (p >= 9 && p < 13) {
  //     // zoom = 1.2;
  //     // zoom = 1.4;
  //     zoom = 0.75;
  //   } else if (p >= 13) {
  //     zoom = 0.6;
  //     // zoom = 0.75;
  //   }
  //   console.log("Zoom: " + zoom);
  // };

  const handleScroll = () => {
    let prevStep = currentStep;
    scrollY = window.scrollY;
    scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress = scrollHeight ? (scrollY / scrollHeight) * 100 : 0;
    if (progress > 2) {
      started = true;
    } else {
      started = false;
    }

    if (device === "mobile") {
      if (progress <= 1.4) {
        currentStep = 0;
      } else if (progress > 1.4 && progress <= 6.7) {
        started = true;
        currentStep = 1;
      } else if (progress > 6.7 && progress <= 17) {
        currentStep = 2;
      } else if (progress > 17 && progress <= 35) {
        currentStep = 4;
      } else {
        currentStep = 4;
      }
    } else if (device === "tablet") {
      if (progress <= 2) {
        currentStep = 0;
      } else if (progress > 2 && progress <= 10) {
        started = true;
        currentStep = 1;
      } else if (progress > 10 && progress <= 21) {
        currentStep = 2;
      } else if (progress > 21 && progress <= 35) {
        currentStep = 4;
      } else {
        currentStep = 4;
      }
    } else {
      if (progress <= 6) {
        currentStep = 0;
      } else if (progress > 6 && progress <= 18) {
        started = true;
        currentStep = 1;
      } else if (progress > 18 && progress <= 30) {
        currentStep = 2;
      } else if (progress > 33 && progress <= 35) {
        currentStep = 4;
      } else {
        currentStep = 4;
      }
      if (prevStep != currentStep) {
        console.log(currentStep);
      }
    }

    // handleZoom(progress);

    // console.log("Scroll Y: " + scrollY);
    // console.log("Scroll Height: " + scrollHeight);
    console.log("Progress: " + progress);
  };

  const handleResize = () => {
    if (window.innerWidth <= 800) {
      device = "mobile";
    } else if (window.innerWidth > 800 && window.innerWidth <= 1200) {
      device = "tablet";
    } else {
      device = "desktop";
    }
    console.log(device);
  };

  $effect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  });

  $effect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });
</script>

<article>
  <section id="scrolly">
    <div class="background">
      <div class="visual" style={"background-size: " + 80 * progress * +"vh;"}>
        <div class="left"></div>
        <div class="right">
          <Photo
            active={currentStep === 1}
            source="/collage1.jpg"
            alt="Collage of a scorpion, a couple of elderly people with blurred faces, a sweater with no one wearing it, and a letter envelope."
          />
          <Photo
            active={currentStep === 2}
            source="/collage2.jpg"
            alt="Collage of a person with a blurred face. Behind them, an assortment of different fabrics."
          />
          <Photo
            active={currentStep === 4}
            source="/collage3.jpg"
            alt="Collage of an Incan woman wearing an aguayo to carry their baby, a house, three sheeps, and a mountain range with a flower blossoming from behind."
            attr="A Peruvian woman carrying a child in an aguayo: Wfisher at the English-language Wikipedia"
            attrUrl="https://commons.wikimedia.org/wiki/File:Incan.jpg#/media/File:Incan.jpg"
          />
        </div>
      </div>
    </div>
    <div id="foreground" class="foreground">
      <div class="step-container">
        <Cover
          content={{
            title: "Aguayos",
            intro:
              "Exploring the beauty of migratory flows within Latin America and the Caribbean",
            author: "Mariana Villamizar Rodríguez",
            dataSrc,
            dataUrl,
          }}
          {started}
        />
        <Scrolly />
      </div>
    </div>
  </section>
  <Highlight
    content={"Here’s what happens when we visualize these human movements as aguayos, reframing migration as a vibrant force that nurtures uniquely diverse communities."}
  />
  <!-- <Highlight
    content={"This project is a tribute to the beauty of these weavings, to Latin America and the Caribbean, to migration."}
  /> -->
  <section id="how-to">
    <Howto {dataSrc} {dataUrl} />
  </section>
  <section id="gallery"><Gallery {data} bind:selectedCountry /></section>
  <section id="footer">
    <div class="banner">
      {"Made with 🧡 by 🇨🇴"}
    </div>
  </section>
</article>

<style>
  #footer {
    padding: 2em;
    background-color: #330033;
    color: #f6f3ef;
  }
  #scrolly {
    position: relative;
    padding: 0;
  }
  article {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
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
  }

  .step-container {
    position: relative;
    z-index: 99;
    pointer-events: none;
    padding: 5em 0 11em 0;
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
    /* pointer-events: none; */
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
    /* pointer-events: none; */
  }

  @media screen and (min-width: 800px) {
    .background {
      width: 100%;
      height: 100svh;
      position: sticky;
      /* pointer-events: none; */
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
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
