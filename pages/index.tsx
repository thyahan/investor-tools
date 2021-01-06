import {FC} from 'react';

type IProps = {};

const Index: FC<IProps> = props => {
  return (
    <div className="w-full h-full p-4 border border-gray-200 rounded-md shadow-md">
      <p className="text-xl text-gray-500">HELLO</p>
    </div>
  );
};

export default Index;
