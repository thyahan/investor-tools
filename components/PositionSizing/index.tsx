import React from 'react';
import {Input} from 'antd';
import {ExportOutlined} from '@ant-design/icons';
import {toNumber} from 'lodash';
import {positionSizingCalculator, toLocalString} from './utils';
import {toPng} from 'html-to-image';
import download from 'downloadjs';

type IProps = {};

type IState = {
  symbol: string;
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

const PositionSizing: React.FC<IProps> = props => {
  const [state, setState] = React.useState<IState>({
    symbol: '',
    capital: '',
    risk: '',
    prices: {
      entry: '',
      tp: '',
      sl: '',
    },
  });

  const {symbol, capital, risk, prices} = state;

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

  const positionSize = positionSizingCalculator(state);

  const {entry, sl, tp} = positionSize;

  const results = [
    {
      title: 'Stock Symbol',
      value: <span className="font-bold">{symbol}</span>,
    },
    {
      title: 'Entry/SL/TP',
      value: `${toLocalString(entry, 2)}/${toLocalString(sl, 2)}/${toLocalString(tp, 2)}`,
    },
    {
      title: 'Risk Reward Ratio',
      value: (
        <span className="font-bold">
          <span className="text-gray-300">RR:1/</span>
          {`${toLocalString(positionSize.riskRewardRatio)}`}
        </span>
      ),
    },
    {
      title: `Loss / Profit (Single stock)`,
      value: <span>{`${toLocalString(positionSize.slPoint, 2)} / ${toLocalString(positionSize.tpPoint, 2)}`}</span>,
    },
    {
      title: `Loss / Profit`,
      value: (
        <>
          <span>{toLocalString(positionSize.loss)}</span> / <span>{toLocalString(positionSize.profit)}</span>
        </>
      ),
    },
    {
      title: '% Risk',
      value: `${toLocalString(positionSize.riskPercent, 2)}%`,
    },
    {
      title: 'Position volume',
      value: toLocalString(positionSize.volume),
    },
    {
      title: 'Position amount',
      value: <span className="font-bold">{toLocalString(positionSize.amount, 2)}</span>,
    },
  ];

  const inputProps = {
    className: 'w-full mb-2',
    inputmode: 'decimal',
    type: 'text',
    autoComplete: 'on',
  };

  const renderSaveImage = () => {
    return (
      <ExportOutlined
        onClick={() => {
          const elem = document.getElementById('img-card');
          const date = new Date();
          const filename = date.getFullYear() + date.getMonth() + date.getDate() + date.getTime() + '.png';
          toPng(elem).then(data => download(data, filename));
        }}
      />
    );
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

  const renderSymbol = () => {
    return (
      <div className="w-full flex felx-col md:w-3/4 p-4 mb-4 border border-gray-200 rounded-sm shadow-md">
        <label className="p-1 w-full sm:w:1/2 md:w-1/3" htmlFor="symbol">
          <span className="font-bold">Stock Symbol</span>
          <Input
            {...{
              ...inputProps,
              id: 'symbol',
              value: symbol,
              placeholder: 'Stock symbol',
              onChange: (e: any) => setState({...state, symbol: e.target.value.toUpperCase()}),
            }}
          />
        </label>
      </div>
    );
  };

  const renderRR = () => {
    return (
      <div
        id="img-card"
        className="w-full bg-white text-base md:w-3/4 p-4 border border-gray-200 rounded-sm shadow-md flex flex-wrap">
        <div className="w-full text-right">{renderSaveImage()}</div>
        {results.map(({title, value}: any) => (
          <div className={`w-full flex px-2 mb-1`}>
            <p className="text-gray-500 mb-1 w-1/2 text-right pr-4">{title}</p>
            <p className="">{value}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full p-4 md:flex md:flex-col md:items-center">
      <h1 className="text-xl mb-2 font-bold">Position Sizing</h1>
      {renderCapitalForm()}
      {renderSymbol()}
      {renderPriceForm()}
      {renderRR()}
    </div>
  );
};

export default PositionSizing;
