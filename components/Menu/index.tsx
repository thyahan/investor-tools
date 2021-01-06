import React from 'react';
import Link from 'next/link';

type Menu = {
  label: string;
  to: string;
};

type IProps = {
  menus?: Menu[];
};

const MenuComponent: React.FC<IProps> = props => {
  const {menus} = props;

  return (
    <div className="w-full">
      {menus.map(menu => {
        return (
          <div className="w-full p-4">
            <Link href={menu.to}>{menu.label}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default MenuComponent;
