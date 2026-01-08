import React, { useState } from 'react';
import '../../../public/styles/customPackagesCarouselStyles.css';

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
  //{
  //  imageUrl:
  //    'https://storage.googleapis.com/uxpilot-auth.appspot.com/2167e4c7d0-baf0f55b5307d6e1bd16.png',
  //},
];

interface PackageData {
  _id: string;
}

interface ComponentProps {
  packages: PackageData[];
}

const CustomPackagesSection: React.FC<ComponentProps> = ({ packages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <div className="search-screen-main-grid-content-cards-grid">
        {packages.map((_, index) => (
          <article
            className="custom-package-card-content"
            style={{ minHeight: '340px' }}
          >
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

                <div
                  className="custom-package-card-info-items"
                  style={{ marginBottom: 5 }}
                >
                  {products.map((item, index) => (
                    <img
                      className="custom-package-card-info-product-icon"
                      style={{ width: '34px', height: '34px' }}
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
              </div>
              <button
                className="card-button"
                style={{ margin: 0 }}
                onClick={() => (window.location.href = '/custom-package')}
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

export default CustomPackagesSection;
