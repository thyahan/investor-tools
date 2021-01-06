import React, {useState} from 'react';
import styles from './styles.module.css';
import {Drawer} from 'antd';
import Menu from 'components/Menu';
import menus from 'config/menu';
import {LeftOutlined, MenuOutlined} from '@ant-design/icons';

type Props = {
  children?: any;
};

function Layout(props: Props) {
  const {children} = props;
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);

  const handleOnRootMenuClick = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const renderDrawerFooter = () => {
    return (
      <div className="w-full bg-white text-center">
        <small className="text-gray-50">thyahan@2021</small>
      </div>
    );
  };

  return (
    <div className={styles.__layout}>
      {children}
      <div className="w-12 h-12 flex justify-center items-center fixed bottom-2 left-2 bg-blue-500 shadow-md rounded-full">
        <MenuOutlined style={{color: 'white'}} onClick={handleOnRootMenuClick} />
      </div>
      <Drawer
        {...{
          placement: 'left',
          onClose: () => setIsDrawerVisible(false),
          visible: isDrawerVisible,
          title: 'Tools',
          footer: renderDrawerFooter(),
        }}>
        <Menu menus={menus} />
      </Drawer>
    </div>
  );
}

export default Layout;
