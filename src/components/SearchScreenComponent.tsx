import React, { useEffect, useRef, useState } from 'react';

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

const SearchScreenComponent: React.FC = () => {
  // Estado para ocultar el aside al llegar al footer
  const [hideAside, setHideAside] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Footer detection
          const footer = document.querySelector('footer');
          const aside = asideRef.current;
          if (footer && aside) {
            const footerRect = footer.getBoundingClientRect();
            const asideRect = aside.getBoundingClientRect();
            // Ajusta el margen de seguridad para que el aside desaparezca antes de tocar el footer
            if (asideRect.bottom > footerRect.top - 20) {
              setHideAside(true);
            } else {
              setHideAside(false);
            }
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

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<
    'standar-package' | 'custom-package'
  >('standar-package');

  const subscriptionTypeOptions = [
    'Productos',
    'Servicios',
    'Mistery Box',
    'Beneficios',
    'Descuentos',
  ];
  const [selectedTypeOptions, setSelectedTypeOptions] = useState<string[]>([]);

  const filterTypeOptions = ['Más Relevante', 'Menor Precio', 'Mayor Precio'];
  const [selectedFilterTypeOptions, setSelectedFilterTypeOptions] = useState<
    string[]
  >([]);

  const [transactionAmountFilter, setTransactionAmountFilter] = useState<
    (number | undefined)[]
  >([]);

  return (
    <>
      <aside className="search-screen-aside">
        <section className="search-screen-aside-container">
          <h1 className="visually-hidden">Zapatillas</h1>
          <div
            ref={asideRef}
            style={{
              width: '100%',

              boxSizing: 'border-box',
              padding: '20px',
              border: '1px solid #efefef',
              backgroundColor: ' #ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: 15,

              opacity: hideAside ? 0 : 1,
              pointerEvents: hideAside ? 'none' : 'auto',
              transition: 'opacity 0.3s',
            }}
          >
            <div
              style={{
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600 }}>Filter</span>
              <span
                style={{ fontSize: 12, color: '#1890ff', cursor: 'pointer' }}
              >
                Reset Filters
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 13, color: '#595959' }}>
                Tipo de suscripcion
              </span>
              <div className="radio-group" style={{ marginTop: 10 }}>
                {subscriptionTypeOptions.map((value) => (
                  <label
                    key={value}
                    className="radio-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 6,
                    }}
                  >
                    <input
                      type="checkbox"
                      value={value}
                      checked={selectedTypeOptions.includes(value)}
                      onChange={() => {
                        setSelectedTypeOptions((prev) =>
                          prev.includes(value)
                            ? prev.filter((v) => v !== value)
                            : [...prev, value],
                        );
                      }}
                      name="subscription-type"
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 13, color: '#595959' }}>
                Filtrar por
              </span>
              <div className="radio-group" style={{ marginTop: 10 }}>
                {filterTypeOptions.map((value) => (
                  <label
                    key={value}
                    className="radio-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 6,
                    }}
                  >
                    <input
                      type="checkbox"
                      value={value}
                      checked={selectedFilterTypeOptions.includes(value)}
                      onChange={() => {
                        setSelectedFilterTypeOptions((prev) =>
                          prev.includes(value)
                            ? prev.filter((v) => v !== value)
                            : [...prev, value],
                        );
                      }}
                      name="subscription-type"
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 13, color: '#595959' }}>
                Rango de precio
              </span>

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
                    transactionAmountFilter[0] === undefined
                      ? ''
                      : transactionAmountFilter[0]
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    const newMin = val === '' ? undefined : Number(val);
                    const newMax = transactionAmountFilter[1];
                    if (
                      (newMin === undefined || newMin === 0) &&
                      (newMax === undefined || newMax === 0)
                    ) {
                      setTransactionAmountFilter([]);
                    } else {
                      setTransactionAmountFilter([newMin, newMax]);
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
                    transactionAmountFilter[1] === undefined
                      ? ''
                      : transactionAmountFilter[1]
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    const newMax = val === '' ? undefined : Number(val);
                    const newMin = transactionAmountFilter[0];
                    if (
                      (newMin === undefined || newMin === 0) &&
                      (newMax === undefined || newMax === 0)
                    ) {
                      setTransactionAmountFilter([]);
                    } else {
                      setTransactionAmountFilter([newMin, newMax]);
                    }
                  }}
                  placeholder="Máximo"
                />
              </div>
              <button>Aplicar</button>
            </div>
          </div>
          {/*
          <article>
            <h1>Zapatillas</h1>
            <span>1,600 resultados</span>
            <a href="#standar-packages-section">1,400 paquetes standar</a>
            <a href="#custom-packages-section">200 paquetes personalizados</a>
          </article>
            */}
          {/*
          <nav aria-label="Filtrar por tipo de suscripción">
            <h2 className="search-screen-aside-subttl">Tipo de suscripcion</h2>
            <ul>
              <li>
                <span>Productos</span>
              </li>
              <li>
                <span>Servicios</span>
              </li>
              <li>
                <span>Mistery Box and</span>
              </li>
              <li>
                <span>Beneficio</span>
              </li>
              <li>
                <span>Descuentos</span>
              </li>
            </ul>
          </nav>
          <nav aria-label="Filtrar por orden">
            <h2 className="search-screen-aside-subttl">Filtrar por</h2>
            <ul>
              <li>
                <span>Mas Relevante</span>
              </li>
              <li>
                <span>Menor Precio</span>
              </li>
              <li>
                <span>Mayor Precio</span>
              </li>
            </ul>
          </nav>
              */}
        </section>
      </aside>
      <div className="search-screen-content">
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            position: 'sticky',
            //backgroundColor: 'green',
            backgroundColor: '#f9fafb',
            top: '110px',
            left: 0,
            zIndex: 100,
            padding: '15px 20px',
            paddingRight: 50,
            //paddingBottom: 35,
            //paddingRight: 70,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/*Subscription Type*/}
          {/*
          <div
            style={{
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              height: 'fit-content',
            }}
          >
            <div
              onClick={() => {
                setSelectedSubscriptionType('standar-package');
              }}
              className={`search-screen-type-content ${selectedSubscriptionType === 'standar-package' ? 'search-screen-type-content-selected' : ''}`}
            >
              <span>Standar Package</span>
              <div
                className={`search-screen-type-value ${selectedSubscriptionType === 'standar-package' ? 'search-screen-type-value-selected' : ''}`}
              >
                <span>4,500 results</span>
              </div>
            </div>
            <div
              style={{
                height: '30px',
                width: '1px',
                backgroundColor: '#bfbfbf',
              }}
            ></div>
            <div
              onClick={() => {
                setSelectedSubscriptionType('custom-package');
              }}
              className={`search-screen-type-content ${selectedSubscriptionType === 'custom-package' ? 'search-screen-type-content-selected' : ''}`}
            >
              <span>Custom Package</span>
              <div
                className={`search-screen-type-value ${selectedSubscriptionType === 'custom-package' ? 'search-screen-type-value-selected' : ''}`}
              >
                <span>4,500 results</span>
              </div>
            </div>
          </div>
            */}
          {/*Results*/}
          <div
            style={{
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 13,
              color: '#8c8c8c',
            }}
          >
            <span style={{ color: ' #000000' }}>
              1 - 16 over 7,000 results for{' '}
              <span
                style={{ color: ' #ec781c', marginLeft: 5, fontWeight: 600 }}
              >
                "Zapatillas"
              </span>
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                boxSizing: 'border-box',
                gap: 20,
                fontSize: '13px',
                color: '#8c8c8c',
              }}
            >
              <span>Ready to ship</span>
              <span>Personal Protective</span>
              <span>Buyer Central</span>
            </div>
          </div>
        </div>
        <div className="search-screen-content-container">
          {selectedSubscriptionType === 'standar-package' && (
            <>
              {/*
          <section
            className="search-screen-content-section-container"
            id="standar-packages-section"
            aria-labelledby="standar-packages-title"
          >
            <h2 id="standar-packages-title">Paquetes de Suscripcion</h2>
            <span>(1,400 resultados)</span>
          </section>
            */}
              <section
                className="search-screen-grid"
                aria-label="Paquetes de Suscripcion"
              >
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
                      <div
                        className="card-image-default"
                        aria-hidden="true"
                      ></div>
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
              </section>
              <nav
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
          )}
          {selectedSubscriptionType === 'custom-package' && (
            <>
              {/*
              <section
                className="search-screen-content-section-container"
                id="custom-packages-section"
                aria-labelledby="custom-packages-title"
              >
                <h2 id="custom-packages-title">Paquetes Personalizables</h2>
                <span>(300 resultados)</span>
              </section>
              */}
              <section
                className="search-screen-grid"
                aria-label="Paquetes Personalizables"
              >
                {custom_packages.slice(0, 3).map((_, index) => (
                  <article
                    className="card-content custom-package-card-content"
                    key={index}
                  >
                    <div className="card-content-information custom-package-card-content-information">
                      <div className="card-content-information-description-container">
                        <div className="card-tag">
                          <span>Belleza y Care</span>
                        </div>
                        <div className="store-container">
                          <div className="store-container-avatar"></div>
                          <div className="store-container-data-content">
                            <span className="store-container-name">
                              Beauty Store
                            </span>
                            <span className="store-container-username">
                              @beautystoreofficial
                            </span>
                          </div>
                        </div>
                        <div className="card-started-amount-content">
                          <h4>Desde $4,500</h4>
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
                        onClick={() =>
                          (window.location.href = '/custom-package')
                        }
                      >
                        View Package
                      </button>
                    </div>
                  </article>
                ))}
              </section>
              <nav
                className="pagination-container"
                aria-label="Paginación de paquetes personalizables"
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
          )}
        </div>
      </div>
    </>
  );
};

export default SearchScreenComponent;
