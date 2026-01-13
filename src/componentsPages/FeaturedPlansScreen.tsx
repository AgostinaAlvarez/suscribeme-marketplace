import React, { useEffect, useState } from 'react';

interface StandarPlanData {
  _id: string;
  title: string;
  price: number;
  currencyId: string;
  package: {
    title: string;
    briefDescription: string;
  };
}

const FeaturedPlansScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const plans: StandarPlanData[] = [
    {
      _id: '1',
      title: 'Plan Mensual',
      price: 25,
      currencyId: 'USD',
      package: {
        title: 'Suscripción a Café Mensual',
        briefDescription:
          'Recibe café premium seleccionado cada mes en tu puerta. Variedades de granos y tuestes personalizados.',
      },
    },
    {
      _id: '2',
      title: 'Plan Anual',
      price: 250,
      currencyId: 'USD',
      package: {
        title: 'Suscripción Streaming Plus',
        briefDescription:
          'Disfruta de series y películas en HD y 4K en todos tus dispositivos favoritos. Sin anuncios.',
      },
    },
    {
      _id: '3',
      title: 'Plan Mensual',
      price: 12,
      currencyId: 'USD',
      package: {
        title: 'Plan Fitness Online',
        briefDescription:
          'Acceso ilimitado a rutinas, clases en vivo y seguimiento personalizado para tu entrenamiento.',
      },
    },
    {
      _id: '4',
      title: 'Plan Familiar',
      price: 20,
      currencyId: 'USD',
      package: {
        title: 'Suscripción a Box de Snacks',
        briefDescription:
          'Recibe una caja sorpresa de snacks internacionales cada mes. Descubre nuevos sabores.',
      },
    },
    {
      _id: '5',
      title: 'Plan Mensual',
      price: 15,
      currencyId: 'USD',
      package: {
        title: 'Membresía Club de Libros',
        briefDescription:
          'Un libro nuevo cada mes, acceso a foros exclusivos y encuentros virtuales con autores.',
      },
    },
    {
      _id: '6',
      title: 'Plan Mensual',
      price: 18,
      currencyId: 'USD',
      package: {
        title: 'Suscripción Gourmet',
        briefDescription:
          'Ingredientes seleccionados y recetas exclusivas para preparar platos gourmet en casa.',
      },
    },
    {
      _id: '7',
      title: 'Plan Anual',
      price: 100,
      currencyId: 'USD',
      package: {
        title: 'Plan Educación Online',
        briefDescription:
          'Acceso a cursos, talleres y webinars de distintas áreas. Certificados digitales incluidos.',
      },
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

            <span>Featured Standar Plans</span>
          </div>
        </div>
        <section
          aria-labelledby="hero-section"
          className="featured-screen-hero-section"
        >
          <div className="featured-screen-section-container featured-screen-hero-section-content">
            <h1 id="hero-section">Featured Standar Plans</h1>
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
        {plans.map((plan, index) => (
          <article
            key={index}
            className="standar-plan-card-content"
            //style={{ boxShadow: 'none', border: '1px solid #efefef' }}
          >
            <div className="standar-plan-card-info-content">
              <div
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  //backgroundColor: 'red',
                }}
              >
                <div className="standar-plan-card-info">
                  <div
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'flex-start',
                    }}
                  >
                    <h3>{plan.title}</h3>
                    <div className="standar-plan-card-info-tag">
                      <span>3.5 ★</span>
                    </div>
                  </div>
                  <h4>{plan.package.title}</h4>
                  <span style={{ marginBottom: 3, color: '#8c8c8c' }}>
                    By <span style={{ color: '#1890ff' }}>Pure Essentials</span>
                  </span>
                  <span
                    className="standar-plan-card-price"
                    style={{ color: '#000' }}
                  >
                    $45,00
                    <span style={{ fontSize: '15px' }}>/month</span>{' '}
                  </span>
                  {/*
                        <p>{plan.package.briefDescription}</p>
                        */}
                </div>
                <p
                  style={{
                    fontSize: '11.3px',
                    lineHeight: 1.4,
                    margin: 0,
                    color: '#595959',
                  }}
                >
                  {plan.package.briefDescription}
                </p>

                {/*
                    <span className="standar-plan-card-price">
                      $45,00
                      <span style={{ fontSize: '15px' }}>/month</span>{' '}
                    </span>
                        */}
                <ul className="standar-plan-card-items-list">
                  {Array.from({
                    length: index > 4 || index == 0 ? 1 : index,
                  }).map((_, index) => (
                    <li key={index}>
                      <div className="standar-plan-card-items-list-item">
                        <img
                          src="/assets/icons/check-circle.svg"
                          width="14"
                          height="14"
                          alt="Check Icon"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <span>19 instruments and effects</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                style={{ margin: 0 }}
                className="card-button"
                onClick={() => (window.location.href = '/standar-plan')}
              >
                View Plan
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

export default FeaturedPlansScreen;
