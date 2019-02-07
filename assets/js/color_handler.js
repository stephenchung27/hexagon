const blendColors = (r1, g1, b1, r2, g2, b2, balance) => {
  const bal = Math.min(Math.max(balance, 0), 1);
  const nbal = 1 - bal;
  return {
    r: Math.floor(r1 * nbal + r2 * bal),
    g: Math.floor(g1 * nbal + g2 * bal),
    b: Math.floor(b1 * nbal + b2 * bal)
  };
}

export const updateColors = (balance, color1, color2, color3) => {
  color1 = blendColors(255, 255, 0, 255, 0, 0, balance);
  color2 = blendColors(106, 106, 0, 106, 0, 0, balance);
  color3 = blendColors(81, 81, 0, 81, 0, 0, balance);

  if (balance < 1) {
    balance += 0.015;
  } else {
    balance = 0;
  }

  return [color1, color2, color3];
};