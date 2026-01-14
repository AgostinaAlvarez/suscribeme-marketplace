import React, { useEffect, useRef, useState } from 'react';
import '../../public/styles/storeDetailsScreenStyles.css';
import StandarPackagesSection from '../components/StoreDetailsScreen/StandarPackagesSection.tsx';

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

const standarPackages: StandarPackageData[] = [
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
    plans: [{ _id: '4a', title: 'Plan Mensual', price: 18, currencyId: 'USD' }],
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
    plans: [{ _id: '6a', title: 'Plan Mensual', price: 30, currencyId: 'USD' }],
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
    plans: [{ _id: '8a', title: 'Plan Mensual', price: 22, currencyId: 'USD' }],
  },
  {
    _id: '9',
    title: 'Plan Belleza Integral',
    briefDescription:
      'Productos de belleza y cuidado personal seleccionados por expertos. Envío mensual.',
    plans: [{ _id: '9a', title: 'Plan Mensual', price: 28, currencyId: 'USD' }],
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
  {
    _id: '11',
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
    _id: '12',
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
];

const StoreDetailsScreen: React.FC = () => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [responsiveComponent, setResponsiveComponent] =
    useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const hero = document.querySelector('.store-details-screen-hero');
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Solo ejecuta en cliente
    const checkMobile = () => {
      setResponsiveComponent(window.innerWidth < 1050);
    };
    checkMobile(); // Inicializa al montar
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [subscritpionType, setSubscriptionType] = useState<
    'standar-packages' | 'custom-packages'
  >('standar-packages');

  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeSubscriptionType = (
    type: 'standar-packages' | 'custom-packages',
  ) => {
    window.scrollTo(0, 0);
    setLoading(true);
    setSubscriptionType(type);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  ////

  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft < maxScroll - 1); // margen por decimales
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;

    el.scrollTo({
      left:
        direction === 'left' ? el.scrollLeft - amount : el.scrollLeft + amount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateArrows();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 35,
      }}
    >
      <div className="store-details-screen-hero">
        <div className="store-details-screen-hero-cover-container">
          {/*
          <img src="" alt="" className="store-details-screen-hero-cover-img" />
          */}
          <div className="store-details-screen-hero-cover-layer">
            <div className="store-details-screen-hero-cover-avatar-img"></div>
          </div>
        </div>
        <div className="store-details-screen-hero-content">
          <div
            className="store-details-screen-container"
            style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
          >
            <h2>Store Name</h2>
            <span>@storename</span>

            <p>
              Morgan Stanley helps people, institutions and governments raise,
              manage and distribute the capital they need to achieve their
              goals.
            </p>
          </div>
        </div>
      </div>
      {responsiveComponent && (
        <section
          id="sticky-bar-sticky"
          className="store-details-screen-sticky-bar"
          style={{
            opacity: showStickyBar ? 1 : 0,
            pointerEvents: showStickyBar ? 'auto' : 'none',
            transition: 'opacity 0.3s',
            position: 'fixed',
            top: '60px',
            left: 0,
            width: '100%',
            zIndex: 1500,
          }}
          aria-hidden={!showStickyBar}
        >
          <div
            className="store-details-screen-container"
            style={{ display: 'flex', alignItems: 'center', gap: 15 }}
          >
            <div
              style={{
                height: 40,
                width: 40,
                boxSizing: 'border-box',
                borderRadius: '50%',
                backgroundColor: '#efefef',
              }}
            ></div>
            <h2
              style={{
                fontSize: 20,
                color: '#fff',
                margin: 0,
                lineHeight: 1,
                fontWeight: 500,
              }}
            >
              Store Name
            </h2>
            <span
              style={{
                fontSize: 14,
                color: ' #8c8c8c',
                margin: 0,
                lineHeight: 1,
              }}
            >
              @storename
            </span>
          </div>
        </section>
      )}
      <div className="store-details-screen-container store-details-screen-main-grid">
        {/*LEFT COL - SEARCHER*/}
        <div className="store-details-screen-main-grid-left-col">
          <div className="store-details-screen-main-grid-store-box">
            <div className="store-details-screen-main-grid-store-box-header">
              {/*
                <img src="" alt="" className="store-details-screen-main-grid-store-box-header-img" />
              */}
              <div className="store-details-screen-main-grid-store-box-header-layer">
                <div className="store-details-screen-main-grid-store-box-avatar"></div>
              </div>
            </div>
            <div className="store-details-screen-main-grid-store-box-content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <h1>Store Name</h1>
                <span
                  style={{
                    fontSize: 14,
                    margin: 0,
                    lineHeight: 1,
                    color: '#8c8c8c',
                  }}
                >
                  @storename
                </span>
              </div>
              <p>
                Morgan Stanley helps people, institutions and governments raise,
                manage and distribute the capital they need to achieve their
                goals.
              </p>
            </div>
          </div>
        </div>
        {/*RIGHT COL - CONTENT*/}
        <div className="store-details-screen-main-grid-right-col">
          <div className="store-details-screen-navigation-section">
            <section className="store-details-screen-navigation-container">
              <div
                className={`store-details-screen-navigation-item ${subscritpionType === 'standar-packages' ? 'store-details-screen-navigation-item-cta' : ''}`}
                onClick={() => {
                  handleChangeSubscriptionType('standar-packages');
                }}
              >
                <span>Standar Packages (14)</span>
              </div>
              <div
                className={`store-details-screen-navigation-item ${subscritpionType === 'custom-packages' ? 'store-details-screen-navigation-item-cta' : ''}`}
                onClick={() => {
                  handleChangeSubscriptionType('custom-packages');
                }}
              >
                <span>Custom Packages (14)</span>
              </div>
            </section>
            {/*mobile*/}
            <div className="categories-wrapper-mobile">
              <div className="categories-wrapper-container">
                <div className="categories-wrapper">
                  {showLeft && (
                    <button
                      className="arrow left"
                      onClick={() => scrollByAmount('left')}
                      aria-label="Scroll left"
                    >
                      ‹
                    </button>
                  )}

                  <div className="categories-scroll" ref={scrollRef}>
                    <button
                      className="category-item"
                      onClick={() => {
                        handleChangeSubscriptionType('standar-packages');
                      }}
                    >
                      Standar Packages (80)
                    </button>
                    <button
                      className="category-item"
                      onClick={() => {
                        handleChangeSubscriptionType('custom-packages');
                      }}
                    >
                      Custom Packages (15)
                    </button>
                    {/*categories.map((cat) => (
              <button
                key={cat.id}
                className="category-item"
                onClick={() => {
                  handleChangeSubscriptionType(cat.id);
                }}
              >
                {cat.label}
              </button>
            ))*/}
                  </div>

                  {showRight && (
                    <button
                      className="arrow right"
                      onClick={() => scrollByAmount('right')}
                      aria-label="Scroll right"
                    >
                      ›
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div
              style={{
                width: '100%',
                boxSizing: 'border-box',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className="ant-loader"></div>
            </div>
          ) : (
            <>
              {subscritpionType === 'standar-packages' && (
                <StandarPackagesSection packages={standarPackages} />
              )}
              {subscritpionType === 'custom-packages' && <div>Content</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsScreen;
