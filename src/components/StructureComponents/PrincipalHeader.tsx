import React from 'react';

interface ComponentProps {
  containerStyles?: React.CSSProperties;
  customClassName?: string;
}

const PrincipalHeader: React.FC<ComponentProps> = ({
  containerStyles,
  customClassName,
}) => {
  return (
    <header className="header">
      <div
        className={`navbar-container default-continer ${customClassName ? customClassName : ''}`}
        style={containerStyles}
      >
        <div
          style={{
            width: 'fit-content',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            gap: 30,
          }}
        >
          <a href="/" aria-label="Inicio Suscribeme">
            <span>Suscribeme</span>
          </a>
          <a href="/">Explore</a>
          <div className="nav-search-bar-container nav-search-bar-container-principal-structure">
            <div
              className="nav-search-bar-icon-container"
              style={{ border: 'none' }}
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
              Search for anything
            </span>
          </div>
        </div>
        <nav aria-label="Navegación principal">
          <ul>
            <li>
              <a href="/search">Search</a>
            </li>
            <li>
              <a href="/categories">Categorías</a>
            </li>
            <li>
              <a href="/subscriptions">Explorar planes</a>
            </li>

            <li>
              <a href="/sellers">Vendedores</a>
            </li>
            <li>
              <a href="/login">Ingresar</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default PrincipalHeader;
