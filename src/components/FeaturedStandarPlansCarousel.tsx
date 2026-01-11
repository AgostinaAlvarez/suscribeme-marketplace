import React, { useRef, useEffect, useState } from 'react';
import '../../public/styles/globalStyles.css';
import '../../public/styles/standarPlansCarouselStyles.css';

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

const FeaturedStandarPlansCarousel: React.FC = () => {
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
    }
  };

  // Agrupación para flechas: mover de 4 en 4 o 3 en 3 según ancho
  const [groupSize, setGroupSize] = React.useState(4);
  const [cardClassName, setCardClassName] =
    useState<string>('standar-plan-card');
  const [groupsCount, setGroupsCount] = React.useState(
    Math.ceil(plans.length / 4),
  );

  useEffect(() => {
    // Solo en cliente: calcula el groupSize y actualiza el número de grupos y la clase de la card
    const getGroupSize = () => (window.innerWidth < 1100 ? 3 : 4);
    const getCardClass = () =>
      window.innerWidth < 1100
        ? 'standar-plan-card-resize'
        : 'standar-plan-card';

    const updateGroup = () => {
      const size = getGroupSize();
      setGroupSize(size);
      setGroupsCount(Math.ceil(plans.length / size));
      setCardClassName(getCardClass());
      // Ajusta el indexRef para no quedar fuera de rango
      if (indexRef.current > plans.length - 1) {
        indexRef.current = 0;
        update();
      }
    };
    updateGroup();
    window.addEventListener('resize', updateGroup);
    return () => window.removeEventListener('resize', updateGroup);
  }, [plans.length]);

  const goNext = () => {
    indexRef.current += groupSize;
    if (indexRef.current > plans.length - 1) indexRef.current = 0;
    update();
  };

  const goPrev = () => {
    indexRef.current -= groupSize;
    if (indexRef.current < 0) indexRef.current = (groupsCount - 1) * groupSize;
    update();
  };

  useEffect(() => {
    const handleResize = () => update();
    window.addEventListener('resize', handleResize);
    update();
    return () => window.removeEventListener('resize', handleResize);
  }, [plans.length]);

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
      if (movedBy < -50 && indexRef.current < plans.length - 1) {
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
  }, [plans.length]);

  return (
    <>
      {mobileComponent ? (
        <>
          <div className="responsive-carousel">
            <div className="responsive-group">
              {plans.map((plan, index) => (
                <div className="responsive-plan-card" key={index}>
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
                          By{' '}
                          <span style={{ color: '#1890ff' }}>
                            Pure Essentials
                          </span>
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
                left: -15,
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
                {plans.map((plan, index) => (
                  <article className="standar-plan-card" key={index}>
                    <div
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
                              By{' '}
                              <span style={{ color: '#1890ff' }}>
                                Pure Essentials
                              </span>
                            </span>
                            <span
                              className="standar-plan-card-price"
                              style={{ color: '#000' }}
                            >
                              $45,00
                              <span style={{ fontSize: '15px' }}>
                                /month
                              </span>{' '}
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
                          onClick={() =>
                            (window.location.href = '/standar-plan')
                          }
                        >
                          View Plan
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
                right: -15,
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

export default FeaturedStandarPlansCarousel;
