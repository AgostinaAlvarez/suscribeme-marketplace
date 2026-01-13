import React, { useEffect, useState } from 'react';
import FeaturedPackagesCarousel from './FeaturedPackagesCarousel.tsx';
import FeaturedCustomPackagesCarusel from './FeaturedCustomPackagesCarusel';

interface PackageData {
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

interface CustomPackageData {
  _id: string;
}

const CollectionMainComponent: React.FC = () => {
  const packages: PackageData[] = [
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
          top: '60px',
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: 0,
        }}
        aria-hidden={!showStickyBar}
      >
        <div className="collection-sticky-bar-section-banner">
          <div className="collection-section-container">
            <span>banner</span>
          </div>
        </div>
        <div className="collection-sticky-bar-section-filter">
          <div
            className="collection-section-container collection-sticky-bar-section-content"
            //style={{
            //  display: 'flex',
            //  alignItems: 'center',
            //  justifyContent: 'space-between',
            //}}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
              {/*CATEGORY SELECTOR*/}
              <div className="collection-screen-filters-section">
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
              <div className="collection-screen-filters-section">
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
          <div className="collection-section-container collection-screen-hero-nav">
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
              <div className="collection-screen-filters-section">
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
              <div className="collection-screen-filters-section">
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
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 60,
        }}
      >
        <section
          aria-labelledby="standar-packages-section"
          className="collection-section-container"
          style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              gap: 6,
              borderLeft: '4px solid #7d2ae8',
              paddingLeft: 10,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 23, fontWeight: 500 }}>
              Ready-made subscription packages
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.4,
                color: '#595959',
              }}
            >
              Chose a plan and start inmediately
            </p>
          </div>
          <div className="collection-screen-items-grid">
            {packages.slice(0, 6).map((pckg, index) => (
              <article
                className="card-content"
                key={index}
                style={{
                  minHeight: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div
                  className="card-tag"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'green',
                    color: 'white',
                  }}
                >
                  <span>Multiple plans</span>
                </div>
                {pckg.coverImage ? (
                  <img
                    className="card-image"
                    src={pckg.coverImage.url}
                    alt={`${pckg.title}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="card-image-default" aria-hidden="true"></div>
                )}
                <div
                  className="card-content-information"
                  style={{ height: 'fit-content' }}
                >
                  <div className="card-content-information-description-container">
                    <h3>{pckg.title}</h3>
                    <div
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div className="card-tag">
                        <span>Belleza y Care</span>
                      </div>
                      <span>4.7 (312)</span>
                    </div>
                    <p>{pckg.briefDescription}</p>
                    <div
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: 5,
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 3,
                            backgroundColor: '#efefef',
                          }}
                        ></div>
                        <span
                          style={{
                            fontSize: 13,
                            color: '#545454',
                            margin: 0,
                            lineHeight: 1,
                          }}
                        >
                          Store Name
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          color: ' #000000',
                          fontWeight: 500,
                        }}
                      >
                        From $29 / month
                      </span>
                    </div>
                  </div>
                  <button
                    className="card-button"
                    onClick={() => (window.location.href = '/package')}
                  >
                    View Package
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="custom-packages-section"
          className="collection-section-container"
          style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              gap: 6,
              borderLeft: '4px solid #7d2ae8',
              paddingLeft: 10,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 23, fontWeight: 500 }}>
              Build your own subscription
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.4,
                color: '#595959',
              }}
            >
              Customize products, services and benefits to fit your needs
            </p>
          </div>
          <div className="collection-screen-items-grid">
            {packages.slice(0, 6).map((pckg, index) => (
              <article
                className="card-content"
                key={index}
                style={{
                  minHeight: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div
                  className="card-tag"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'green',
                    color: 'white',
                  }}
                >
                  <span>Customizable</span>
                </div>
                {pckg.coverImage ? (
                  <img
                    className="card-image"
                    src={pckg.coverImage.url}
                    alt={`${pckg.title}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="card-image-default" aria-hidden="true"></div>
                )}
                <div
                  className="card-content-information"
                  style={{ height: 'fit-content' }}
                >
                  <div className="card-content-information-description-container">
                    <h3>{pckg.title}</h3>
                    <div
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div className="card-tag">
                        <span>Belleza y Care</span>
                      </div>
                      <span>4.7 (312)</span>
                    </div>
                    <p>{pckg.briefDescription}</p>
                    <div
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: 5,
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 3,
                            backgroundColor: '#efefef',
                          }}
                        ></div>
                        <span
                          style={{
                            fontSize: 13,
                            color: '#545454',
                            margin: 0,
                            lineHeight: 1,
                          }}
                        >
                          Store Name
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          color: ' #000000',
                          fontWeight: 500,
                        }}
                      >
                        From $29 / month
                      </span>
                    </div>
                  </div>
                  <button
                    className="card-button"
                    onClick={() => (window.location.href = '/package')}
                  >
                    View Package
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div
          className="collection-section-container collections-screen-informative-message-container"
          //style={{
          //  width: '1100px',
          //  backgroundColor: '#f0f6ff',
          //  boxSizing: 'border-box',
          //  padding: 30,
          //  borderRadius: 10,
          //  color: '#1f3a89',
          //  display: 'grid',
          //  gridTemplateColumns: 'auto 1fr',
          //  gap: 10,
          //  border: '1px solid #bfdbfe',
          //}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#2762ea"
            className="bi bi-info-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
          </svg>
          <p style={{ margin: 0, lineHeight: 1.5, fontSize: 14 }}>
            This collection was carefully curated by our team to include the
            most essential subscriptions for remote workers. Each package has
            been tested ar viewed for quality, value, and user experience. We
            regularly update this collection based on user feedback and market
            trends
          </p>
        </div>
      </div>
    </>
  );
};

export default CollectionMainComponent;
