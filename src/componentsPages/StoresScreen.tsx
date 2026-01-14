import React, { useEffect, useRef, useState } from 'react';

interface Category {
  id: string;
  label: string;
}

interface CategoriesFilterProps {
  categories: Category[];
}

const StoresScreen: React.FC = () => {
  const categories: { id: string; label: string }[] = [
    { id: 'tech', label: 'Technology' },
    { id: 'arts', label: 'Arts and Entertainment' },
    { id: 'finance', label: 'Finance' },
    { id: 'food', label: 'Food and Drink' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'travel', label: 'Travel and tourism' },
    { id: 'shopping', label: 'E-Commerce and Shopping' },
    { id: 'business', label: 'Business and Consumer Services' },
    { id: 'news', label: 'News and Media' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'luxury', label: 'Luxury' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeSubscriptionType = (categoryId: string) => {
    window.scrollTo(0, 0);
    setLoading(true);
    setSelectedCategory(categoryId);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  //////

  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft < maxScroll - 1); // margen por decimales
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;

    el.scrollTo({
      left:
        direction === 'left' ? el.scrollLeft - amount : el.scrollLeft + amount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateArrows();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  //////

  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const hero = document.querySelector('.sticky-ref');
          const heroHeight = hero
            ? hero.getBoundingClientRect().bottom + window.scrollY
            : 400;
          if (window.scrollY > heroHeight - 80) {
            setShowStickyBar(true);
          } else {
            setShowStickyBar(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="stores-screen-hero-section">
        <div className="stores-screen-section-container stores-screen-hero-section-content">
          <h1>Where brands live</h1>
          <p>The internet’s source for company logos and brand assets.</p>
        </div>
      </section>
      <div className="stores-screen-section-container categories-wrapper-container sticky-ref">
        <div className="categories-wrapper">
          {showLeft && (
            <button
              className="arrow left"
              onClick={() => scrollByAmount('left')}
              aria-label="Scroll left"
            >
              ‹
            </button>
          )}

          <div className="categories-scroll" ref={scrollRef}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="category-item"
                onClick={() => {
                  handleChangeSubscriptionType(cat.id);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {showRight && (
            <button
              className="arrow right"
              onClick={() => scrollByAmount('right')}
              aria-label="Scroll right"
            >
              ›
            </button>
          )}
        </div>
      </div>
      {/*
      <section className="stores-screen-section-container stores-screen-categories-container">
        {categoriesList.map((cat, index) => (
          <div
            key={index}
            className={`stores-screen-category-item ${selectedCategory === cat._id ? 'stores-screen-category-item-cta' : ''}`}
            onClick={() => {
              handleChangeSubscriptionType(cat._id);
            }}
          >
            <span>Categorie</span>
          </div>
        ))}
      </section>
        */}
      <section
        id="categories-sticky"
        className="stores-screen-navigation-sticky-bar"
        style={{
          opacity: showStickyBar ? 1 : 0,
          pointerEvents: showStickyBar ? 'auto' : 'none',
          transition: 'opacity 0.3s',
          position: 'fixed',
          top: '60px',
          left: 0,
          width: '100%',
          zIndex: 1000,
        }}
        aria-hidden={!showStickyBar}
      >
        <div className="stores-screen-section-container categories-wrapper-container">
          <div className="categories-wrapper">
            {showLeft && (
              <button
                className="arrow left"
                onClick={() => scrollByAmount('left')}
                aria-label="Scroll left"
              >
                ‹
              </button>
            )}

            <div className="categories-scroll" ref={scrollRef}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="category-item"
                  onClick={() => {
                    handleChangeSubscriptionType(cat.id);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {showRight && (
              <button
                className="arrow right"
                onClick={() => scrollByAmount('right')}
                aria-label="Scroll right"
              >
                ›
              </button>
            )}
          </div>
        </div>
      </section>
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
          <section className="stores-screen-section-container stores-screen-principal-grid">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="stores-screen-store-card"
                onClick={() => (window.location.href = '/store')}
              >
                <div className="stores-screen-store-card-header">
                  <div className="stores-screen-store-card-header-avatar-container"></div>
                </div>
                <div className="stores-screen-store-card-content">
                  <h2>Store Namee</h2>
                  <span>@storeusername</span>
                  <p>Skincare essentials developed by Hailey Rhode Bieber.</p>
                </div>
              </div>
            ))}
          </section>
          <nav
            style={{ marginTop: 30 }}
            className="pagination-container stores-screen-pagination-container"
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
    </>
  );
};

export default StoresScreen;
