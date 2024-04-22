<script>
  //   export let row;
  //   export let col;
  export let empty;
  export let mag;
  export let palette;
  export let bg;
  export let x;
  export let y;
  export let width;
  export let height;

  let bg2;
  let icon;

  if (palette && mag) {
    if (mag == "mil") {
      bg2 = palette[0];
      icon = "caribbean.svg";
    } else if (mag === "hun_tho") {
      bg2 = palette[1];
      icon = "caribbean.svg";
    } else if (mag === "doz_tho") {
      bg2 = palette[2];
      icon = "caribbean.svg";
    } else if (mag === "tho") {
      bg2 = palette[3];
      icon = "caribbean.svg";
    } else if (mag === "hun") {
      bg2 = palette[4];
      icon = "caribbean.svg";
    } else if (mag === "doz") {
      bg2 = palette[5];
      icon = "caribbean.svg";
    } else if (mag === "uni") {
      bg2 = palette[6];
      icon = "caribbean.svg";
    } else {
      bg2 = palette[7];
      icon = "caribbean.svg";
    }
  }
  let bg3 = empty ? bg : bg2;
</script>

<rect
  x={x + "px"}
  y={y + "px"}
  {width}
  {height}
  style={`background-color: ${bg3};`}
  fill={bg3}
/>

<style>
  rect {
    transition:
      x 250ms,
      y 250ms;
  }
</style>
