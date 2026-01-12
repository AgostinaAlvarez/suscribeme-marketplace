import React, { useEffect, useState } from 'react';
import '../../public/styles/bestSellersCarouselStyles.css';

interface SellerData {
  _id: string;
  name: string;
  category: string;
  avatar_image?: {
    url: string;
  } | null;
  cover_image?: {
    url: string;
  } | null;
}

const BestSellersGrid: React.FC = () => {
  const topSellers: SellerData[] = [
    {
      _id: '1',
      name: 'StreamMax',
      category: 'Entretenimiento digital',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/evernote.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed',
      },
    },
    {
      _id: '2',
      name: 'FitLife Pro',
      category: 'Fitness y bienestar',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/idv_JJeUyo/w/128/h/128/fallback/lettermark/icon.webp?c=1gx1770569107102bfgqlaCM3n5scUKSNH',
      },
      cover_image: {
        url: 'https://cdn.brandfetch.io/bodyfittraining.com/fallback/transparent/w/600/h/200/banner?c=1bfwsmEH20zzEfSNTed',
      },
    },
    {
      _id: '3',
      name: 'LearnHub',
      category: 'Educación online',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/shortwave.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed',
      },
      cover_image: {
        url: 'https://cdn.brandfetch.io/rm.com/fallback/transparent/w/600/h/200/banner?c=1bfwsmEH20zzEfSNTed',
      },
    },
    {
      _id: '4',
      name: 'FoodieBox',
      category: 'Comida y snacks',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/idpPypZaSR/w/128/h/128/fallback/lettermark/icon.webp?c=1gx1770300364715bfgqlaCM3nmIv8Vf3R',
      },
      cover_image: {
        url: 'https://cdn.brandfetch.io/kroger.com/fallback/transparent/w/600/h/200/banner?c=1bfwsmEH20zzEfSNTed',
      },
    },
    {
      _id: '5',
      name: 'BeautyPlus',
      category: 'Belleza y cuidado personal',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/idyZGa7zFG/w/128/h/128/fallback/lettermark/icon.webp?c=1gx1770569226127bfgqlaCM3n6KTEKuT5',
      },
    },
    {
      _id: '6',
      name: 'TechZone',
      category: 'Tecnología y gadgets',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/idfPYio-v-/w/128/h/128/fallback/lettermark/icon.webp?c=1gx1770289625036bfgqlaCM3nBFLNpO2V',
      },
    },
    {
      _id: '7',
      name: 'BookNest',
      category: 'Libros y educación',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/id-ZnbZL1r/w/128/h/128/fallback/lettermark/icon.webp?c=1gx1770289625036bfgqlaCM3nBFLNpO2V',
      },
    },
    {
      _id: '8',
      name: 'PetLovers',
      category: 'Mascotas y accesorios',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/idA94mBJSX/w/128/h/128/fallback/lettermark/icon.webp?c=1gx1770453151919bfgqlaCM3nQt9cA64H',
      },
    },
  ];

  const [mobileComponent, setMobileComponent] = useState<boolean>(false);

  useEffect(() => {
    // Solo ejecuta en cliente
    const checkMobile = () => {
      setMobileComponent(window.innerWidth < 620);
    };
    checkMobile(); // Inicializa al montar
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {mobileComponent ? (
        <>
          <div className="responsive-carousel">
            <div className="responsive-group">
              {topSellers.map((seller, index) => (
                <div className="responsive-best-seller-card">
                  {seller.cover_image ? (
                    <img
                      src={seller.cover_image.url}
                      alt="cover-image"
                      className="responsive-best-seller-card-cover-image"
                    />
                  ) : (
                    <img
                      src="https://cdn.brandfetch.io/bestbuy.com/fallback/transparent/w/600/h/200/banner?c=1bfwsmEH20zzEfSNTed"
                      alt="cover-image"
                      className="responsive-best-seller-card-cover-image"
                    />
                  )}
                  <div className="responsive-best-seller-card-cover-image-layer"></div>
                  <div className="responsive-best-seller-card-layer">
                    <div className="responsive-best-seller-card-avatar">
                      {seller.avatar_image && (
                        <img
                          style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          src={seller.avatar_image.url}
                          alt={`${seller.name} logo`}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <h3>{seller.name}</h3>
                    <span>{seller.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <ul className="sellers-section-grid">
            {topSellers.map((seller, index) => (
              <li key={index}>
                <article
                  className="sellers-section-grid-item"
                  onClick={() => (window.location.href = '/store')}
                >
                  <div className="sellers-section-grid-item-avatar">
                    {seller.avatar_image && (
                      <img
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        src={seller.avatar_image.url}
                        alt={`${seller.name} logo`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="sellers-section-grid-item-content">
                    <h3>{seller.name}</h3>
                    <span>{seller.category}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default BestSellersGrid;
