import React, { useEffect, useState } from 'react';

const PackageDetailsContent: React.FC = () => {
  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);

  // --- Sticky bar original lógica basada en hero section (comentada) ---

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const hero = document.querySelector('.package-detail-hero-section');
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

  // --- Nueva lógica: mostrar sticky bar luego de 10px de scroll ---
  /*
  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 100) {
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
  */

  return (
    <>
      {/* ================= STICKY BAR (React) ================= */}
      <section
        id="package-sticky-bar"
        className="package-sticky-bar-section"
        style={{
          display: showStickyBar ? 'block' : 'none',
          position: 'fixed',
          top: '50px',
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
        className="package-detail-section-container package-detail-hero-section"
      >
        <div className="package-detail-content-container package-detail-hero-section-content">
          <div className="package-detail-hero-section-content-row">
            <div className="package-detail-hero-section-tag">
              <span>Marketing</span>
            </div>
            <span>
              <span className="package-detail-hero-section-raiting">★★★★★</span>
              3.5 (1,899)
            </span>
          </div>
          <h1 id="hero-section">Complete Digital Marketing Mastery Package</h1>
          <p>
            A comprehensive subscription package featuring multiple learning
            paths, tools, and support levels. Choose from flexible plans
            designed to accelerate your marketing success at every stage.
          </p>
          <div className="package-detail-hero-section-content-row">
            <div
              className="package-detail-hero-section-store-container"
              onClick={() => (window.location.href = '/store')}
            >
              <div className="package-detail-hero-section-store-avatar"></div>
              <div className="package-detail-hero-section-store-information">
                <h3>Marketing Pro Studio</h3>
                <span>@marketing.studio</span>
              </div>
            </div>
            <span>12,450 subscribers</span>
          </div>
        </div>
      </section>
      {/* ================= ABOUT THE PACKAGE ================= */}
      <section
        aria-labelledby="about-section"
        className="package-detail-section-container"
      >
        <div className="package-detail-content-container package-detail-card package-detail-about-section-content">
          <h2 id="about-section" className="package-detail-section-title">
            About This Package
          </h2>
          <p className="package-detail-p">
            Our Digital Marketing Mastery Package is a comprehensive
            subscription offering that grows with your needs. Whether you're
            just starting out or scaling an enterprise, we have tailored plans
            that provide the right mix of content, tools, and support. <br />
            <br /> This package includes access to our complete library of
            marketing courses, live training sessions, exclusive tools,
            templates, and a thriving community of marketing professionals. Each
            subscription plan offers different levels of access and support to
            match your goals and budget.
          </p>
        </div>
      </section>
      {/* ================= PLANS ================= */}
      <section
        aria-labelledby="plans-section"
        className="package-detail-section-container"
      >
        <div className="package-detail-content-container package-detail-plans-section">
          <h2 id="plans-section" className="package-detail-section-title">
            Choose Your Plan
          </h2>
          <p className="package-detail-p">
            Select the subscription plan that best fits your learning goals and
            business needs. All plans include our core content with varying
            levels of support and additional features.
          </p>
          <div
            aria-labelledby="plans-section"
            className="package-detail-plans-section-grid"
          >
            {/* Essentials */}
            <article className="package-detail-plans-section-plan-card">
              <div className="package-detail-plans-section-plan-card-content">
                <h3 className="plan-title">Essentials</h3>
                <p className="plan-price">
                  <span className="price">$15</span>
                  <span className="period">/month</span>
                </p>
                <p className="plan-save">Pay yearly and save 17%</p>

                <p className="plan-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>

                <ul className="plan-features">
                  <li>19 instruments and effects</li>
                  <li>8 expansions</li>
                  <li>Over 15,000 sounds</li>
                  <li>50GB+ sample library</li>
                </ul>
              </div>
              <div className="plan-buttons-container">
                <button className="plan-button plan-primary-button">
                  Subscribe Now
                </button>
                <button
                  className="plan-button"
                  onClick={() => (window.location.href = '/standar-plan')}
                >
                  View Plan
                </button>
              </div>
            </article>

            {/* Plus (Most popular) */}
            <article className="package-detail-plans-section-plan-card featured">
              <div className="package-detail-plans-section-plan-card-content">
                <span className="plan-badge popular">Most popular</span>

                <h3 className="plan-title">Plus</h3>
                <p className="plan-price">
                  <span className="price">$25</span>
                  <span className="period">/month</span>
                </p>
                <p className="plan-save">Pay yearly and save 17%</p>

                <p className="plan-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>

                <ul className="plan-features">
                  <li>87 instruments and effects</li>
                  <li>39 expansions</li>
                  <li>Over 43,000 sounds</li>
                  <li>350GB+ sample library</li>
                </ul>
              </div>
              <div className="plan-buttons-container">
                <button className="plan-button plan-primary-button">
                  Subscribe Now
                </button>
                <button
                  className="plan-button"
                  onClick={() => (window.location.href = '/standar-plan')}
                >
                  View Plan
                </button>
              </div>
            </article>

            {/* Pro */}
            <article className="package-detail-plans-section-plan-card">
              <div className="package-detail-plans-section-plan-card-content">
                <span className="plan-badge best">Best value</span>

                <h3 className="plan-title">Pro</h3>
                <p className="plan-price">
                  <span className="price">$50</span>
                  <span className="period">/month</span>
                </p>
                <p className="plan-save">Pay yearly and save 17%</p>

                <p className="plan-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>

                <ul className="plan-features">
                  <li>140 instruments and effects</li>
                  <li>65 expansions</li>
                  <li>Over 84,000 sounds</li>
                  <li>1060GB+ sample library</li>
                  <li>Over 84,000 sounds</li>
                </ul>
              </div>
              <div className="plan-buttons-container">
                <button className="plan-button plan-primary-button">
                  Subscribe Now
                </button>
                <button
                  className="plan-button"
                  onClick={() => (window.location.href = '/standar-plan')}
                >
                  View Plan
                </button>
              </div>
            </article>
          </div>
          <div className="package-detail-plans-section-footer">
            <span className="package-detail-plans-section-span">
              30-day money-back guarantee on all plans
            </span>
            <span className="package-detail-plans-section-span">
              Secure payment - Cancel anytime
            </span>
          </div>
        </div>
      </section>
      {/* ================= HOW IT WORKS ================= */}
      <section
        aria-labelledby="how-it-works-section"
        className="package-detail-section-container"
      >
        <div className="package-detail-content-container package-detail-about-section-content">
          <h2
            id="how-it-works-section"
            className="package-detail-section-title"
          >
            How It Works
          </h2>
          <ul className="package-detail-how-it-works-grid">
            <li>
              <article className="package-detail-how-it-works-grid-item">
                <div className="package-detail-how-it-works-grid-item-avatar">
                  <span>1</span>
                </div>
                <h3>Choose Your Plan</h3>
                <p>
                  Select the subscription plan that matches your needs and
                  budget
                </p>
              </article>
            </li>
            <li>
              <article className="package-detail-how-it-works-grid-item">
                <div className="package-detail-how-it-works-grid-item-avatar">
                  <span>2</span>
                </div>
                <h3>Get Instant Access</h3>
                <p>
                  Immediately access your plan's content, tools, and community
                  features
                </p>
              </article>
            </li>
            <li>
              <article className="package-detail-how-it-works-grid-item">
                <div className="package-detail-how-it-works-grid-item-avatar">
                  <span>3</span>
                </div>
                <h3>Learn & Implement</h3>
                <p>
                  Follow structured learning paths and apply strategies to your
                  business
                </p>
              </article>
            </li>
            <li>
              <article className="package-detail-how-it-works-grid-item">
                <div className="package-detail-how-it-works-grid-item-avatar">
                  <span>4</span>
                </div>
                <h3>Get Ongoing Support</h3>
                <p>
                  Receive continuous updates, support as part of your
                  subscription
                </p>
              </article>
            </li>
          </ul>
        </div>
      </section>
      {/* ================= REVIEWS ================= */}
      <section
        aria-labelledby="reviews-section"
        className="package-detail-section-container"
      >
        <div className="package-detail-content-container package-detail-card package-detail-reviews-section-content">
          <h2 id="reviews-section" className="package-detail-section-title">
            Package Reviews
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
      {/*- ================= STORE INFORMATION ================= */}
      <section
        aria-labelledby="seller-information-section"
        className="package-detail-section-container"
      >
        <div className="package-detail-content-container package-detail-card package-detail-seller-section-content">
          <h2
            id="seller-information-section"
            className="package-detail-section-title"
          >
            About the Store
          </h2>
          <div
            className="package-detail-seller-container"
            onClick={() => (window.location.href = '/store')}
          >
            <div className="package-detail-seller-avatar"></div>
            <div className="package-detail-seller-information-container">
              <div className="package-detail-seller-username-container">
                <h3>Seller Name</h3>
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
          <h2 className="package-detail-seller-section-h2">
            Other packages from store
          </h2>
          <ul>
            <li>
              <article
                className="package-detail-seller-package-card"
                onClick={() => (window.location.href = '/')}
              >
                <div className="package-detail-seller-package-card-avatar"></div>
                <div className="package-detail-seller-package-card-content">
                  <div className="package-detail-seller-package-card-content-header">
                    <h3>Package Name</h3>
                    <div className="package-detail-seller-package-card-content-tag">
                      <span>Category</span>
                    </div>
                    <span>3.5 ★★★★★ (76)</span>
                  </div>
                  <p>
                    Recibe una caja sorpresa de snacks internacionales cada mes.
                    Descubre nuevos sabores.
                  </p>
                  <div className="package-detail-seller-package-card-plans-list">
                    <div className="package-detail-seller-package-card-plan-item">
                      <h4>Plan Name</h4>
                      <span>4.3 ★</span>
                      <span>37,680</span>
                      <span className="package-detail-seller-package-card-plan-item-price">
                        $589,900
                      </span>
                    </div>
                    <div className="package-detail-seller-package-card-plan-item">
                      <h4>Plan Name</h4>
                      <span>4.3 ★</span>
                      <span>37,680</span>
                      <span className="package-detail-seller-package-card-plan-item-price">
                        $589,900
                      </span>
                    </div>
                  </div>

                  <span className="package-detail-seller-package-card-content-more-plans">
                    + 3 more plans
                  </span>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default PackageDetailsContent;
