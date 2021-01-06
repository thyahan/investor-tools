interface IPrices {
  entry: number;
  tp: number;
  sl: number;
}

export function asRiskRewardRatio({entry = 0, tp = 0, sl = 0}: IPrices): number {
  return (tp - entry) / (entry - sl) || 0;
}

export function asProfitLoss(positionAmount: number, {entry = 0, tp = 0, sl = 0}: IPrices): number[] {
  return [(tp - entry) * positionAmount || 0, (entry - sl) * positionAmount || 0];
}

export function asPositionSize(risk: number, {entry = 0, tp = 0, sl = 0}: IPrices): number {
  const riskPerStock = entry - sl;
  const stockAmount = risk / riskPerStock;

  return stockAmount || 0;
}
