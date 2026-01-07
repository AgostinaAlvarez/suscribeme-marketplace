import React, { useRef, useEffect } from 'react';
import '../../public/styles/planCarouselStyles.css';
import '../../public/styles/globalStyles.css';

interface CustomPackageData {
  _id: string;
}

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
  ];

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

  const goNext = () => {
    indexRef.current++;
    if (indexRef.current > packages.length - 1) indexRef.current = 0;
    update();
  };

  const goPrev = () => {
    indexRef.current--;
    if (indexRef.current < 0) indexRef.current = packages.length - 1;
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
      <section className="carousel">
        {/*
        <button className="arrow prev" onClick={goPrev}>
          {'<'}
        </button>
          */}
        <div
          className="carousel-default-button carousel-default-left-button"
          onClick={goPrev}
        >
          <span>{'<'}</span>
        </div>
        <div className="viewport">
          <div className="track" ref={trackRef}>
            {packages.map((_, index) => (
              <article className="card" key={index}>
                <div className="card-content custom-package-card-content">
                  <div className="card-content-information custom-package-card-content-information">
                    <div className="card-content-information-description-container">
                      {/*STORE*/}
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
              </article>
            ))}
          </div>
        </div>
        <div
          className="carousel-default-button carousel-default-right-button"
          onClick={goNext}
        >
          <span>{'>'}</span>
        </div>
        {/*
        <button className="arrow next" onClick={goNext}>
          {'>'}
        </button>
          */}
      </section>
    </>
  );
};

export default FeaturedCustomPackagesCarusel;
