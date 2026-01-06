import React from 'react';

const SearchHeader: React.FC = () => {
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
          height: '60px',
          boxSizing: 'border-box',
          borderBottom: '1px solid #efefef',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px 50px',
          justifyContent: 'space-between',
        }}
      >
        <a href="/" aria-label="Inicio Suscribeme">
          <span>Suscribeme</span>
        </a>
        <div
          style={{
            width: '600px',
            boxSizing: 'border-box',
            height: '38px',
            border: '1px solid #efefef',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: 10,
            padding: '2px',
            overflow: 'hidden',
            borderRadius: 60,

            //display: 'flex',
            //alignItems: 'center',
            //padding: '0px 15px',
            //borderRadius: '5px',
            //gap: 10,
          }}
        >
          <div
            style={{
              height: '100%',
              width: 'fit-content',
              padding: '0px 15px',
              borderRight: '1px solid #efefef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/assets/icons/search.svg"
              alt="Search icon"
              width="14"
              height="14"
              style={{ cursor: 'pointer' }}
            />
          </div>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 300,
              margin: 0,
              lineHeight: 1,
            }}
          >
            Zapatillas
          </span>
          <div
            style={{
              minWidth: '100px',
              backgroundColor: '#fc6c01',
              height: '100%',
              boxSizing: 'border-box',
              borderRadius: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0px 10px',
              fontSize: 13,
              color: ' #ffffff',
              cursor: 'pointer',
            }}
          >
            <span style={{ margin: 0, lineHeight: 1 }}>Search</span>
          </div>
        </div>
        <div>nav</div>
      </div>
      <div
        style={{
          width: '100%',
          height: '50px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px 50px',
          gap: 20,
          fontSize: '13px',
          color: '#8c8c8c',
          //backgroundColor: '#f9fafb',
          backgroundColor: 'red',
          justifyContent: 'space-between',
        }}
      >
        <span>co</span>
        <div
          style={{
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            backgroundColor: 'green',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              boxSizing: 'border-box',
              gap: 5,
            }}
          >
            <img
              src="/assets/icons/white-menu.svg"
              alt="Menu icon"
              width="14"
              height="14"
              style={{ cursor: 'pointer' }}
            />
            <span>Categories</span>
            <img
              src="/assets/icons/arrow-down.svg"
              alt="Arrow Down icon"
              width="14"
              height="14"
              style={{ cursor: 'pointer' }}
            />
          </div>
          <span>|</span>
          <span>Ready to ship</span>
          <span>Personal Protective</span>
          <span>Buyer Central</span>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
