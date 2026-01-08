import React, { useRef, useEffect, useState } from 'react';
//import '../../public/styles/planCarouselStyles.css';
import '../../public/styles/globalStyles.css';
import '../../public/styles/customPackagesCarouselStyles.css';

interface CustomPackageData {
  _id: string;
}

const products: { imageUrl: string }[] = [
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/6d442ee1f2-8a606d81ec00a1efbd03.png',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/160c4ddaf6-5a555f543befeebf3495.png',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/2b820703f6-dd91c6c4c1374fda7a40.png',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/fd7b3621ed-6618d9f426da27b07c77.png',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/2167e4c7d0-baf0f55b5307d6e1bd16.png',
  },
];

const FeaturedCustomPackagesCarusel: React.FC = () => {
  const packages: CustomPackageData[] = [
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
            {packages.map((_, index) => (
              <article className="custom-package-card" key={index}>
                <div className="custom-package-card-content">
                  <div className="custom-package-card-image-container">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/254c6dc983-b74c8b6733c5eb980631.png"
                      className="custom-package-card-image"
                      alt={`Custom ${index}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="custom-package-card-image-layer">
                      <div className="custom-package-card-info-tag">
                        <span>3.5 ★ (1,500)</span>
                      </div>
                    </div>
                  </div>
                  <div className="custom-package-card-info-content">
                    <div className="custom-package-card-info">
                      <span>BEAUTY AND CARE</span>
                      <h3>Wellness Ritual Collection</h3>
                      <span style={{ marginBottom: 10 }}>
                        By{' '}
                        <span style={{ color: '#1890ff', marginLeft: 3 }}>
                          Pure Essence Studio
                        </span>
                      </span>

                      <div className="custom-package-card-info-items">
                        {products.map((item, index) => (
                          <img
                            className="custom-package-card-info-product-icon"
                            key={index}
                            src={item.imageUrl}
                            alt={`Img ${index}`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                          />
                        ))}
                        <span className="custom-package-card-info-items-more-label">
                          +3 more
                        </span>
                      </div>
                      {/*
                      <div className="custom-package-card-info-items">
                        <div className="custom-package-card-info-tag">
                          <span>Online Classes</span>
                        </div>
                      </div>
                      <div className="custom-package-card-info-items">
                        <div className="custom-package-card-info-tag">
                          <span>Member discounts</span>
                        </div>
                      </div>
                      <div className="custom-package-card-info-items">
                        <div className="custom-package-card-info-tag">
                          <span>Member discounts</span>
                        </div>
                      </div>
                      
                        */}
                    </div>
                    <button
                      className="card-button"
                      style={{ margin: 0 }}
                      onClick={() => (window.location.href = '/custom-package')}
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
  );
};

export default FeaturedCustomPackagesCarusel;
