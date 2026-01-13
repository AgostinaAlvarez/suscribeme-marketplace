import { useEffect, useState } from 'react';
import '../../public/styles/modalStyles.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyles?: React.CSSProperties;
  customClassName?: string;
  customMaskClassName?: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  containerStyles,
  customClassName,
  customMaskClassName,
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
    <div
      className={`modal-mask ${customMaskClassName ? customMaskClassName : ''} ${open ? 'open' : 'close'}`}
      onClick={onClose}
    >
      <div
        className={`modal-container ${customClassName ? customClassName : ''}`}
        style={containerStyles}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
