import React from 'react';

interface SellerData {
  _id: string;
  name: string;
  category: string;
}

const BestSellersGrid: React.FC = () => {
  const topSellers: SellerData[] = [
    {
      _id: '1',
      name: 'StreamMax',
      category: 'Entretenimiento digital',
    },
    {
      _id: '2',
      name: 'FitLife Pro',
      category: 'Fitness y bienestar',
    },
    {
      _id: '3',
      name: 'LearnHub',
      category: 'Educación online',
    },
    {
      _id: '4',
      name: 'FoodieBox',
      category: 'Comida y snacks',
    },
    {
      _id: '5',
      name: 'BeautyPlus',
      category: 'Belleza y cuidado personal',
    },
    {
      _id: '6',
      name: 'TechZone',
      category: 'Tecnología y gadgets',
    },
    {
      _id: '7',
      name: 'BookNest',
      category: 'Libros y educación',
    },
    {
      _id: '8',
      name: 'PetLovers',
      category: 'Mascotas y accesorios',
    },
  ];
  return (
    <ul className="sellers-section-grid">
      {topSellers.map((seller, index) => (
        <li key={index}>
          <article className="sellers-section-grid-item">
            <div className="sellers-section-grid-item-avatar"></div>
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
