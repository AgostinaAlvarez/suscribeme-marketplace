import React, { useEffect, useState, useRef } from 'react';

const PlanDetailsComponent: React.FC = () => {
  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Nuevo estado para saber si el aside debe ocultarse al llegar al footer
  const [hideAside, setHideAside] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Sticky bar
          const hero = document.querySelector('.package-detail-hero-section');
          const heroHeight = hero
            ? hero.getBoundingClientRect().bottom + window.scrollY
            : 400;
          if (window.scrollY > heroHeight - 80) {
            setShowStickyBar(true);
          } else {
            setShowStickyBar(false);
          }

          // Footer detection
          const footer = document.querySelector('footer');
          if (footer) {
            const footerRect = footer.getBoundingClientRect();
            // Ajusta el margen de seguridad para que el aside desaparezca antes de tocar el footer
            const asideBottom = 15 + 450 + 30; // top + height + margen extra (40px)
            if (footerRect.top < asideBottom) {
              setHideAside(true);
            } else {
              setHideAside(false);
            }
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
      {/* ================= STICKY BAR (React) ================= */}
      <section
        id="package-sticky-bar"
        className="package-sticky-bar-section"
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
        <div className="package-sticky-bar-content">
          <span>Complete Digital Marketing Mastery Package</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Subscribe Now
          </button>
        </div>
      </section>
      {/* ================= HERO ================= */}
      <section
        aria-labelledby="hero-section"
        className="plan-detail-hero-section"
      >
        <div className="plan-detail-section-container">
          <div className="plan-detail-hero-content">
            <div className="plan-detail-hero-content-row plan-detail-hero-navigation">
              <h3>Package Name</h3>
              <span>{'>'}</span>
              <h3>Package Name</h3>
              <span>{'>'}</span>
              <h3>Package Name</h3>
            </div>
            <h1 id="hero-section">Plan Mensual</h1>

            <p>
              A Casual Guide for Artificial Intelligence, Deep Learning, and
              Python Programmers
            </p>
            <div className="plan-detail-hero-content-row plan-details-hero-props">
              <div className="plan-detail-hero-content-tag">
                <span>Highest Rated</span>
              </div>
              <span className="plan-detail-hero-rating">
                3.5 ★★★★★ <a href="/">{`(1,867 ratings)`}</a>
              </span>
              <span className="plan-detail-hero-rating-responsive">
                3.5 ★ <a href="/" style={{ marginLeft: 3 }}>{`(1,867)`}</a>
              </span>
              <span>2,616 students</span>
            </div>
            <div className="plan-detail-hero-content-row">
              <span>
                Created by <a href="/store">{`Lazy Programmer Team`}</a>
              </span>
            </div>
            <div className="plan-detail-hero-content-row">
              <span>Last updated 12/2025</span>
            </div>
          </div>

          {/* Renderizado condicional: si hideAside, no renderiza nada */}
          <div
            className="plan-detail-aside-card"
            ref={asideRef}
            style={{
              opacity: hideAside ? 0 : 1,
              pointerEvents: hideAside ? 'none' : 'auto',
              transition: 'opacity 0.3s',
              ...(showStickyBar ? { top: 20, zIndex: 1200 } : { zIndex: 140 }),
            }}
          >
            <div
              className="plan-detail-aside-card-content"
              style={showStickyBar ? { position: 'fixed', zIndex: 1200 } : {}}
            >
              <h3 className="plan-title">Essentials</h3>
              <p className="plan-price">
                <span className="price">$45</span>
                <span className="period">/month</span>
              </p>
              <p className="plan-save">Pay yearly and save 17%</p>

              <p className="plan-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>

              <ul className="plan-features">
                <li>19 instruments and effects</li>
                <li>8 expansions</li>
                <li>Over 15,000 sounds</li>
                <li>50GB+ sample library</li>
              </ul>
              <button className="plan-button plan-primary-button">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ================= ARTICLES IN PLAN ================= */}
      <section
        aria-labelledby="plan-detail-articles-section"
        className="plan-detail-section-container"
      >
        <div className="plan-detail-articles-section-container">
          <h2 id="articles-section" className="plan-detail-section-title">
            Articles In This Plan
          </h2>
          <ul className="plan-detail-articles-section-list">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <article className="plan-detail-articles-section-item">
                  <div className="plan-detail-articles-section-item-avatar"></div>
                  <div className="plan-detail-articles-section-item-info">
                    <h3>Product Name</h3>
                    <p>
                      A Casual Guide for Artificial Intelligence, Deep Learning,
                      and Python Programmers
                    </p>
                    <div className="plan-detail-articles-section-item-info-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        fill="currentColor"
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                      </svg>
                      <span>Recibiras este product 1 vez cada 1 mes</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        fill="currentColor"
                        className="bi bi-truck"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                      </svg>
                      <span>Envio a domicilio</span>
                    </div>
                    <div className="plan-detail-articles-section-item-propeties-values-container plan-detail-articles-section-item-info-row">
                      <span className="plan-detail-articles-section-item-propeties-label">
                        Propiedades:
                      </span>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div
                          key={index}
                          className="plan-detail-articles-section-item-info-tag"
                        >
                          <span>Prop {index}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="plan-detail-articles-section-item-type-container">
                    <div className="plan-detail-articles-section-item-info-tag">
                      <span>Product</span>
                    </div>
                  </div>
                  {/*RESPONSIVE*/}
                  <div className="plan-detail-articles-section-item-responsive-content">
                    <div className="plan-detail-articles-section-item-responsive-details">
                      <div className="plan-detail-articles-section-item-responsive-image"></div>
                      <div className="plan-detail-articles-section-item-responsive-details-info">
                        <h3>Product Name</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor.
                        </p>

                        <div className="plan-detail-articles-section-item-propeties-values-container plan-detail-articles-section-item-info-row">
                          <span className="plan-detail-articles-section-item-propeties-label">
                            Propiedades:
                          </span>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div
                              key={index}
                              className="plan-detail-articles-section-item-info-tag"
                            >
                              <span>Prop {index}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="plan-detail-articles-section-item-responsive-configs-container">
                      <div className="plan-detail-articles-section-item-info-row">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-clock"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg>
                        <span>Recibiras este product 1 vez cada 1 mes</span>
                      </div>
                      <div className="plan-detail-articles-section-item-info-row">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-truck"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                        </svg>
                        <span>Envio a domicilio</span>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* ================= REVIEWS ================= */}
      <section
        aria-labelledby="reviews-section"
        className="plan-detail-section-container"
      >
        <div className="plan-detail-reviews-section-container">
          <h2 id="reviews-section" className="plan-detail-section-title">
            Plan Reviews
          </h2>
          <div className="package-detail-reviews-list">
            <article className="package-detail-reviews-list-item">
              <div className="package-detail-reviews-list-item-header">
                <span>★★★★★ 3.5</span>
                <span className="package-detail-reviews-list-item-date">
                  25 May, 2025
                </span>
              </div>
              <p>
                The Professional plan has been a game-changer for my agency. The
                advanced courses and tools helped us increase client ROI by
                250%.
              </p>
              <span className="package-detail-reviews-list-item-subscriber">
                Professional Plan subscriber
              </span>
            </article>
            <article className="package-detail-reviews-list-item">
              <div className="package-detail-reviews-list-item-header">
                <span>★★★★★ 3.5</span>
                <span className="package-detail-reviews-list-item-date">
                  25 May, 2025
                </span>
              </div>
              <p>
                Started with the Starter plan and upgraded to Annual
                Professional. The savings and additional features make it worth
                every penny.
              </p>
              <span className="package-detail-reviews-list-item-subscriber">
                Professional Plan subscriber
              </span>
            </article>
            <article className="package-detail-reviews-list-item">
              <div className="package-detail-reviews-list-item-header">
                <span>★★★★★ 3.5</span>
                <span className="package-detail-reviews-list-item-date">
                  25 May, 2025
                </span>
              </div>
              <p>
                Great introduction to AI agents, with enough background
                information to guide follow up learning. Easy to understand
                instruction with decent animation. Would definitely recommend.
              </p>
              <span className="package-detail-reviews-list-item-subscriber">
                Professional Plan subscriber
              </span>
            </article>
            <article className="package-detail-reviews-list-item">
              <div className="package-detail-reviews-list-item-header">
                <span>★★★★★ 3.5</span>
                <span className="package-detail-reviews-list-item-date">
                  25 May, 2025
                </span>
              </div>
              <p>Great course summary.</p>
              <span className="package-detail-reviews-list-item-subscriber">
                Professional Plan subscriber
              </span>
            </article>
          </div>
          <a href="/">View All Package Reviews</a>
        </div>
      </section>
      {/* ================= STORE INFORMATION ================= */}
      <section
        aria-labelledby="plan-detail-articles-section"
        className="plan-detail-section-container"
      >
        <div className=" package-detail-seller-section-content plan-detail-seller-section-container">
          <h2 id="articles-section" className="plan-detail-section-title">
            About the Store
          </h2>
          <div
            className="package-detail-seller-container"
            onClick={() => (window.location.href = '/store')}
          >
            <div className="package-detail-seller-avatar"></div>
            <div className="package-detail-seller-information-container">
              <div className="package-detail-seller-username-container">
                <h3 className="plan-detail-section-seller-name">Seller Name</h3>
                <span>@sellername</span>
              </div>
              <div className="package-detail-seller-stats-container">
                <div className="package-detail-seller-stat-tag">
                  <span>4.5 Instructor Rating</span>
                </div>
                <div className="package-detail-seller-stat-tag">
                  <span>1,108,007 Reviews</span>
                </div>
                <div className="package-detail-seller-stat-tag">
                  <span>3,647,916 Students</span>
                </div>
                <div className="package-detail-seller-stat-tag">
                  <span>131 Courses</span>
                </div>
              </div>
            </div>
          </div>
          <p>
            365 Careers is the #1 best-selling provider of business, finance,
            data science and AI courses on Udemy. The company's courses have
            been taken by more than 3,500,000 students in 210 countries. People
            working at world-class firms like Apple, PayPal, and Citibank have
            completed 365 Careers trainings. Currently, 365 focuses on the
            following topics on Udemy: 1) Finance - Finance fundamentals,
            Financial modeling in Excel, Valuation, Accounting, Capital
            budgeting, Financial statement analysis (FSA), Investment banking
            (IB), Leveraged buyout (LBO), Financial planning and analysis
            (FP&A), Corporate budgeting, applying Python for Finance, Tesla
            valuation case study, CFA, ACCA, and CPA
          </p>
        </div>
      </section>
    </>
  );
};

export default PlanDetailsComponent;
