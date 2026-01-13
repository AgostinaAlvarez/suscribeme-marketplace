import React, { useEffect, useState } from 'react';

interface CustomPackageData {
  _id: string;
}

const products: { imageUrl: string }[] = [
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/6d442ee1f2-8a606d81ec00a1efbd03.png',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/160c4ddaf6-5a555f543befeebf3495.png',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/2b820703f6-dd91c6c4c1374fda7a40.png',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/fd7b3621ed-6618d9f426da27b07c77.png',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/2167e4c7d0-baf0f55b5307d6e1bd16.png',
  },
];

const FeaturedCustomPackagesScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const packages: CustomPackageData[] = [
    {
      _id: '1',
    },
    {
      _id: '2',
    },
    {
      _id: '3',
    },
    {
      _id: '4',
    },
    {
      _id: '5',
    },
    {
      _id: '6',
    },
    {
      _id: '7',
    },
    {
      _id: '8',
    },
  ];

  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubscriptionType, setSelectedSubscriptionType] =
    useState<string>('');

  const [selectedSortByFilter, setSelectedSortByFilter] =
    useState<string>('more-relevants');

  const [priceRangeFilter, setPriceRangeFilter] = useState<
    (number | undefined)[]
  >([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Sticky bar
          const hero = document.querySelector(
            '.featured-screen-hero-container',
          );
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
        id="featured-screen-sticky-bar"
        className="featured-screen-sticky-bar-section"
        style={{
          opacity: showStickyBar ? 1 : 0,
          pointerEvents: showStickyBar ? 'auto' : 'none',
          transition: 'opacity 0.3s',
          position: 'fixed',
          top: '60px',
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: 0,
        }}
        aria-hidden={!showStickyBar}
      >
        <div className="featured-screen-sticky-bar-section-banner">
          <div
            //className="featured-screen-sticky-bar-section-content"
            //style={{ backgroundColor: 'pink' }}
            className="featured-screen-section-container"
          >
            <span>banner</span>
          </div>
        </div>
        <div className="featured-screen-sticky-bar-section-filter">
          <div className="featured-screen-section-container featured-screen-sticky-bar-section-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
              {/*CATEGORY SELECTOR*/}
              <div className="featured-screen-filters-section">
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
              <div className="featured-screen-filters-section">
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
        className="featured-screen-hero-container"
      >
        <div
          style={{
            width: '100%',
            height: 'fit-content',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
          }}
        >
          <div className="featured-screen-section-container featured-screen-hero-nav">
            <span style={{ color: '#1890ff' }}>Home</span>
            <img
              src="/assets/icons/right-arrow.svg"
              alt="Menu icon"
              width="14"
              height="14"
            />

            <span>Featured Custom Packages</span>
          </div>
        </div>
        <section
          aria-labelledby="hero-section"
          className="featured-screen-hero-section"
        >
          <div className="featured-screen-section-container featured-screen-hero-section-content">
            <h1 id="hero-section">Featured Custom Packages</h1>
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
            className="featured-screen-section-container"
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
              <div className="featured-screen-filters-section">
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
              {/*TYPE SELECTOR*/}
              <div className="featured-screen-filters-section">
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
      {/* ================= SECTIONS ================= */}
      <section
        aria-labelledby="standar-plans-section"
        className="featured-screen-section-container featured-screen-grid-section"
      >
        {packages.map((_, index) => (
          <article key={index} className="custom-package-card-content">
            <div className="custom-package-card-image-container">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/254c6dc983-b74c8b6733c5eb980631.png"
                className="custom-package-card-image"
                alt={`Custom ${index}`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="custom-package-card-image-layer">
                <div className="custom-package-card-info-tag">
                  <span>3.5 ★ (1,500)</span>
                </div>
              </div>
            </div>
            <div className="custom-package-card-info-content">
              <div className="custom-package-card-info">
                <span>BEAUTY AND CARE</span>
                <h3>Wellness Ritual Collection</h3>
                <span style={{ marginBottom: 10 }}>
                  By{' '}
                  <span style={{ color: '#1890ff', marginLeft: 3 }}>
                    Pure Essence Studio
                  </span>
                </span>

                <div
                  className="custom-package-card-info-items"
                  style={{ marginBottom: 5 }}
                >
                  {products.map((item, index) => (
                    <img
                      className="custom-package-card-info-product-icon"
                      key={index}
                      src={item.imageUrl}
                      alt={`Img ${index}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <span className="custom-package-card-info-items-more-label">
                    +3 more
                  </span>
                </div>
                {/*
                      <div className="custom-package-card-info-items">
                        <div className="custom-package-card-info-tag">
                          <span>Online Classes</span>
                        </div>
                      </div>
                        */}

                {/*
                      <div className="custom-package-card-info-items">
                        <div className="custom-package-card-info-tag">
                          <span>Member discounts</span>
                        </div>
                      </div>
                      <div className="custom-package-card-info-items">
                        <div className="custom-package-card-info-tag">
                          <span>Member discounts</span>
                        </div>
                      </div>
                      
                        */}
              </div>
              <button
                className="card-button"
                style={{ margin: 0 }}
                onClick={() => (window.location.href = '/custom-package')}
              >
                View Package
              </button>
            </div>
          </article>
        ))}
      </section>
      <nav
        style={{ marginTop: 30 }}
        className="pagination-container featured-screen-navigation"
        aria-label="Paginación de paquetes estándar"
      >
        <button className="pagination-arrow">‹</button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
          <button
            key={page}
            className={`pagination-item ${currentPage === page ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button className="pagination-next">Siguiente ›</button>
      </nav>
    </>
  );
};

export default FeaturedCustomPackagesScreen;
