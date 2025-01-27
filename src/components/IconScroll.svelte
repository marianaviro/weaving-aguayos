<script>
  let { started } = $props();
</script>

<div class={started ? "scroll-icon inactive" : "scroll-icon"}>
  <p>Scroll</p>
  <img class="bounce" src="/scroll-icon.svg" alt="scroll icon" />
</div>

<style>
  .scroll-icon {
    position: fixed;
    bottom: 30px;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: end;
    flex-direction: column;
    z-index: 100;
    padding-right: 30px;
  }

  .scroll-icon.inactive {
    display: none;
  }

  .scroll-icon p {
    color: white;
    font-weight: bold;
  }
  .scroll-icon .bounce {
    margin-top: 10px;
    width: 50px;
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
