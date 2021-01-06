import React from 'react';
import {Input} from 'antd';
import {toNumber} from 'lodash';
import {asProfitLoss, asPositionSize, asRiskRewardRatio} from './utils';

type IProps = {};

type IState = {
  stock?: {
    name: string;
    description?: string;
  };
  risk: string;
  capital: string;
  prices: {
    entry: string;
    tp: string;
    sl: string;
  };
};

const toLocalString = (value: number, decimal: number = 0) => {
  return value.toLocaleString('th-TH', {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
};

const PositionSizing: React.FC<IProps> = props => {
  const [state, setState] = React.useState<IState>({
    capital: '',
    risk: '',
    prices: {
      entry: '',
      tp: '',
      sl: '',
    },
  });

  const {capital, risk, prices} = state;

  const handleOnPriceChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      prices: {
        ...state.prices,
        [key]: e.target.value,
      },
    });
  };

  const handleOnStateChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const pricesAsNumber = {
    entry: toNumber(prices.entry),
    sl: toNumber(prices.sl),
    tp: toNumber(prices.tp),
  };

  const positionSize = Math.round(asPositionSize(toNumber(risk), pricesAsNumber));

  const riskRewardRatio = asRiskRewardRatio(pricesAsNumber);

  const riskPercent = (toNumber(risk) / toNumber(capital)) * 100 || 0;

  const [posibleProfit, posibleLose] = asProfitLoss(positionSize, pricesAsNumber);

  const results = [
    {
      title: 'Risk Reward Ratio',
      value: (
        <>
          <span className="text-gray-300">RR:1/</span>
          {`${toLocalString(riskRewardRatio)}`}
        </>
      ),
    },
    {
      title: 'Loss/Profit',
      value: (
        <>
          <span className="text-red-500">{toLocalString(posibleLose)}</span> /{' '}
          <span className="text-green-500">{toLocalString(posibleProfit)}</span>
        </>
      ),
    },
    {
      title: '% Risk',
      value: `${riskPercent.toFixed(2)}%`,
    },
    {
      title: 'Position Size',
      value: toLocalString(positionSize),
    },
  ];

  const inputProps = {
    className: 'w-full mb-2',
    inputmode: 'decimal',
    type: 'text',
    autoComplete: 'on',
  };

  const renderCapitalForm = () => {
    return (
      <div className="w-full flex felx-col md:w-3/4 p-4 mb-4 border border-gray-200 rounded-sm shadow-md">
        <label className="p-1 w-1/2 md:w-1/3" htmlFor="capital">
          <span className="font-bold">Capital amount(s)</span>
          <Input
            {...{
              ...inputProps,
              id: 'capital',
              value: capital,
              placeholder: 'Your capital amount',
              onChange: handleOnStateChange('capital'),
            }}
          />
        </label>
        <label className="p-1 w-1/2 md:w-1/3" htmlFor="risk">
          <span className="font-bold">Risk amount(s)</span>
          <Input
            {...{
              ...inputProps,
              id: 'risk',
              value: risk,
              placeholder: 'Your risk amount',
              onChange: handleOnStateChange('risk'),
            }}
          />
        </label>
      </div>
    );
  };

  const renderPriceForm = () => {
    return (
      <div className="w-full flex felx-col md:w-3/4 p-4 mb-4 border border-gray-200 rounded-sm shadow-md">
        <label className="p-1" htmlFor="entry">
          <span className="font-bold">Entry Price</span>
          <Input
            {...{
              ...inputProps,
              id: 'entry',
              value: prices.entry,
              placeholder: 'Entry price',
              onChange: handleOnPriceChange('entry'),
            }}
          />
        </label>
        <label className="p-1" htmlFor="sl">
          <span className="font-bold">Stop Loss</span>
          <Input
            {...{
              ...inputProps,
              id: 'sl',
              value: prices.sl,
              placeholder: "Stop losss's price",
              onChange: handleOnPriceChange('sl'),
            }}
          />{' '}
        </label>
        <label className="p-1" htmlFor="tp">
          <span className="font-bold">Take Profit</span>
          <Input
            {...{
              ...inputProps,
              id: 'tp',
              value: prices.tp,
              placeholder: "Tak profit's price",
              onChange: handleOnPriceChange('tp'),
            }}
          />
        </label>
      </div>
    );
  };

  const renderRR = () => {
    return (
      <div className="w-full text-base md:w-3/4 p-4 border border-gray-200 rounded-sm shadow-md flex flex-wrap">
        {results.map(({title, value}: any) => (
          <div className="flex flex-col p-4 w-1/2 md:1/4">
            <p className="text-gray-500 mb-4">{title}</p>
            <p className="font-bold text-2xl">{value}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full p-4 md:flex md:flex-col md:items-center">
      <h1 className="text-xl mb-2 font-bold">Position Sizing</h1>
      {renderCapitalForm()}
      {renderPriceForm()}
      {renderRR()}
    </div>
  );
};

export default PositionSizing;
