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

export const texture = (mag, palette, invert) => {
  let t = {};
  if (mag) {
    if (mag === "mil") {
      t = {
        name: "mil",
        style: `fill: ${palette[1]};`,
        svg: `<polygon class="d" points="0 13.58 13.58 0 27.17 13.58 13.58 27.17 0 13.58"/>`,
      };
    } else if (mag === "tho") {
      t = {
        name: "hun_tho",
        style: `stroke: ${palette[2]}; fill: none;`,
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
    } else if (mag === "hun_tho") {
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
    } else if (mag === "doz") {
      if (!invert) {
        t = {
          name: "doz_down",
          style: `fill: ${palette[6]};`,
          svg: `<g>
          <rect class="e" x=".75" y=".75" width="25.67" height="12.08"/>
          <path class="e" d="M25.67,1.5v10.58H1.5V1.5h24.17M27.17,0H0v13.58h27.17V0h0Z"/>
        </g>
        <line class="d" x1="27.17" y1="26.38" x2="0" y2="26.38"/>`,
        };
      } else {
        t = {
          name: "doz_up",
          style: `fill: ${palette[5]};`,
          svg: `<g>
          <rect class="e" x=".75" y="14.29" width="25.67" height="12.08"/>
          <path class="e" d="M25.67,15.04v10.58H1.5v-10.58h24.17M27.17,13.54H0v13.58h27.17v-13.58h0Z"/>
        </g>
        <line class="d" y1=".75" x2="27.17" y2=".75"/>`,
        };
      }
    } else if (mag === "hun") {
      t = {
        name: "hun",
        style: `fill: ${palette[5]};`,
        svg: `<polygon class="d" points="5.64 13.58 13.58 5.64 21.53 13.58 13.58 21.53 5.64 13.58"/>`,
      };
    } else if (mag === "uni") {
      t = {
        name: "uni",
        style: `fill: ${palette[5]};`,
        svg: `<g>
        <polygon class="d" points=".75 2.71 7.28 13.58 .75 24.46 .75 2.71"/>
        <path class="d" d="M1.5,5.42l4.9,8.17L1.5,21.75V5.42M0,0v27.17l8.15-13.58L0,0h0Z"/>
      </g>
      <g>
        <polygon class="d" points="19.89 13.58 26.42 2.71 26.42 24.46 19.89 13.58"/>
        <path class="d" d="M25.67,5.42v16.34l-4.9-8.17,4.9-8.17M27.17,0l-8.15,13.58,8.15,13.58V0h0Z"/>
      </g>`,
      };
    }
  }
  return t;
};
