import React from 'react';

interface SellerData {
  _id: string;
  name: string;
  category: string;
  avatar_image?: {
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
    },
    {
      _id: '3',
      name: 'LearnHub',
      category: 'Educación online',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/shortwave.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed',
      },
    },
    {
      _id: '4',
      name: 'FoodieBox',
      category: 'Comida y snacks',
      avatar_image: {
        url: 'https://cdn.brandfetch.io/idpPypZaSR/w/128/h/128/fallback/lettermark/icon.webp?c=1gx1770300364715bfgqlaCM3nmIv8Vf3R',
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
  return (
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
  );
};

export default BestSellersGrid;
