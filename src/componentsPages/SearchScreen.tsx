import React, { useEffect, useState } from 'react';
import HeaderSearchScreen from '../components/HeaderSearchScreen';
import StandarPackagesSection from '../components/SearchScreen/StandarPackagesSection';
import CustomPackagesSection from '../components/SearchScreen/CustomPackagesSection';

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

const SearchScreen: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <>
      <HeaderSearchScreen
        subscritpionType={subscritpionType}
        handleChangeSubscriptionType={handleChangeSubscriptionType}
      />
      <main className="main search-screen-main">
        <div className="search-screen-section-container search-screen-main-grid">
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
          <div className="search-screen-main-grid-content-container">
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
                <div className="search-screen-main-grid-content-header">
                  <span>
                    1-16 of over 2,000 results for{' '}
                    <span style={{ color: 'black' }}>"Zapatillas"</span>
                  </span>
                  {/*
                <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 'fit-content',
                    boxSizing: 'border-box',
                    gap: 5,
                }}
                >
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
                */}
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
      </main>
    </>
  );
};

export default SearchScreen;
