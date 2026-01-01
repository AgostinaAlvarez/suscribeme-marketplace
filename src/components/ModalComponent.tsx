import { useEffect, useState } from 'react';
import '../../public/styles/modalStyles.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ open, onClose, children }) => {
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
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
