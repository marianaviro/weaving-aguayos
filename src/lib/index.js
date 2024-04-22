export const palette = (subreg) => {
  let palette = [];
  if (subreg === "South America") {
    palette[0] = "#990000";
    palette[1] = "#d7301f";
    palette[2] = "#ef6548";
    palette[3] = "#fc8d59";
    palette[4] = "#fdbb84";
    palette[5] = "#fdd49e";
    palette[6] = "#fef0d9";
    palette[7] = "#4e0000";
  } else if (subreg === "Central America") {
    palette[0] = "#08589e";
    palette[1] = "#2b8cbe";
    palette[2] = "#4eb3d3";
    palette[3] = "#7bccc4";
    palette[4] = "#a8ddb5";
    palette[5] = "#ccebc5";
    palette[6] = "#f0f9e8";
    palette[7] = "#3d003b";
  } else {
    palette[0] = "#6e016b";
    palette[1] = "#88419d";
    palette[2] = "#8c6bb1";
    palette[3] = "#8c96c6";
    palette[4] = "#9ebcda";
    palette[5] = "#bfd3e6";
    palette[6] = "#edf8fb";
    palette[7] = "#002239";
  }
  return palette;
};

export const magnitude = (num, ptop, pbottom) => {
  // setup magnitudes
  let ms = ["uni", "doz", "hun", "tho", "doz_tho", "hun_tho", "mil"];
  let ms_inv = ["mil", "hun_tho", "doz_tho", "tho", "hun", "doz"];

  // extract magnitude of num
  let snum = num + "";
  let pos = snum.length;

  // setup length of matrix
  let amp = ms.length + ms_inv.length;
  let l = ptop + amp + pbottom;
  let upperBound = ptop + ms_inv.length;
  let lowerBound = ptop + amp;

  let mags = [];
  for (let i = 0; i < l; i++) {
    if (i < ptop) {
      mags[i] = { "mag": "pad", "empty": true };
    } else if (ptop <= i && i < upperBound) {
      let j = i - ptop;
      mags[i] = {
        "mag": ms_inv[i - ptop],
        "empty": j < 7 - pos,
      };
    } else if (upperBound <= i && i < lowerBound) {
      mags[i] = {
        "mag": ms[i - upperBound],
        "empty": !(i - upperBound < pos),
      };
    } else if (lowerBound <= i && i < l) {
      mags[i] = { "mag": "pad", "empty": true };
    }
  }
  return mags;
};

export const icon = (mag, palette) => {
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
  return { icon, "color": bg2 };
};

export const texture = (mag, palette, subreg) => {
  let t = {};
  if (mag) {
    if (mag === "mil") {
      t = {
        name: "mil",
        style: `fill: ${palette[1]};`,
        svg: `<polygon class="d" points="0 13.58 13.58 0 27.17 13.58 13.58 27.17 0 13.58"/>`,
      };
    } else if (mag === "hun_tho") {
      t = {
        name: "hun_tho",
        style: `stroke: ${palette[0]}; fill: none;`,
        svg: `<line class="d" x1=".75" y1="14.33" x2="14.33" y2="27.92"/>
        <line class="d" x1=".75" y1=".75" x2="27.92" y2="27.92"/>
        <line class="d" x1="14.33" y1=".75" x2="27.92" y2="14.33"/>`,
      };
    } else if (mag === "doz_tho") {
      t = {
        name: "doz_tho",
        style: `stroke: ${palette[1]};`,
        svg: `<line class="d" x1=".75" y1="14.33" x2="14.33" y2="27.92"/>
        <line class="d" x1=".75" y1=".75" x2="27.92" y2="27.92"/>
        <line class="d" x1="14.33" y1=".75" x2="27.92" y2="14.33"/>
        <line class="d" x1=".75" y1="14.33" x2="14.33" y2=".75"/>
        <line class="d" x1=".75" y1="27.92" x2="27.92" y2=".75"/>
        <line class="d" x1="14.33" y1="27.92" x2="27.92" y2="14.33"/>`,
      };
    } else if (mag === "tho") {
      t = {
        name: "tho",
        style: `stroke: ${palette[2]};`,
        svg: `<line class="d" x1="14.33" y1=".75" x2="27.92" y2="14.33"/>
        <line class="d" x1=".75" y1="14.33" x2="14.33" y2=".75"/>
        <line class="d" x1=".75" y1="14.33" x2="14.33" y2="27.92"/>
        <line class="d" x1="7.54" y1=".75" x2="27.92" y2="21.13"/>
        <line class="d" x1=".75" y1="7.54" x2="21.13" y2="27.92"/>
        <line class="d" x1="27.92" y1="7.54" x2="7.54" y2="27.92"/>
        <line class="d" x1="21.13" y1=".75" x2=".75" y2="21.13"/>
        <line class="d" x1=".75" y1=".75" x2="27.92" y2="27.92"/>
        <line class="d" x1=".75" y1="27.92" x2="27.92" y2=".75"/>
        <line class="d" x1="14.33" y1="27.92" x2="27.92" y2="14.33"/>`,
      };
    } else if (mag === "hun") {
      t = {
        name: "hun",
        style: `fill: ${palette[3]};`,
        svg: `<rect class="d" x=".75" y=".75" width="27.17" height="13.58"/>`,
      };
    } else if (mag === "doz") {
      t = {
        name: "doz",
        style: `fill: ${palette[1]};`,
        svg: ``,
      };
    } else if (mag === "uni") {
      t = {
        name: "uni",
        style: `fill: ${palette[4]};`,
        svg: `<path class="d" d="M.75.75l8.15,13.58L.75,27.92V.75Z"/>
        <path class="d" d="M27.92.75l-8.15,13.58,8.15,13.58V.75Z"/>`,
      };
    } else if (mag === "border") {
      if (subreg === "South America") {
        t = {
          name: "border",
          style: ``,
          svg: ` <rect width="27.17" height="27.17" style="fill: #900; stroke-width: 0px;"/>
          <polygon points="20.58 10.64 16.53 10.64 16.53 6.58 10.64 6.58 10.64 10.64 6.58 10.64 6.58 16.53 10.64 16.53 10.64 20.58 16.53 20.58 16.53 16.53 20.58 16.53 20.58 10.64" style="fill: #ef6548; stroke-width: 0px;"/>
          <rect x="12.08" y="12.08" width="3" height="3" style="fill: #900; stroke-width: 0px;"/>
          <rect x="16.58" y="3.58" width="3" height="3" style="fill: #fdd49e; stroke-width: 0px;"/>
          <rect x="7.58" y="20.58" width="3" height="3" style="fill: #fdd49e; stroke-width: 0px;"/>
          <rect x="3.58" y="16.58" width="3" height="3" style="fill: #fdd49e; stroke-width: 0px;"/>
          <rect x="3.58" y="20.58" width="3" height="3" style="fill: #fdd49e; stroke-width: 0px;"/>
          <rect x="20.58" y="7.58" width="3" height="3" style="fill: #fdd49e; stroke-width: 0px;"/>
          <rect x="20.58" y="3.58" width="3" height="3" style="fill: #fdd49e; stroke-width: 0px;"/>`,
        };
      } else if (subreg === "Central America") {
        t = {
          name: "border",
          style: ``,
          svg: `<rect width="27.17" height="27.17" style="fill: #08589e; stroke-width: 0px;"/>
          <rect x="3.58" y="7.58" width="3" height="3" style="fill: #2b8cbe; stroke-width: 0px;"/>
          <rect x="3.58" y="12.08" width="3" height="3" style="fill: #ccebc5; stroke-width: 0px;"/>
          <rect x="7.58" y="3.58" width="3" height="3" style="fill: #2b8cbe; stroke-width: 0px;"/>
          <rect x="12.08" y="3.58" width="3" height="3" style="fill: #ccebc5; stroke-width: 0px;"/>
          <rect x="16.58" y="3.58" width="3" height="3" style="fill: #2b8cbe; stroke-width: 0px;"/>
          <rect x="7.58" y="20.58" width="3" height="3" style="fill: #2b8cbe; stroke-width: 0px;"/>
          <rect x="16.58" y="20.58" width="3" height="3" style="fill: #2b8cbe; stroke-width: 0px;"/>
          <rect x="20.58" y="12.08" width="3" height="3" style="fill: #ccebc5; stroke-width: 0px;"/>
          <rect x="3.58" y="16.58" width="3" height="3" style="fill: #2b8cbe; stroke-width: 0px;"/>
          <rect x="12.08" y="20.58" width="3" height="3" style="fill: #ccebc5; stroke-width: 0px;"/>
          <rect x="20.58" y="7.58" width="3" height="3" style="fill: #2b8cbe; stroke-width: 0px;"/>
          <rect x="20.58" y="16.58" width="3" height="3" style="fill: #2b8cbe; stroke-width: 0px;"/>
          <rect x="7.58" y="7.58" width="12" height="12" style="fill: #7bccc4; stroke-width: 0px;"/>
          <rect x="15.08" y="15.08" width="3" height="3" style="fill: #08589e; stroke-width: 0px;"/>
          <rect x="15.08" y="9.08" width="3" height="3" style="fill: #08589e; stroke-width: 0px;"/>
          <rect x="9.08" y="9.08" width="3" height="3" style="fill: #08589e; stroke-width: 0px;"/>
          <rect x="9.08" y="14.83" width="3" height="3" style="fill: #08589e; stroke-width: 0px;"/>
          <rect x="12.08" y="12.08" width="3" height="3" style="fill: #08589e; stroke-width: 0px;"/>`,
        };
      } else {
        t = {
          name: "border",
          style: ``,
          svg: `<rect width="27.17" height="27.17" style="fill: #6e016b; stroke-width: 0px;"/>
          <rect x="10.58" y="10.58" width="6" height="6" style="fill: #8c96c6; stroke-width: 0px;"/>
          <rect x="3.58" y="7.58" width="3" height="3" style="fill: #88419d; stroke-width: 0px;"/>
          <rect x="7.58" y="3.58" width="3" height="3" style="fill: #88419d; stroke-width: 0px;"/>
          <rect x="3.58" y="3.58" width="3" height="3" style="fill: #bfd3e6; stroke-width: 0px;"/>
          <rect x="7.58" y="7.58" width="3" height="3" style="fill: #bfd3e6; stroke-width: 0px;"/>
          <rect x="16.58" y="7.58" width="3" height="3" style="fill: #88419d; stroke-width: 0px;"/>
          <rect x="7.58" y="16.58" width="3" height="3" style="fill: #88419d; stroke-width: 0px;"/>
          <rect x="16.58" y="16.58" width="3" height="3" style="fill: #bfd3e6; stroke-width: 0px;"/>
          <rect x="16.58" y="20.58" width="3" height="3" style="fill: #88419d; stroke-width: 0px;"/>
          <rect x="20.58" y="20.58" width="3" height="3" style="fill: #bfd3e6; stroke-width: 0px;"/>
          <rect x="20.58" y="16.58" width="3" height="3" style="fill: #88419d; stroke-width: 0px;"/>`,
        };
      }
    }
  }
  return t;
};
