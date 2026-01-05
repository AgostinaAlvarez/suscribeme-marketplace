import React from 'react';

const CollectionHeader: React.FC = () => {
  return (
    <header
      style={{
        width: '100%',
        height: 'fit-content',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: ' #ffffff',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 'fit-content',
          boxSizing: 'border-box',
          borderBottom: '1px solid #efefef',
        }}
      >
        <div
          style={{
            width: '1200px',
            margin: '0px auto',
            height: '50px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a href="/" aria-label="Inicio Suscribeme">
            <span>Suscribeme</span>
          </a>
          <div>nav</div>
        </div>
      </div>
    </header>
  );
};

export default CollectionHeader;
