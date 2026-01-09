import React, { useEffect, useState } from 'react';

interface StandarPackageData {
  _id: string;
  coverImage?: { url: string } | null;
  title: string;
  briefDescription: string;
  plans: {
    _id: string;
    title: string;
    price: number;
    currencyId: string;
  }[];
}

const FeaturedStandarPackagesScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const packages: StandarPackageData[] = [
    {
      _id: '1',
      title: 'Suscripción a Café Mensual',
      coverImage: {
        url: 'https://firsthand.coffee/cdn/shop/collections/Firsthand0015.jpg?v=1706141416&width=1500',
      },
      briefDescription:
        'Recibe café premium seleccionado cada mes en tu puerta. Variedades de granos y tuestes personalizados.',
      plans: [
        { _id: '1a', title: 'Plan Mensual', price: 25, currencyId: 'USD' },
        { _id: '1b', title: 'Plan Anual', price: 250, currencyId: 'USD' },
      ],
    },
    {
      _id: '2',
      title: 'Suscripción Streaming Plus',
      coverImage: {
        url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/63fb9908ac-dadf7fdcfdbad18e8a37.png',
      },
      briefDescription:
        'Disfruta de series y películas en HD y 4K en todos tus dispositivos favoritos. Sin anuncios.',
      plans: [
        { _id: '2a', title: 'Plan Mensual', price: 12, currencyId: 'USD' },
        { _id: '2b', title: 'Plan Familiar', price: 20, currencyId: 'USD' },
      ],
    },
    {
      _id: '3',
      title: 'Plan Fitness Online',
      coverImage: {
        url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/569225c317-f02db7edb895db03afd2.png',
      },
      briefDescription:
        'Acceso ilimitado a rutinas, clases en vivo y seguimiento personalizado para tu entrenamiento.',
      plans: [
        { _id: '3a', title: 'Plan Mensual', price: 15, currencyId: 'USD' },
        { _id: '3b', title: 'Plan Trimestral', price: 40, currencyId: 'USD' },
      ],
    },
    {
      _id: '4',
      title: 'Suscripción a Box de Snacks',
      coverImage: {
        url: 'https://vegancuts.com/cdn/shop/files/VC_August_SB.png?v=1741279200&width=1080',
      },
      briefDescription:
        'Recibe una caja sorpresa de snacks internacionales cada mes. Descubre nuevos sabores.',
      plans: [
        { _id: '4a', title: 'Plan Mensual', price: 18, currencyId: 'USD' },
      ],
    },
    {
      _id: '5',
      title: 'Membresía Club de Libros',
      coverImage: {
        url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/a8108f24d1-728091adf659377fe686.png',
      },
      briefDescription:
        'Un libro nuevo cada mes, acceso a foros exclusivos y encuentros virtuales con autores.',
      plans: [
        { _id: '5a', title: 'Plan Mensual', price: 10, currencyId: 'USD' },
        { _id: '5b', title: 'Plan Anual', price: 100, currencyId: 'USD' },
      ],
    },
    {
      _id: '6',
      title: 'Suscripción Gourmet',
      briefDescription:
        'Ingredientes seleccionados y recetas exclusivas para preparar platos gourmet en casa.',
      plans: [
        { _id: '6a', title: 'Plan Mensual', price: 30, currencyId: 'USD' },
      ],
    },
    {
      _id: '7',
      title: 'Plan Educación Online',
      briefDescription:
        'Acceso a cursos, talleres y webinars de distintas áreas. Certificados digitales incluidos.',
      plans: [
        { _id: '7a', title: 'Plan Mensual', price: 20, currencyId: 'USD' },
        { _id: '7b', title: 'Plan Anual', price: 200, currencyId: 'USD' },
      ],
    },
    {
      _id: '8',
      title: 'Suscripción Mascotas Felices',
      briefDescription:
        'Juguetes, snacks y accesorios para tu mascota entregados mensualmente en tu domicilio.',
      plans: [
        { _id: '8a', title: 'Plan Mensual', price: 22, currencyId: 'USD' },
      ],
    },
    {
      _id: '9',
      title: 'Plan Belleza Integral',
      briefDescription:
        'Productos de belleza y cuidado personal seleccionados por expertos. Envío mensual.',
      plans: [
        { _id: '9a', title: 'Plan Mensual', price: 28, currencyId: 'USD' },
      ],
    },
    {
      _id: '10',
      title: 'Suscripción Mistery Box',
      briefDescription:
        'Recibe una caja sorpresa con gadgets, accesorios y productos exclusivos cada mes.',
      plans: [
        { _id: '10a', title: 'Plan Mensual', price: 35, currencyId: 'USD' },
      ],
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
          <div className="featured-screen-sticky-bar-section-content">
            <span>banner</span>
          </div>
        </div>
        <div className="featured-screen-sticky-bar-section-filter">
          <div
            className="featured-screen-sticky-bar-section-content"
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

            <span>Featured Standar Packages</span>
          </div>
        </div>
        <section
          aria-labelledby="hero-section"
          className="featured-screen-hero-section"
        >
          <div className="featured-screen-section-container featured-screen-hero-section-content">
            <h1 id="hero-section">Featured Standar Packages</h1>
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
              {/*PRICE RANGE*/}
              {/*
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 13, color: '#595959' }}>Precio</span>

                <div
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <input
                    type="number"
                    style={{
                      width: '100%',
                      fontSize: 13,
                      padding: '5px',
                      boxSizing: 'border-box',
                    }}
                    min={0}
                    value={
                      priceRangeFilter[0] === undefined
                        ? ''
                        : priceRangeFilter[0]
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      const newMin = val === '' ? undefined : Number(val);
                      const newMax = priceRangeFilter[1];
                      if (
                        (newMin === undefined || newMin === 0) &&
                        (newMax === undefined || newMax === 0)
                      ) {
                        setPriceRangeFilter([]);
                      } else {
                        setPriceRangeFilter([newMin, newMax]);
                      }
                    }}
                    placeholder="Mínimo"
                  />
                  <span style={{ fontSize: 20 }}>-</span>
                  <input
                    type="number"
                    style={{
                      width: '100%',
                      fontSize: 13,
                      padding: '5px',
                      boxSizing: 'border-box',
                    }}
                    min={0}
                    value={
                      priceRangeFilter[1] === undefined
                        ? ''
                        : priceRangeFilter[1]
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      const newMax = val === '' ? undefined : Number(val);
                      const newMin = priceRangeFilter[0];
                      if (
                        (newMin === undefined || newMin === 0) &&
                        (newMax === undefined || newMax === 0)
                      ) {
                        setPriceRangeFilter([]);
                      } else {
                        setPriceRangeFilter([newMin, newMax]);
                      }
                    }}
                    placeholder="Máximo"
                  />
                </div>
              </div>
                */}
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
        className="featured-screen-section-container"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 20,
          rowGap: 30,
        }}
      >
        {packages.map((pckg, index) => (
          <article key={index} className="standar-package-card-content">
            <div className="standar-package-card-image-container">
              {pckg.coverImage ? (
                <img
                  src={pckg.coverImage.url}
                  className="standar-package-card-image"
                  alt={`${pckg.title}`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <></>
              )}
              <div className="standar-package-card-image-layer">
                <div className="standar-package-card-info-tag">
                  <span>3.5 ★ (1,500)</span>
                </div>
              </div>
            </div>
            <div className="standar-package-card-info-content">
              <div className="standar-package-card-info">
                <span>BEAUTY AND CARE</span>
                <h3>{pckg.title}</h3>
                <span>
                  By{' '}
                  <span style={{ color: '#1890ff', marginLeft: 3 }}>
                    Pure Essence Studio
                  </span>
                </span>
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.4,
                    marginBottom: 10,
                    fontSize: 12.5,
                    color: '#8c8c8c',
                    fontWeight: 400,
                  }}
                >
                  {pckg.briefDescription}
                </p>
                {pckg.plans.map((plan, index) => (
                  <div
                    key={index}
                    className="standar-package-card-plan-container"
                  >
                    {/*
                        <div className="standar-package-card-plan-icon">
                          <img
                            src="/assets/icons/rocket-white.svg"
                            alt="Menu icon"
                            width="12"
                            height="12"
                          />
                        </div>
                          */}

                    <h3>{plan.title}</h3>
                    <div className="standar-package-card-plan-price-tag">
                      <span>
                        ${plan.price} <span>/mo</span>
                      </span>
                    </div>
                  </div>
                ))}
                {pckg.plans.length > 1 && <span>+ 2 more Plans</span>}
              </div>
              <button
                className="card-button"
                style={{ margin: 0 }}
                onClick={() => (window.location.href = '/package')}
              >
                View Package
              </button>
            </div>
          </article>
        ))}
      </section>
      <nav
        style={{ marginTop: 30 }}
        className="pagination-container"
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

export default FeaturedStandarPackagesScreen;
