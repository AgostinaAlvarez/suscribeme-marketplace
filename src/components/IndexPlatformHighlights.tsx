import React, { useEffect, useState, useCallback } from 'react';

const IndexPlatformHighlights: React.FC = () => {
  const highlights: {
    imageUrl: string;
    title: string;
    description: string;
    briefDescription: string;
    tagText: string;
  }[] = [
    {
      imageUrl: '/assets/flatIcons/box.svg',
      title: 'Suscripciones listas para vos',
      description:
        'Descubrí paquetes de suscripción creados por vendedores, con planes mensuales o anuales según tus necesidades.',
      briefDescription:
        'Paquetes de suscripción con planes mensuales o anuales.',
      tagText: 'Ver paquetes',
    },
    {
      imageUrl: '/assets/flatIcons/shopping-cart.svg',
      title: 'Armá tu plan a medida',
      description:
        'Elegí productos, servicios o beneficios y creá tu propia suscripción personalizada desde un solo lugar.',
      briefDescription:
        'Combiná productos y servicios para crear tu suscripción.',
      tagText: 'Crear mi plan',
    },
    {
      imageUrl: '/assets/flatIcons/quality.svg',
      title: 'Vendedores verificados',
      description:
        'Trabajamos con marcas y comercios que cumplen estándares de calidad y servicio.',
      briefDescription: 'Marcas y comercios verificados por la plataforma.',
      tagText: 'Cómo validamos',
    },
    {
      imageUrl: '/assets/flatIcons/credit-card.svg',
      title: 'Pagos simples y recurrentes',
      description:
        'Pagá tu suscripción de forma automática, segura y sin preocupaciones todos los meses.',
      briefDescription: 'Pagos automáticos y seguros todos los meses.',
      tagText: 'Ver medios de pago',
    },
    {
      imageUrl: '/assets/flatIcons/discount-tag.svg',
      title: 'Beneficios por suscribirte',
      description:
        'Accedé a precios especiales, descuentos exclusivos y beneficios solo para suscriptores.',
      briefDescription: 'Descuentos y beneficios exclusivos por suscribirte.',
      tagText: 'Ver beneficios',
    },
    {
      imageUrl: '/assets/flatIcons/coupon.svg',
      title: 'Promos y cupones activos',
      description:
        'Aplicá cupones de descuento en paquetes seleccionados y aprovechá ofertas por tiempo limitado.',
      briefDescription:
        'Cupones y promociones disponibles por tiempo limitado.',
      tagText: 'Ver promociones',
    },
    {
      imageUrl: '/assets/flatIcons/transaction.svg',
      title: 'Control total de tu gasto',
      description:
        'Conocé el total mensual de tu suscripción antes de pagar y ajustala cuando quieras.',
      briefDescription: 'Visualizá y ajustá tu gasto mensual fácilmente.',
      tagText: 'Gestionar suscripción',
    },
    {
      imageUrl: '/assets/flatIcons/tracking.svg',
      title: 'Envíos y retiros claros change',
      description:
        'Cada paquete indica si el envío es a domicilio o retiro en tienda, con costos y tiempos transparentes.',
      briefDescription: 'Opciones claras de envío a domicilio o retiro.',
      tagText: 'Cómo funciona',
    },
    {
      imageUrl: '/assets/flatIcons/discount.svg',
      title: 'Ahorrá más a largo plazo',
      description:
        'Los planes anuales y las suscripciones combinadas ofrecen mejores precios que las compras individuales.',
      briefDescription: 'Mejores precios con planes anuales o combinados.',
      tagText: 'Comparar planes',
    },
  ];
  // Inicializa con valor seguro para SSR
  const [itemsPerSlice, setItemsPerSlice] = useState(6);
  const [currentSlice, setCurrentSlice] = useState(0);
  const [slices, setSlices] = useState<(typeof highlights)[number][][]>([]);

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

  // Agrupa los highlights en slices
  const groupHighlights = useCallback((perSlice: number) => {
    const grouped: (typeof highlights)[number][][] = [];
    for (let i = 0; i < highlights.length; i += perSlice) {
      grouped.push(highlights.slice(i, i + perSlice));
    }
    setSlices(grouped);
    setItemsPerSlice(perSlice);
    setCurrentSlice(0);
  }, []);

  useEffect(() => {
    // Solo en cliente: calcula items por slice y agrupa
    const getItemsPerSlice = () => (window.innerWidth < 1200 ? 5 : 6);
    groupHighlights(getItemsPerSlice());
    // Set mobileComponent state based on window width
    const checkMobile = () => {
      setMobileComponent(window.innerWidth < 910);
    };
    checkMobile();
    const handleResize = () => {
      groupHighlights(getItemsPerSlice());
      checkMobile();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [groupHighlights]);

  // Animación fade+slide controlada como highlightsSlider.js
  const [animating, setAnimating] = useState(false);
  const [visibleSlice, setVisibleSlice] = useState(currentSlice);
  const [animStyles, setAnimStyles] = useState<{
    [key: number]: React.CSSProperties;
  }>({});
  const [showIncoming, setShowIncoming] = useState(false);

  const goToSlice = (idx: number) => {
    if (animating || idx === currentSlice || idx < 0 || idx >= slices.length)
      return;
    setAnimating(true);
    setShowIncoming(false);
    // Slice saliente: fade + slide out
    setAnimStyles({
      [currentSlice]: {
        display: 'grid',
        opacity: 1,
        transform: 'translateX(0)',
        gridTemplateColumns: `repeat(${itemsPerSlice}, 1fr)`,
      },
      [idx]: {
        display: 'none',
        opacity: 0,
        transform:
          idx > currentSlice ? 'translateX(40px)' : 'translateX(-40px)',
        gridTemplateColumns: `repeat(${itemsPerSlice}, 1fr)`,
      },
    });
    setVisibleSlice(idx);
    // Espera 10ms para forzar el reflow y aplicar la transición de salida
    setTimeout(() => {
      setAnimStyles((prev) => ({
        ...prev,
        [currentSlice]: {
          transition:
            'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          opacity: 0,
          transform:
            idx > currentSlice ? 'translateX(-40px)' : 'translateX(40px)',
          display: 'grid',
          gridTemplateColumns: `repeat(${itemsPerSlice}, 1fr)`,
        },
        [idx]: prev[idx],
      }));
      // Espera la transición del saliente (600ms)
      setTimeout(() => {
        // Slice entrante: display grid, opacity 0, transform desplazado
        setAnimStyles((prev) => ({
          ...prev,
          [idx]: {
            display: 'grid',
            opacity: 0,
            transform:
              idx > currentSlice ? 'translateX(40px)' : 'translateX(-40px)',
            gridTemplateColumns: `repeat(${itemsPerSlice}, 1fr)`,
          },
        }));
        setShowIncoming(true);
        // Espera 10ms para forzar el reflow y aplicar la transición de entrada
        setTimeout(() => {
          setAnimStyles((prev) => ({
            ...prev,
            [idx]: {
              transition:
                'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)',
              opacity: 1,
              transform: 'translateX(0)',
              display: 'grid',
              gridTemplateColumns: `repeat(${itemsPerSlice}, 1fr)`,
            },
          }));
          setCurrentSlice(idx);
          // Espera la transición del entrante y oculta el saliente
          setTimeout(() => {
            setAnimStyles({
              [idx]: {
                opacity: 1,
                transform: 'translateX(0)',
                display: 'grid',
                gridTemplateColumns: `repeat(${itemsPerSlice}, 1fr)`,
              },
            });
            setAnimating(false);
            setShowIncoming(false);
          }, 600);
        }, 10);
      }, 600);
    }, 10);
  };

  useEffect(() => {
    // Cuando cambia el agrupamiento, resetea estilos y slice visible
    setVisibleSlice(currentSlice);
    setAnimStyles({
      [currentSlice]: {
        opacity: 1,
        transform: 'translateX(0)',
        display: 'grid',
        gridTemplateColumns: `repeat(${itemsPerSlice}, 1fr)`,
      },
    });
    setShowIncoming(false);
  }, [slices, itemsPerSlice, currentSlice]);

  return (
    <>
      {mobileComponent ? (
        <>
          <div className="highlights-responsive-carousel">
            <div className="highlights-responsive-group">
              {highlights.map((item, index) => (
                <div key={index} className="highlights-responsive-card">
                  <div className="index-highlight-grid-item-header">
                    <h3>{item.title}</h3>
                    <img
                      src={item.imageUrl}
                      width="73"
                      height="73"
                      alt={item.title}
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="index-highlight-grid-item-bottom">
                    <p>{item.briefDescription}</p>
                    <div className="index-highlight-grid-item-bottom-tag">
                      <span>{item.tagText}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <section
          aria-labelledby="highlights-section"
          className="index-section-container index-default-section highlights-section"
        >
          <div className="highlights-slider-container">
            <div className="highlights-slider" id="highlights-slider">
              {slices.map((slice, idx) => {
                // Renderiza el slice saliente y el entrante solo cuando corresponde
                if (animating && idx === visibleSlice && !showIncoming) {
                  return (
                    <div
                      key={idx}
                      className={`highlights-slide${idx === currentSlice ? ' active' : ''}`}
                      style={animStyles[idx]}
                      data-slide={idx + 1}
                    >
                      {slice.map((item, i) => (
                        <div className="index-highlight-grid-item" key={i}>
                          <div className="index-highlight-grid-item-header">
                            <h3>{item.title}</h3>
                            <img
                              src={item.imageUrl}
                              width="73"
                              height="73"
                              alt={item.title}
                              decoding="async"
                              referrerPolicy="no-referrer"
                              loading={i > 5 ? 'lazy' : undefined}
                            />
                          </div>
                          <div className="index-highlight-grid-item-bottom">
                            <p>{item.briefDescription}</p>
                            <div className="index-highlight-grid-item-bottom-tag">
                              <span>{item.tagText}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                if (animating && idx === visibleSlice && showIncoming) {
                  return (
                    <div
                      key={idx}
                      className={`highlights-slide${idx === currentSlice ? ' active' : ''}`}
                      style={animStyles[idx]}
                      data-slide={idx + 1}
                    >
                      {slice.map((item, i) => (
                        <div className="index-highlight-grid-item" key={i}>
                          <div className="index-highlight-grid-item-header">
                            <h3>{item.title}</h3>
                            <img
                              src={item.imageUrl}
                              width="73"
                              height="73"
                              alt={item.title}
                              decoding="async"
                              referrerPolicy="no-referrer"
                              loading={i > 5 ? 'lazy' : undefined}
                            />
                          </div>
                          <div className="index-highlight-grid-item-bottom">
                            <p>{item.briefDescription}</p>
                            <div className="index-highlight-grid-item-bottom-tag">
                              <span>{item.tagText}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                // Renderiza el slice actual cuando no hay animación
                if (!animating && idx === currentSlice) {
                  return (
                    <div
                      key={idx}
                      className={`highlights-slide active`}
                      style={
                        animStyles[idx] || {
                          opacity: 1,
                          transform: 'translateX(0)',
                          display: 'grid',
                          gridTemplateColumns: `repeat(${itemsPerSlice}, 1fr)`,
                        }
                      }
                      data-slide={idx + 1}
                    >
                      {slice.map((item, i) => (
                        <div className="index-highlight-grid-item" key={i}>
                          <div className="index-highlight-grid-item-header">
                            <h3>{item.title}</h3>
                            <img
                              src={item.imageUrl}
                              width="73"
                              height="73"
                              alt={item.title}
                              decoding="async"
                              referrerPolicy="no-referrer"
                              loading={i > 5 ? 'lazy' : undefined}
                            />
                          </div>
                          <div className="index-highlight-grid-item-bottom">
                            <p>{item.briefDescription}</p>
                            <div className="index-highlight-grid-item-bottom-tag">
                              <span>{item.tagText}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="highlights-slider-nav">
              <button
                className="highlights-slider-arrow highlights-slider-arrow-left"
                aria-label="Anterior"
                onClick={() => goToSlice(currentSlice - 1)}
                disabled={currentSlice === 0 || animating}
              >
                &lt;
              </button>
              <button
                className="highlights-slider-arrow highlights-slider-arrow-right"
                aria-label="Siguiente"
                onClick={() => goToSlice(currentSlice + 1)}
                disabled={currentSlice === slices.length - 1 || animating}
              >
                &gt;
              </button>
            </div>
            <ul className="highlights-slider-dots">
              {slices.map((_, idx) => (
                <li
                  key={idx}
                  className={idx === currentSlice ? 'active' : ''}
                  onClick={() => goToSlice(idx)}
                  aria-label={`Ir al grupo ${idx + 1}`}
                  tabIndex={0}
                  role="button"
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default IndexPlatformHighlights;
