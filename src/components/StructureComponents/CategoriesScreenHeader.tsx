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
    </header>
  );
};

export default CategoriesScreenHeader;
