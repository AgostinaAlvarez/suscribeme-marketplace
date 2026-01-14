import React, { useState } from 'react';
import StandarPackagesSection from '../components/CategoriesScreen/StandarPackagesSection';
import CustomPackagesSection from '../components/CategoriesScreen/CustomPackagesSection';

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

interface CustomPackageData {
  _id: string;
}

const CategoriesScreen: React.FC = () => {
  const subscriptionTypeOptions = [
    'Productos',
    'Servicios',
    'Mistery Box',
    'Beneficios',
    'Descuentos',
  ];

  const filterTypeOptions = ['Más Relevante', 'Menor Precio', 'Mayor Precio'];

  const [selectedTypeOptions, setSelectedTypeOptions] = useState<string[]>([]);
  const [selectedFilterTypeOptions, setSelectedFilterTypeOptions] = useState<
    string[]
  >([]);

  const toggleOption = (
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const [priceAmountFilter, setPriceAmountFilter] = useState<
    (number | undefined)[]
  >([]);

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

  const customPackages: CustomPackageData[] = [
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

  return (
    <>
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div className="categories-screen-responsive-banner">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="banner Img"
            className="categories-screen-responsive-banner-img"
          />
          <div className="categories-screen-responsive-banner-layer">
            <h2>Beauty & Health</h2>
            <div
              className="nav-search-bar-container nav-search-bar-container-principal-structure"
              style={{
                width: '100%',
                borderRadius: 10,
                backgroundColor: '#fff',
              }}
            >
              <div
                className="nav-search-bar-icon-container"
                style={{ border: 'none' }}
              >
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
                Search for anything
              </span>
            </div>
          </div>
        </div>
        <div className="categories-screen-section-container categories-screen-main-grid">
          {/*LEFT COL - SEARCHER*/}
          <div className="search-screen-main-grid-search-container">
            <div className="search-screen-main-grid-search-box">
              <div className="search-screen-main-grid-search-box-header">
                <span style={{ fontSize: 16, fontWeight: 600 }}>Filter</span>
                <span
                  style={{ fontSize: 12, color: '#1890ff', cursor: 'pointer' }}
                >
                  Reset Filters
                </span>
              </div>
              <div className="divider"></div>
              <div className="search-screen-main-grid-search-box-section">
                <h3>Tipo de suscripcion</h3>
                {subscriptionTypeOptions.map((option) => (
                  <label key={option} className="checkbox square">
                    <input
                      type="checkbox"
                      checked={selectedTypeOptions.includes(option)}
                      onChange={() =>
                        toggleOption(
                          option,
                          selectedTypeOptions,
                          setSelectedTypeOptions,
                        )
                      }
                    />
                    <span className="custom-box" />
                    {option}
                  </label>
                ))}
              </div>
              <div className="divider"></div>
              <div className="search-screen-main-grid-search-box-section">
                <h3>Sort By</h3>
                {filterTypeOptions.map((option) => (
                  <label key={option} className="checkbox circle">
                    <input
                      type="checkbox"
                      checked={selectedFilterTypeOptions.includes(option)}
                      onChange={() =>
                        toggleOption(
                          option,
                          selectedFilterTypeOptions,
                          setSelectedFilterTypeOptions,
                        )
                      }
                    />
                    <span className="custom-box" />
                    {option}
                  </label>
                ))}
              </div>
              <div className="divider"></div>
              <div className="search-screen-main-grid-search-box-section">
                <h3>Price Range</h3>
                <div className="search-screen-main-grid-search-box-price-container">
                  <span className="search-screen-main-grid-search-box-price-container">
                    Minimum
                  </span>
                  <div className="search-screen-main-grid-search-box-price-input-container">
                    <span>$</span>
                    <input
                      type="number"
                      style={{
                        width: '100%',
                        fontSize: 12,
                        padding: '0px',
                        boxSizing: 'border-box',
                        border: 'none',
                      }}
                      min={0}
                      value={
                        priceAmountFilter[0] === undefined
                          ? ''
                          : priceAmountFilter[0]
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        const newMin = val === '' ? undefined : Number(val);
                        const newMax = priceAmountFilter[1];
                        if (
                          (newMin === undefined || newMin === 0) &&
                          (newMax === undefined || newMax === 0)
                        ) {
                          setPriceAmountFilter([]);
                        } else {
                          setPriceAmountFilter([newMin, newMax]);
                        }
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="search-screen-main-grid-search-box-price-container">
                  <span className="search-screen-main-grid-search-box-price-container">
                    Maximum
                  </span>
                  <div className="search-screen-main-grid-search-box-price-input-container">
                    <span>$</span>
                    <input
                      type="number"
                      style={{
                        width: '100%',
                        fontSize: 12,
                        padding: '0px',
                        boxSizing: 'border-box',
                        border: 'none',
                      }}
                      min={0}
                      value={
                        priceAmountFilter[1] === undefined
                          ? ''
                          : priceAmountFilter[1]
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        const newMax = val === '' ? undefined : Number(val);
                        const newMin = priceAmountFilter[0];
                        if (
                          (newMin === undefined || newMin === 0) &&
                          (newMax === undefined || newMax === 0)
                        ) {
                          setPriceAmountFilter([]);
                        } else {
                          setPriceAmountFilter([newMin, newMax]);
                        }
                      }}
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>
              <button
                className="card-button"
                style={{ margin: 0 }}
                //onClick={() => (window.location.href = '/package')}
              >
                Apply
              </button>
            </div>
          </div>
          {/*RIGHT COL - CONTENT*/}
          <div className="categories-screen-main-grid-content-container">
            <div className="categories-screen-main-grid-banner">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="banner Img"
                className="categories-screen-main-grid-banner-img"
              />
              <div className="categories-screen-main-grid-banner-layer">
                <h2>Beauty & Health</h2>
              </div>
            </div>
            <div className="categories-screen-search-navbar">
              <div
                className="nav-search-bar-container nav-search-bar-container-principal-structure categories-screen-search-bar-desktop"
                style={{ width: '100%', borderRadius: 10 }}
              >
                <div
                  className="nav-search-bar-icon-container"
                  style={{ border: 'none' }}
                >
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
                  Search for anything
                </span>
              </div>
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
              <div className="categories-screen-filters-box">
                <img
                  src="/assets/icons/filter-icon.svg"
                  alt="Menu icon"
                  width="14"
                  height="14"
                  style={{ cursor: 'pointer' }}
                />
                <span>Filters</span>
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
                <div className="categories-screen-results-container">
                  <span className="categories-screen-results-span ">
                    1-16 of over 2,000 results
                  </span>
                  <div className="categories-screen-filters-box-mobile">
                    <img
                      src="/assets/icons/filter-icon.svg"
                      alt="Menu icon"
                      width="14"
                      height="14"
                      style={{ cursor: 'pointer' }}
                    />
                    <span>Filters</span>
                  </div>
                </div>
                {subscritpionType === 'standar-packages' && (
                  <StandarPackagesSection packages={standarPackages} />
                )}
                {subscritpionType === 'custom-packages' && (
                  <CustomPackagesSection packages={customPackages} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesScreen;
