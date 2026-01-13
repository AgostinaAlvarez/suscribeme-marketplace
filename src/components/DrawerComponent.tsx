import React, { useEffect, useState } from 'react';
import '../../public/styles/drawerStyles.css';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customClassName?: string;
}

const DrawerComponent: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  customClassName,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 200); // debe coincidir con el CSS

      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!visible) return null;
  return (
    <div className={`drawer-mask ${open ? 'open' : 'close'}`} onClick={onClose}>
      <div
        className={`drawer-container ${customClassName ? customClassName : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default DrawerComponent;
