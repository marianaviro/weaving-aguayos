<script>
  let { started } = $props();
</script>

<div class={started ? "scroll-icon inactive" : "scroll-icon"}>
  <p>Scroll</p>
  <img class="bounce" src="/scroll-icon-dark.svg" alt="scroll icon" />
</div>

<style>
  .scroll-icon {
    /* position: fixed;
    bottom: 30px; */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
  }

  .scroll-icon.inactive {
    display: none;
  }

  .scroll-icon p {
    color: #3d003b;
    font-weight: bold;
    font-size: 0.85em;
  }
  .scroll-icon .bounce {
    margin-top: 5px;
    width: 40px;
    animation: bounce 4s ease-in-out infinite;
  }
  .scroll-icon.inactive .bounce {
    animation: none;
  }
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    5% {
      transform: translateY(-10px);
    }
    10% {
      transform: translateY(5px);
    }
    15% {
      transform: translateY(-5px);
    }
    20% {
      transform: translateY(2px);
    }
    25% {
      transform: translateY(-2px);
    }
    30% {
      transform: translateY(1px);
    }
    35% {
      transform: translateY(-1px);
    }
  }
  @media screen and (min-width: 800px) {
    .scroll-icon {
      display: flex;
      justify-content: center;
      z-index: 100;
    }
    .bounce {
      width: 50px;
    }
  }
</style>
