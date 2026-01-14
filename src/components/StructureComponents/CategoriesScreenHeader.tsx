import React from 'react';

interface ComponentProps {
  containerStyles?: React.CSSProperties;
  customClassName?: string;
}

const CategoriesScreenHeader: React.FC<ComponentProps> = ({
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
      <div className="navbar-responsive-container">
        <a href="/" aria-label="Inicio Suscribeme">
          <span>Suscribeme</span>
        </a>
        <img
          className="navbar-responsive-logo"
          src="/assets/icons/white-bag.svg"
          alt="Menu icon"
          width="14"
          height="14"
          onClick={() => (window.location.href = '/')}
        />
        <div></div>

        <img
          className="navbar-responsive-menu"
          src="/assets/icons/menu.svg"
          alt="Menu icon"
          width="14"
          height="14"
        />
        <img
          className="navbar-mobile-menu"
          src="/assets/icons/white-menu.svg"
          alt="Menu icon"
          width="14"
          height="14"
        />
      </div>
    </header>
  );
};

export default CategoriesScreenHeader;
