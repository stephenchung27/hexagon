export const blendColors = (r1, g1, b1, r2, g2, b2, balance) => {
  const bal = Math.min(Math.max(balance, 0), 1);
  const nbal = 1 - bal;
  return {
    r: Math.floor(r1 * nbal + r2 * bal),
    g: Math.floor(g1 * nbal + g2 * bal),
    b: Math.floor(b1 * nbal + b2 * bal)
  };
}

