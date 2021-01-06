import {FC} from 'react';
import Layout from 'components/Layout';

type IProps = {};

const Index: FC<IProps> = props => {
  return (
    <Layout>
      <div className="w-full h-full p-4 border border-gray-200 rounded-md shadow-md">
        <p className="text-xl text-gray-500">HELLO</p>
      </div>
    </Layout>
  );
};

export default Index;
