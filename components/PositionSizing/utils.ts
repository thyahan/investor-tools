import {toNumber} from 'lodash';

type IState = {
  risk: string;
  capital: string;
  prices: {
    entry: string;
    tp: string;
    sl: string;
  };
};

export const toLocalString = (value: number, decimal: number = 0) => {
  return value.toLocaleString('th-TH', {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
};

export function positionSizingCalculator(state: IState) {
  const stateAsNumber = {
    risk: toNumber(state.risk),
    capital: toNumber(state.capital),
    prices: {
      entry: toNumber(state.prices.entry),
      tp: toNumber(state.prices.tp),
      sl: toNumber(state.prices.sl),
    },
  };

  const {risk, capital, prices} = stateAsNumber;

  const slPoint = Math.abs(prices.entry - prices.sl) || 0;
  const tpPoint = Math.abs(prices.tp - prices.sl) || 0;

  const riskRewardRatio = tpPoint / slPoint || 0;
  const riskPercent = (risk / capital) * 100 || 0;
  const volume = risk / slPoint || 0;

  return {
    ...prices,
    slPoint,
    tpPoint,
    riskRewardRatio,
    riskPercent,
    volume,
    amount: volume * prices.entry || 0,
    profit: volume * tpPoint || 0,
    loss: volume * slPoint || 0,
  };
}
