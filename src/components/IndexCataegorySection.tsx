import React, { useRef, useEffect, useState } from 'react';
import '../../public/styles/collectionsCarouselStyles.css';
import '../../public/styles/categoriesCarouselStyles.css';

interface CategoryData {
  _id: string;
  title: string;
  imageUrl: string;
}

const IndexCataegorySection: React.FC = () => {
  const categories: CategoryData[] = [
    {
      _id: '1',
      title: 'Deportes',
      imageUrl:
        'https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      _id: '2',
      title: 'Hogar',
      imageUrl:
        'https://images.unsplash.com/photo-1721109890030-00faaa68981f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },

    {
      _id: '11',
      title: 'Libros',
      imageUrl:
        'https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      _id: '10',
      title: 'Automotriz',
      imageUrl:
        'https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      _id: '3',
      title: 'Tecnología',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1719930117885-0a0b2c65eb64?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      _id: '4',
      title: 'Moda',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1714226831049-98eb98f2b498?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },

    {
      _id: '5',
      title: 'Salud y Bienestar',
      imageUrl:
        'https://s3.images-iherb.com/blog/uploads/must-have-products-2022-large.jpg',
    },

    {
      _id: '7',
      title: 'Juguetes',
      imageUrl:
        'https://as1.ftcdn.net/v2/jpg/03/44/87/48/1000_F_344874824_1IcMSNQQeGhbp7KpS6rH87DX7IGF9Nw0.jpg',
    },
    {
      _id: '8',
      title: 'Mascotas',
      imageUrl:
        'https://img.freepik.com/free-photo/cute-pet-bag-arrangement_23-2148982394.jpg?t=st=1740598263~exp=1740601863~hmac=6a183654d3404a73d160bfa6fe8ef9b32786bf4661cc9ebcdbdd26bc25504620&w=740',
    },
    {
      _id: '9',
      title: 'Geek Merch',
      imageUrl:
        'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    if (indexRef.current > categories.length - 1) indexRef.current = 0;
    update();
  };

  const goPrev = () => {
    indexRef.current -= groupSize;
    if (indexRef.current < 0) indexRef.current = (groupsCount - 1) * groupSize;
    update();
  };

  // Agrupación para dots
  const groupSize = 3;
  const groupsCount = Math.ceil(categories.length / groupSize);
  const getActiveDot = () => Math.floor(indexRef.current / groupSize);
  const goToGroup = (groupIdx: number) => {
    indexRef.current = groupIdx * groupSize;
    if (indexRef.current > categories.length - 1)
      indexRef.current = categories.length - 1;
    update();
  };

  useEffect(() => {
    const handleResize = () => update();
    window.addEventListener('resize', handleResize);
    update();
    return () => window.removeEventListener('resize', handleResize);
  }, [categories.length]);

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
      if (movedBy < -50 && indexRef.current < categories.length - 1) {
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
  }, [categories.length]);

  return (
    <>
      <section
        className="carousel category-carousel"
        style={{ position: 'relative' }}
      >
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
          }}
        >
          <span>{'<'}</span>
        </div>
        <div className="viewport category-carousel-viewport">
          <div className="track" ref={trackRef}>
            {categories.map((category) => (
              <article className="collection-card" key={category._id}>
                <div className="category-carousel-card-content">
                  <img
                    src={category.imageUrl}
                    className="category-carousel-card-img"
                    alt={`${category.title}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="category-carousel-card-layer">
                    <h3>{category.title}</h3>
                    <a href="/">View Category</a>
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
          }}
        >
          <span>{'>'}</span>
        </div>
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

export default IndexCataegorySection;
