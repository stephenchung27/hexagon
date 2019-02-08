export let color1, color2, color3;

let balance = 0;

const blendColors = (r1, g1, b1, r2, g2, b2, balance) => {
  const bal = Math.min(Math.max(balance, 0), 1);
  const nbal = 1 - bal;

  const red = Math.floor(r1 * nbal + r2 * bal);
  const green = Math.floor(g1 * nbal + g2 * bal);
  const blue = Math.floor(b1 * nbal + b2 * bal);

  return "rgb(" + red + "," + green + "," + blue + ")";
}

export const updateColors = () => {
  color1 = blendColors(255, 255, 0, 255, 0, 0, balance);
  color2 = blendColors(106, 106, 0, 106, 0, 0, balance);
  color3 = blendColors(81, 81, 0, 81, 0, 0, balance);

  if (balance < 1) {
    balance += 0.015;
  } else {
    balance = 0;
  }
};

export const setToStartingColors = () => {
  color1 = "rgb(" + 255 + "," + 0 + "," + 0 + ")";
  color2 = "rgb(" + 106 + "," + 0 + "," + 0 + ")";
  color3 = "rgb(" + 81 + "," + 0 + "," + 0 + ")";
}