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
        viewbox: "",
        style: "",
        svg: "",
      };
    } else if (mag === "hun_tho") {
      t = {
        name: "hun_tho",
        viewbox: "",
        style: "",
        svg: "",
      };
    } else if (mag === "doz_tho") {
      t = {
        name: "doz_tho",
        viewbox: "0 0 28.6698 28.6698",
        style: `stroke: ${palette[1]};`,
        svg: `<g id="c" data-name="Layer 1">
        <line class="d" x1=".75" y1="14.33485" x2="14.3349" y2="27.9198"/>
        <line class="d" x1=".75" y1=".75" x2="27.9198" y2="27.9198"/>
        <line class="d" x1="14.3349" y1=".75" x2="27.9198" y2="14.33485"/>
        <line class="d" x1=".75" y1="14.33485" x2="14.3349" y2=".75"/>
        <line class="d" x1=".75" y1="27.9198" x2="27.9198" y2=".75"/>
        <line class="d" x1="14.3349" y1="27.9198" x2="27.9198" y2="14.33485"/>
      </g>`,
      };
    } else if (mag === "tho") {
      t = {
        name: "tho",
        viewbox: "0 0 28.6698 28.6698",
        style: `stroke: ${palette[2]};`,
        svg: `<g id="c" data-name="Layer 1">
        <line class="d" x1=".75" y1="14.33488" x2="14.3349" y2="27.9198"/>
        <line class="d" x1=".75" y1=".75" x2="27.9198" y2="27.9198"/>
        <line class="d" x1="14.3349" y1=".75" x2="27.9198" y2="14.33488"/>
      </g>`,
      };
    } else if (mag === "hun") {
      t = {
        name: "hun",
        viewbox: "",
        style: "",
        svg: "",
      };
    } else if (mag === "doz") {
      if (!invert) {
        t = {
          name: "doz_down",
          viewbox: "",
          style: "",
          svg: "",
        };
      } else {
        t = {
          name: "doz_up",
          viewbox: "",
          style: "",
          svg: "",
        };
      }
    } else if (mag === "uni") {
      t = {
        name: "uni",
        viewbox: "0 0 27.1698 27.1698",
        style: `fill: ${palette[5]};`,
        svg: `<g id="c" data-name="Layer 1">
        <polygon class="d" points="5.64065 13.58486 13.5849 5.64064 21.52915 13.58486 13.5849 21.52928 5.64065 13.58486"/>
      </g>`,
      };
    }
  }
  return t;
};
