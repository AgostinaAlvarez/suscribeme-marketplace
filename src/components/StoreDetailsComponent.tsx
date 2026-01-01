import React, { useEffect, useState } from 'react';
import '../../public/styles/planCarouselStyles.css';
import '../../public/styles/storeDetailStyles.css';

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

const StoreDetailsComponent: React.FC = () => {
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

  const custom_packages: CustomPackageData[] = [
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
  ];

  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 100) {
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

  return (
    <>
      {/* ================= STICKY BAR (React) ================= */}
      <section
        id="package-sticky-bar"
        className="store-detail-sticky-bar-section"
        style={{
          opacity: showStickyBar ? 1 : 0,
          pointerEvents: showStickyBar ? 'auto' : 'none',
          transition: 'opacity 0.3s',
          position: 'fixed',
          top: '50px',
          left: 0,
          width: '100%',
          zIndex: 1000,
        }}
        aria-hidden={!showStickyBar}
      >
        <div className="store-detail-sticky-bar-content">
          <span>Complete Digital Marketing Mastery Package</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Subscribe Now
          </button>
        </div>
      </section>
      {/* ================= HERO ================= */}
      <section
        aria-labelledby="hero-section"
        className="store-detail-hero-section"
      >
        <div className="store-detail-section-container store-detail-hero-section-container">
          <div className="store-detail-user-container">
            <div className="store-detail-avatar"></div>
            <div className="store-detail-user-info">
              <h1 id="hero-section" className="store-detail-name">
                Marketing Pro Studio
              </h1>
              <span>@marketing.pro.studio</span>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="stats-section"
        className="store-detail-section-container store-detail-stats-section-container"
      >
        <article>
          <span className="store-detail-stat-value">4.6</span>
          <span>Instructor Rating</span>
        </article>
        <article>
          <span className="store-detail-stat-value">25,352</span>
          <span>Reviews</span>
        </article>
        <article>
          <span className="store-detail-stat-value">101,581</span>
          <span>Students</span>
        </article>
        <article>
          <span className="store-detail-stat-value">7</span>
          <span>Courses</span>
        </article>
      </section>
      <section
        aria-labelledby="about-section"
        className="store-detail-section-container store-detail-about-section-container"
      >
        <h2 id="about-section" className="store-section-title">
          About Marketing Pro Studio
        </h2>
        <p>
          My name is Hitesh Choudhary, a retired corporate professional who has
          seamlessly transitioned into a full-time YouTuber. With a rich history
          as the founder of LCO (acquired) and a former CTO at iNeuron and
          Senior Director at PW, I bring a wealth of experience in building
          software and companies. My journey in the tech world has endowed me
          with unique insights and expertise, which I am passionate about
          sharing.
        </p>
      </section>
      <section
        aria-labelledby="packages-section"
        className="store-detail-section-container store-detail-packages-section-container"
      >
        <h2 id="packages-section" className="store-section-title">
          Packages (4)
        </h2>
        <div className="store-detail-packages-section-grid">
          {packages.slice(0, 6).map((pckg, index) => (
            <article className="card-content" key={index}>
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
              <div className="card-content-information">
                <div className="card-content-information-description-container">
                  <h3>{pckg.title}</h3>
                  <p>{pckg.briefDescription}</p>
                  <span>3.5 ★★★★★ (76)</span>
                  {pckg.plans.slice(0, 2).map((plan, index) => (
                    <h4 key={index}>
                      {plan.title} ${plan.price} {plan.currencyId}{' '}
                      <span>/mo</span>
                    </h4>
                  ))}
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
        <button className="store-section-button">View More Packages</button>
      </section>
      <section
        aria-labelledby="custom-packages-section"
        className="store-detail-section-container store-detail-packages-section-container"
      >
        <h2 id="custom-packages-section" className="store-section-title">
          Custom Packages (4)
        </h2>
        <div className="store-detail-packages-section-grid">
          {custom_packages.slice(0, 6).map((_, index) => (
            <div
              className="card-content custom-package-card-content"
              key={index}
            >
              <div className="card-content-information custom-package-card-content-information">
                <div className="card-content-information-description-container">
                  {/*STORE*/}
                  <div className="card-tag">
                    <span>Belleza y Care</span>
                  </div>
                  <div className="store-container">
                    <div className="store-container-avatar"></div>
                    <div className="store-container-data-content">
                      <span className="store-container-name">Beauty Store</span>
                      <span className="store-container-username">
                        @beautystoreofficial
                      </span>
                    </div>
                  </div>
                  <div className="card-started-amount-content">
                    <h5>Desde $4,500</h5>
                    <p>Monto mínimo de suscripción</p>
                  </div>
                  <div className="card-features">
                    <span>23 productos configurables</span>
                    <span>Cantidades mínimas y máximas</span>
                    <span>Envío a domicilio o retiro en tienda</span>
                  </div>
                  <span>3.5 ★★★★★ (76)</span>
                </div>
                <button
                  className="card-button"
                  onClick={() => (window.location.href = '/custom-package')}
                >
                  View Package
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="store-section-button">
          View More Custom Packages
        </button>
      </section>
      <section aria-labelledby="reviews-section"></section>
    </>
  );
};

export default StoreDetailsComponent;
