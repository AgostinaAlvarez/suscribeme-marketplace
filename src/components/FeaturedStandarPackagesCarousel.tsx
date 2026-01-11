import React, { useRef, useEffect, useState } from 'react';
import '../../public/styles/globalStyles.css';
import '../../public/styles/standarPackagesCarouselStyles.css';

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

const FeaturedStandarPackagesCarousel: React.FC = () => {
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
  // Simulación de petición GET a una API
  //useEffect(() => {
  //  setTimeout(() => {
  //    // Simulamos datos que llegan de una API
  //    setCards([
  //      { _id: '1', title: 'Card 1 desde API' },
  //      { _id: '2', title: 'Card 2 desde API' },
  //      { _id: '3', title: 'Card 3 desde API' },
  //      { _id: '4', title: 'Card 4 desde API' },
  //    ]);
  //  }, 1200); // 1.2 segundos de delay
  //}, []);

  const [mobileComponent, setMobileComponent] = useState<boolean>(false);

  useEffect(() => {
    // Solo ejecuta en cliente
    const checkMobile = () => {
      setMobileComponent(window.innerWidth < 910);
    };
    checkMobile(); // Inicializa al montar
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const prevTranslate = useRef(0);
  const currentTranslate = useRef(0);
  const [_, setRerender] = useState(0);

  const cardWidth = () => {
    const track = trackRef.current;
    if (track && track.firstElementChild) {
      return (track.firstElementChild as HTMLElement).offsetWidth;
    }
    return 0;
  };

  const update = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${indexRef.current * cardWidth()}px)`;
      prevTranslate.current = -indexRef.current * cardWidth();
      setRerender((x) => x + 1); // fuerza re-render
    }
  };

  // Cambia goNext y goPrev para avanzar/retroceder de a grupos (3 en 3)
  const goNext = () => {
    indexRef.current += groupSize;
    if (indexRef.current > packages.length - 1) indexRef.current = 0;
    update();
  };

  const goPrev = () => {
    indexRef.current -= groupSize;
    if (indexRef.current < 0) indexRef.current = (groupsCount - 1) * groupSize;
    update();
  };

  // Agrupación para dots
  const groupSize = 3;
  const groupsCount = Math.ceil(packages.length / groupSize);
  const getActiveDot = () => Math.floor(indexRef.current / groupSize);
  const goToGroup = (groupIdx: number) => {
    indexRef.current = groupIdx * groupSize;
    if (indexRef.current > packages.length - 1)
      indexRef.current = packages.length - 1;
    update();
  };

  useEffect(() => {
    const handleResize = () => update();
    window.addEventListener('resize', handleResize);
    update();
    return () => window.removeEventListener('resize', handleResize);
  }, [packages.length]);

  // Drag functionality
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const dragStart = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      startX.current =
        'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      track.style.transition = 'none';
    };
    const dragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const x =
        'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      currentTranslate.current = prevTranslate.current + (x - startX.current);
      track.style.transform = `translateX(${currentTranslate.current}px)`;
    };
    const dragEnd = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      track.style.transition = 'transform 0.5s ease';
      const x =
        'changedTouches' in e
          ? e.changedTouches[0].clientX
          : (e as MouseEvent).clientX;
      const movedBy = x - startX.current;
      if (movedBy < -50 && indexRef.current < packages.length - 1) {
        indexRef.current++;
      } else if (movedBy > 50 && indexRef.current > 0) {
        indexRef.current--;
      }
      update();
    };
    // Mouse events
    track.addEventListener('mousedown', dragStart as any);
    track.addEventListener('mousemove', dragMove as any);
    track.addEventListener('mouseup', dragEnd as any);
    track.addEventListener('mouseleave', dragEnd as any);
    // Touch events
    track.addEventListener('touchstart', dragStart as any);
    track.addEventListener('touchmove', dragMove as any);
    track.addEventListener('touchend', dragEnd as any);
    return () => {
      track.removeEventListener('mousedown', dragStart as any);
      track.removeEventListener('mousemove', dragMove as any);
      track.removeEventListener('mouseup', dragEnd as any);
      track.removeEventListener('mouseleave', dragEnd as any);
      track.removeEventListener('touchstart', dragStart as any);
      track.removeEventListener('touchmove', dragMove as any);
      track.removeEventListener('touchend', dragEnd as any);
    };
  }, [packages.length]);

  return (
    <>
      {mobileComponent ? (
        <>
          <div className="responsive-carousel">
            <div className="responsive-group">
              {packages.map((pckg, index) => (
                <div key={index} className="responsive-package-card">
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
                      <span className="standar-package-card-info-span">
                        BEAUTY AND CARE
                      </span>
                      <h3>{pckg.title}</h3>
                      <span className="standar-package-card-info-span">
                        By{' '}
                        <span style={{ color: '#1890ff', marginLeft: 3 }}>
                          Pure Essence Studio
                        </span>
                      </span>
                      <p>{pckg.briefDescription}</p>
                      {pckg.plans.map((plan, index) => (
                        <div
                          key={index}
                          className="standar-package-card-plan-container"
                        >
                          <h3>{plan.title}</h3>
                          <div className="standar-package-card-plan-price-tag">
                            <span className="standar-package-card-plan-price">
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
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <section className="carousel" style={{ position: 'relative' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: -10,
                zIndex: 200,
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)', // box-shadow más prominente
              }}
              onClick={goPrev}
            >
              <span>{'<'}</span>
            </div>
            <div className="viewport">
              <div className="track" ref={trackRef}>
                {packages.map((pckg, index) => (
                  <article className="standar-package-card" key={index}>
                    <div className="standar-package-card-content">
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
                          //style={{
                          //  margin: 0,
                          //  lineHeight: 1.4,
                          //  marginBottom: 10,
                          //  fontSize: 12.5,
                          //  color: '#8c8c8c',
                          //  fontWeight: 400,
                          //}}
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
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: -10,
                zIndex: 200,
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)', // box-shadow más prominente
              }}
              onClick={goNext}
            >
              <span>{'>'}</span>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default FeaturedStandarPackagesCarousel;
