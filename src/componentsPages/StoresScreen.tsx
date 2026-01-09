import React, { useState } from 'react';

const StoresScreen: React.FC = () => {
  const categories: { _id: number; name: string }[] = [
    {
      _id: 1,
      name: 'Featured',
    },
    {
      _id: 2,
      name: 'Technology',
    },
    {
      _id: 3,
      name: 'Arts and Entretainment',
    },
    {
      _id: 4,
      name: 'Finance',
    },
    {
      _id: 5,
      name: 'Food and Drink',
    },
    {
      _id: 6,
      name: 'Vehicles',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeSubscriptionType = (categoryId: number) => {
    window.scrollTo(0, 0);
    setLoading(true);
    setSelectedCategory(categoryId);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <section className="stores-screen-hero-section">
        <div className="stores-screen-section-container stores-screen-hero-section-content">
          <h1>Where brands live</h1>
          <p>The internet’s source for company logos and brand assets.</p>
        </div>
      </section>
      <section className="stores-screen-section-container stores-screen-categories-container">
        {categories.map((cat, index) => (
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
              <div key={index} className="stores-screen-store-card">
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
      )}
    </>
  );
};

export default StoresScreen;
