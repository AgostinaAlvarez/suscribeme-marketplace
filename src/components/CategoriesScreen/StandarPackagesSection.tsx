import React, { useState } from 'react';
import '../../../public/styles/standarPackagesCarouselStyles.css';

interface PackageData {
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

interface ComponentProps {
  packages: PackageData[];
}

const StandarPackagesSection: React.FC<ComponentProps> = ({ packages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 20,
        }}
      >
        {packages.map((pckg, index) => (
          <article key={index} className="standar-package-card-content">
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
                  style={{
                    margin: 0,
                    lineHeight: 1.4,
                    marginBottom: 10,
                    fontSize: 12.5,
                    color: '#8c8c8c',
                    fontWeight: 400,
                  }}
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
          </article>
        ))}
      </div>
      <nav
        style={{ marginTop: 30 }}
        className="pagination-container"
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
  );
};

export default StandarPackagesSection;

/*
<article
  className="card-content"
  key={index}
  style={{ boxShadow: 'none', border: '1px solid #efefef' }}
>
  {pckg.coverImage ? (
    <img
      className="card-image"
      src={pckg.coverImage.url}
      alt={`${pckg.title}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
    />
  ) : (
    <div
      className="card-image-default"
      aria-hidden="true"
    ></div>
  )}
  <div className="card-content-information">
    <div className="card-content-information-description-container">
      <h3>{pckg.title}</h3>
      <p>{pckg.briefDescription}</p>
      <span>3.5 ★★★★★ (76)</span>
      {pckg.plans.slice(0, 2).map((plan, index) => (
        <h4 key={index}>
          {plan.title} ${plan.price} {plan.currencyId}{' '}
          <span>/mo</span>
        </h4>
      ))}
    </div>
    <button
      className="card-button"
      onClick={() => (window.location.href = '/package')}
    >
      View Package
    </button>
  </div>
</article>
*/
