import React, { useEffect, useState } from 'react';
import FeaturedPackagesCarousel from './FeaturedPackagesCarousel.tsx';
import FeaturedCustomPackagesCarusel from './FeaturedCustomPackagesCarusel';

const CollectionMainComponent: React.FC = () => {
  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubscriptionType, setSelectedSubscriptionType] =
    useState<string>('');

  const [selectedSortByFilter, setSelectedSortByFilter] =
    useState<string>('more-relevants');

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Sticky bar
          const hero = document.querySelector('.collection-hero-container');
          const heroHeight = hero
            ? hero.getBoundingClientRect().bottom + window.scrollY
            : 400;
          if (window.scrollY > heroHeight - 80) {
            setShowStickyBar(true);
          } else {
            setShowStickyBar(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ================= STICKY BAR (React) ================= */}
      <section
        id="collection-sticky-bar"
        className="collection-sticky-bar-section"
        style={{
          opacity: showStickyBar ? 1 : 0,
          pointerEvents: showStickyBar ? 'auto' : 'none',
          transition: 'opacity 0.3s',
          position: 'fixed',
          top: '50px',
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: 0,
        }}
        aria-hidden={!showStickyBar}
      >
        <div className="collection-sticky-bar-section-banner">
          <div className="collection-sticky-bar-section-content">
            <span>banner</span>
          </div>
        </div>
        <div className="collection-sticky-bar-section-filter">
          <div
            className="collection-sticky-bar-section-content"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
              {/*CATEGORY SELECTOR*/}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>Category:</span>
                <select
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: '1px solid #e0e0e0',
                    fontSize: 14,
                    color: '#595959',
                  }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="marketing">Marketing</option>
                  <option value="diseño">Diseño</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="negocios">Negocios</option>
                  <option value="salud">Salud</option>
                </select>
              </div>
              {/*CATEGORY SELECTOR*/}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>Type:</span>
                <select
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: '1px solid #e0e0e0',
                    fontSize: 14,
                    color: '#595959',
                  }}
                  value={selectedSubscriptionType}
                  onChange={(e) => setSelectedSubscriptionType(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="standar-packages">Paquetes Estandar</option>
                  <option value="custom-packages">
                    Paquetes Personalizables
                  </option>
                </select>
              </div>
            </div>
            {/*SORT BY SELECTOR*/}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Sort By:</span>
              <select
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  border: '1px solid #e0e0e0',
                  fontSize: 14,
                  color: '#595959',
                }}
                value={selectedSortByFilter}
                onChange={(e) => setSelectedSortByFilter(e.target.value)}
              >
                <option value="more-relevants">Más Relevantes</option>
                <option value="lowest-price">Menor Precio</option>
                <option value="higher-price">Mayor Precio</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      {/* ================= HERO ================= */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="collection-hero-container"
      >
        <div
          style={{
            width: '100%',
            height: 'fit-content',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
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
              gap: 10,
              fontSize: '13px',
              color: '#8c8c8c',
            }}
          >
            <span style={{ color: '#1890ff' }}>Home</span>
            <img
              src="/assets/icons/right-arrow.svg"
              alt="Menu icon"
              width="14"
              height="14"
            />
            <span style={{ color: '#1890ff' }}>Collections</span>
            <img
              src="/assets/icons/right-arrow.svg"
              alt="Menu icon"
              width="14"
              height="14"
            />
            <span>Work From Essentials</span>
          </div>
        </div>
        <section
          aria-labelledby="hero-section"
          className="collection-hero-section"
        >
          <div className="collection-section-container collection-hero-section-content">
            <h1 id="hero-section">
              Complete Digital Marketing Mastery Package
            </h1>
            <p>
              A comprehensive subscription package featuring multiple learning
              paths, tools, and support levels. Choose from flexible plans
              designed to accelerate your marketing success at every stage.
            </p>
          </div>
        </section>
        <section
          aria-labelledby="filters-section"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            padding: '20px 0px',
          }}
        >
          <div
            className="collection-section-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 14,
              color: '#434343',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
              {/*CATEGORY SELECTOR*/}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>Category:</span>
                <select
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: '1px solid #e0e0e0',
                    fontSize: 14,
                    color: '#595959',
                  }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="marketing">Marketing</option>
                  <option value="diseño">Diseño</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="negocios">Negocios</option>
                  <option value="salud">Salud</option>
                </select>
              </div>
              {/*CATEGORY SELECTOR*/}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>Type:</span>
                <select
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: '1px solid #e0e0e0',
                    fontSize: 14,
                    color: '#595959',
                  }}
                  value={selectedSubscriptionType}
                  onChange={(e) => setSelectedSubscriptionType(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="standar-packages">Paquetes Estandar</option>
                  <option value="custom-packages">
                    Paquetes Personalizables
                  </option>
                </select>
              </div>
            </div>
            {/*SORT BY SELECTOR*/}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Sort By:</span>
              <select
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  border: '1px solid #e0e0e0',
                  fontSize: 14,
                  color: '#595959',
                }}
                value={selectedSortByFilter}
                onChange={(e) => setSelectedSortByFilter(e.target.value)}
              >
                <option value="more-relevants">Más Relevantes</option>
                <option value="lowest-price">Menor Precio</option>
                <option value="higher-price">Mayor Precio</option>
              </select>
            </div>
          </div>
        </section>
      </div>
      <section
        aria-labelledby="standar-packages-section"
        className="collection-section-container"
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <span>Planes destacados</span>
        <FeaturedPackagesCarousel />
      </section>
      <section
        aria-labelledby="custom-packages-section"
        className="collection-section-container"
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <span>Paquetes Personalizados destacados</span>
        <FeaturedCustomPackagesCarusel />
      </section>
    </>
  );
};

export default CollectionMainComponent;
