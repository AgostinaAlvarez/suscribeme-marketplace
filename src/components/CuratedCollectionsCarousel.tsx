import React, { useRef, useEffect, useState } from 'react';
import '../../public/styles/collectionsCarouselStyles.css';

interface CollectionData {
  _id: string;
  backgroundImage: string;
}

const CuratedCollectionsCarousel: React.FC = () => {
  const collections: CollectionData[] = [
    {
      _id: '1',
      backgroundImage:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/641b392a21-3a232533995147ffffc9.png',
    },
    {
      _id: '2',
      backgroundImage:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/be77f1ca14-ef813a924047c6cc92b3.png',
    },
    {
      _id: '3',
      backgroundImage:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/738061918c-722a2cbc2d0f269175b5.png',
    },
    {
      _id: '4',
      backgroundImage:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/3aa9e1fbf5-a5a97cd5560f57f138fd.png',
    },
    {
      _id: '5',
      backgroundImage:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/620556fbe8-af67a6a8be8994b50802.png',
    },
  ];

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
    if (indexRef.current > collections.length - 1) indexRef.current = 0;
    update();
  };

  const goPrev = () => {
    indexRef.current -= groupSize;
    if (indexRef.current < 0) indexRef.current = (groupsCount - 1) * groupSize;
    update();
  };

  // Agrupación para dots
  const groupSize = 3;
  const groupsCount = Math.ceil(collections.length / groupSize);
  const getActiveDot = () => Math.floor(indexRef.current / groupSize);
  const goToGroup = (groupIdx: number) => {
    indexRef.current = groupIdx * groupSize;
    if (indexRef.current > collections.length - 1)
      indexRef.current = collections.length - 1;
    update();
  };

  useEffect(() => {
    const handleResize = () => update();
    window.addEventListener('resize', handleResize);
    update();
    return () => window.removeEventListener('resize', handleResize);
  }, [collections.length]);

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
      if (movedBy < -50 && indexRef.current < collections.length - 1) {
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
  }, [collections.length]);

  return (
    <>
      <section className="carousel" style={{ position: 'relative' }}>
        {/*
        <button className="arrow prev" onClick={goPrev}>
          {'<'}
        </button>
          */}
        <div
          onClick={goPrev}
          style={{
            height: '50px',
            width: '45px',
            position: 'absolute',
            zIndex: 200,
            left: -20,
            borderRadius: '10px 5px 5px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#fff',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)', // box-shadow más prominente
            userSelect: 'none',
          }}
        >
          <span>{'<'}</span>
        </div>
        <div className="viewport">
          <div className="track" ref={trackRef}>
            {collections.map((collection) => (
              <article className="collection-card" key={collection._id}>
                <div className="collection-card-content">
                  <div
                    className="collection-card-content-img"
                    style={{
                      //backgroundImage: collection.backgroundImage,
                      backgroundImage: `url('${collection.backgroundImage}')`,
                    }}
                  ></div>
                  <div className="collection-card-content-layer">
                    <h3>Work From Home Essentials</h3>
                    <p>12 subscriptions perfect for remote workers</p>
                    <a href="/collections/collection">Explore collection</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div
          onClick={goNext}
          style={{
            height: '50px',
            width: '45px',
            position: 'absolute',
            zIndex: 200,
            right: -20,
            borderRadius: '5px 10px 10px 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#fff',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)', // box-shadow más prominente
            userSelect: 'none',
          }}
        >
          <span>{'>'}</span>
        </div>
        {/*
        <button className="arrow next" onClick={goNext}>
          {'>'}
        </button>
          */}
      </section>
      <ul
        className="dots"
        style={{
          position: 'relative',
          bottom: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {Array.from({ length: groupsCount }).map((_, groupIdx) => (
          <li
            key={groupIdx}
            onClick={() => goToGroup(groupIdx)}
            style={{
              width: 10,
              height: 10,
              background: getActiveDot() === groupIdx ? 'red' : '#ccc',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'background 0.2s',
              border: 'none',
              margin: 0,
              padding: 0,
            }}
          ></li>
        ))}
      </ul>
    </>
  );
};

export default CuratedCollectionsCarousel;
