import React from 'react';

interface ComponentProps {
  subscritpionType: 'standar-packages' | 'custom-packages';
  handleChangeSubscriptionType: (
    type: 'standar-packages' | 'custom-packages',
  ) => void;
}

const HeaderSearchScreen: React.FC<ComponentProps> = ({
  subscritpionType,
  handleChangeSubscriptionType,
}) => {
  return (
    <header className="search-screen-header">
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: ' #ffffff',
        }}
      >
        <div className="search-screen-section-container search-screen-header-nav-container">
          <a href="/" aria-label="Inicio Suscribeme">
            <span>Suscribeme</span>
          </a>
          <img
            onClick={() => (window.location.href = '/')}
            className="search-screen-header-navbar-responsive-logo"
            src="/assets/icons/bag-icon.svg"
            alt="Menu icon"
            width="14"
            height="14"
          />
          <div className="nav-search-bar-container">
            <div className="nav-search-bar-icon-container">
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
            <div className="nav-search-bar-button">
              <span>Search</span>
            </div>
          </div>
          <nav
            className="search-screen-header-navbar"
            aria-label="Navegación principal"
          >
            <ul>
              {/*
              <li>
                <a href="/search">Search</a>
              </li>
              <li>
                <a href="/categories">Categorías</a>
              </li>
              <li>
                <a href="/subscriptions">Explorar planes</a>
              </li>
                */}

              <li>
                <a href="/sellers">Vendedores</a>
              </li>
              <li>
                <a href="/login">Ingresar</a>
              </li>
            </ul>
          </nav>
          <img
            className="search-screen-header-navbar-responsive-logo"
            src="/assets/icons/menu.svg"
            alt="Menu icon"
            width="14"
            height="14"
          />
        </div>
      </div>
      <div className="search-screen-section-container search-screen-header-results-container">
        <div className="search-screen-header-results">
          <div
            className={`search-screen-header-result ${subscritpionType === 'standar-packages' ? 'search-screen-header-result-cta' : ''}`}
            onClick={() => {
              handleChangeSubscriptionType('standar-packages');
            }}
          >
            <span>Standar Packages</span>
          </div>
          <div
            className={`search-screen-header-result ${subscritpionType === 'custom-packages' ? 'search-screen-header-result-cta' : ''}`}
            onClick={() => {
              handleChangeSubscriptionType('custom-packages');
            }}
          >
            <span>Custom Packages</span>
          </div>
        </div>
        <div className="search-screen-filters-categories-box">
          <img
            src="/assets/icons/menu.svg"
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
      </div>
    </header>
  );
};

export default HeaderSearchScreen;
