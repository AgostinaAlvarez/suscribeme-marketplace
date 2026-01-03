import { useEffect, useState } from 'react';
import '../../public/styles/modalStyles.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyles?: React.CSSProperties;
}

const ModalComponent: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  containerStyles,
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
    <div className={`modal-mask ${open ? 'open' : 'close'}`} onClick={onClose}>
      <div
        className="modal-container"
        style={containerStyles}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
