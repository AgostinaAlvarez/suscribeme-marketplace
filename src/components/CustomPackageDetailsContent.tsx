import React, { useEffect, useState, useRef } from 'react';
import ModalComponent from './ModalComponent.tsx';
import DrawerComponent from './DrawerComponent.tsx';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const CustomPackageDetailsContent: React.FC = () => {
  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);
  // Estado para ocultar el aside al llegar al footer
  const [hideAside, setHideAside] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Sticky bar
          const hero = document.querySelector('.custom-package-hero-section');
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
          const aside = asideRef.current;
          if (footer && aside) {
            const footerRect = footer.getBoundingClientRect();
            const asideRect = aside.getBoundingClientRect();
            // Ajusta el margen de seguridad para que el aside desaparezca antes de tocar el footer
            if (asideRect.bottom > footerRect.top - 20) {
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products: {
    product: {
      _id: string;
      name: string;
      image?: {
        url: string;
      } | null;
      description: string;
      selectableOptions: { keyOption: string; valueOption: string[] }[];
      price: number;
      currencyId: string;
    };
    shipping_required: boolean;
    allow_client_modification: boolean;
    change_advance_period: number | null;
    auto_approve_changes: boolean | null;
  }[] = [
    {
      product: {
        _id: '1',
        name: 'Crema Facial con Aceites Naturales',
        image: {
          url: 'https://puroynatural.cl/wp-content/uploads/2022/06/Untitled-design-600x600.jpg',
        },
        description:
          'La crema hidratante y anti-age Omegnas combina el poder humectante y nutritivo de los Aceites Naturales y el efecto hidratante del Ácido Hialurónico.',
        selectableOptions: [
          {
            keyOption: 'Color',
            valueOption: ['Red', 'Blue', 'Green'],
          },
          {
            keyOption: 'Size',
            valueOption: ['S', 'M', 'L', 'XL'],
          },
        ],
        price: 45000,
        currencyId: 'CLP',
      },
      shipping_required: true,
      allow_client_modification: true,
      change_advance_period: 24,
      auto_approve_changes: false,
    },
    {
      product: {
        _id: '2',
        name: 'Aceite de Monoi',
        image: {
          url: 'https://puroynatural.cl/wp-content/uploads/2024/05/monoi1-600x600.jpeg',
        },
        description:
          'El aceite de coco Monoi, originario de Polinesia Francesa desde 1942, es un humectante y emoliente destacado por su hidratación de la piel y protección contra el estrés climático.',
        selectableOptions: [
          {
            keyOption: 'Nivel',
            valueOption: ['Básico', 'Intermedio', 'Avanzado'],
          },
        ],
        price: 12000,
        currencyId: 'CLP',
      },
      shipping_required: false,
      allow_client_modification: false,
      change_advance_period: null,
      auto_approve_changes: null,
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<{
    _id: string;
    name: string;
    image?: {
      url: string;
    } | null;
    description: string;
    selectableOptions: { keyOption: string; valueOption: string[] }[];
    price: number;
    currencyId: string;
  } | null>(null);

  const [productsInCart, setProductsInCart] = useState<
    {
      listId: string;
      productId: string;
      selectedOptions: { keyOption: string; valueOption: string }[];
      amount: number;
    }[]
  >([]);

  const [openProductModal, setOpenProductModal] = useState(false);

  const [productModalError, setProductModalError] = useState<string | null>();

  const {
    handleSubmit,
    control,
    reset,
    register,
    //setValue, getValues
  } = useForm();

  const addProductToCart = (data: any) => {
    if (!selectedProduct) return;

    // Verificar si todas las opciones han sido seleccionadas
    if (selectedProduct.selectableOptions.length > 0) {
      // eslint-disable-next-line prefer-const
      for (let option of selectedProduct.selectableOptions) {
        if (!data[option.keyOption]) {
          setProductModalError(
            `Debes seleccionar un valor para: ${option.keyOption}`,
          );
          /*
          alert(`Debes seleccionar un valor para: ${option.keyOption}`);
          */
          return;
        }
      }
    }

    const newCartItem: {
      listId: string;
      productId: string;
      selectedOptions: { keyOption: string; valueOption: string }[];
      amount: number;
    } = {
      listId: uuidv4(),
      productId: selectedProduct._id,
      selectedOptions: selectedProduct.selectableOptions.map((option) => ({
        keyOption: option.keyOption,
        valueOption: data[option.keyOption],
      })),
      amount: data.amount,
    };

    // Agregar al carrito
    setProductsInCart((prevCart) => [...prevCart, newCartItem]);
    setProductModalError(null);
    reset();
    setSelectedProduct(null);
    setOpenProductModal(false);
  };

  const removeProductfromCart = (listId: string) => {
    const updateData = productsInCart.filter((prod) => prod.listId !== listId);
    setProductsInCart(updateData);
  };

  const calculateTotal = () => {
    return productsInCart.reduce((total, item) => {
      const product = products.find((p) => p.product._id === item.productId);
      const price = product ? product.product.price : 0;
      return total + price * item.amount;
    }, 0);
  };

  const [planDetailsDrawerOpen, setPlanDetailsDrawerOpen] =
    useState<boolean>(false);

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
        className="custom-package-hero-section"
      >
        <div className="custom-package-section-container custom-package-hero-section-content">
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
      {/* ================= PRINCIPAL GRID ================= */}
      <section
        aria-labelledby="grid-section"
        className="custom-package-section-container custom-package-principal-grid-section"
      >
        <div className="custom-package-principal-grid-left-col">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <h2 className="custom-package-section-title">Choose your items</h2>
            <p>
              A comprehensive subscription package featuring multiple learning
              paths, tools, and support levels. Choose from flexible plans
              designed to accelerate your marketing success at every stage.
            </p>
          </div>
          <div className="custom-package-items-grid">
            {products.map((item, index) => (
              <article key={index} className="custom-package-item-card">
                <div className="custom-package-item-card-content">
                  <div className="custom-package-item-card-img">
                    {item.product.image && (
                      <img
                        src={item.product.image.url}
                        alt={item.product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    )}
                  </div>
                  <h3>{item.product.name}</h3>
                  <span style={{ fontSize: 11, color: '#8c8c8c' }}>
                    {item.shipping_required
                      ? 'Envío a domicilio'
                      : 'Retiro en Tienda'}
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700 }}>
                    ${item.product.price.toLocaleString()}{' '}
                    <span
                      style={{
                        fontSize: 13,
                        color: '#8c8c8c',
                        fontWeight: 400,
                      }}
                    >
                      {item.product.currencyId}
                    </span>
                  </span>
                  <button
                    className="card-button"
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setOpenProductModal(true);
                    }}
                  >
                    + Add
                  </button>
                </div>
              </article>
            ))}
          </div>
          {/* ================= REVIEWS ================= */}
          <section
            aria-labelledby="reviews-section"
            className="custom-package-info-section"
            style={{ marginTop: 30 }}
          >
            <div
              style={{
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <h2 id="reviews-section">Plan Reviews</h2>
              <div className="package-detail-reviews-list">
                <article className="package-detail-reviews-list-item">
                  <div className="package-detail-reviews-list-item-header">
                    <span>★★★★★ 3.5</span>
                    <span className="package-detail-reviews-list-item-date">
                      25 May, 2025
                    </span>
                  </div>
                  <p>
                    The Professional plan has been a game-changer for my agency.
                    The advanced courses and tools helped us increase client ROI
                    by 250%.
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
                    Professional. The savings and additional features make it
                    worth every penny.
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
                    instruction with decent animation. Would definitely
                    recommend.
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
            aria-labelledby="store-information-section"
            className="custom-package-info-section"
          >
            <div className="package-detail-seller-section-content">
              <h2 id="store-information-section">About the Store</h2>
              <div
                className="package-detail-seller-container"
                onClick={() => (window.location.href = '/store')}
              >
                <div className="package-detail-seller-avatar"></div>
                <div className="package-detail-seller-information-container">
                  <div className="package-detail-seller-username-container">
                    <h3 className="plan-detail-section-seller-name">
                      Seller Name
                    </h3>
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
                365 Careers is the #1 best-selling provider of business,
                finance, data science and AI courses on Udemy. The company's
                courses have been taken by more than 3,500,000 students in 210
                countries. People working at world-class firms like Apple,
                PayPal, and Citibank have completed 365 Careers trainings.
                Currently, 365 focuses on the following topics on Udemy: 1)
                Finance - Finance fundamentals, Financial modeling in Excel,
                Valuation, Accounting, Capital budgeting, Financial statement
                analysis (FSA), Investment banking (IB), Leveraged buyout (LBO),
                Financial planning and analysis (FP&A), Corporate budgeting,
                applying Python for Finance, Tesla valuation case study, CFA,
                ACCA, and CPA
              </p>
            </div>
          </section>
        </div>
        <div className="custom-package-items-grid-right-col">
          <div
            className="custom-package-items-grid-right-col-content"
            ref={asideRef}
            style={{
              opacity: hideAside ? 0 : 1,
              pointerEvents: hideAside ? 'none' : 'auto',
              transition: 'opacity 0.3s',
              position: showStickyBar ? 'fixed' : 'relative',
              top: showStickyBar ? '130px' : 0,
              zIndex: 4000,
            }}
          >
            <div className="custom-package-aside-total-card">
              {productsInCart.length === 0 ? (
                <div>Valor del plan... </div>
              ) : (
                <>
                  <div className="custom-package-aside-total-card-title-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                    <span>Tu Plan</span>
                  </div>
                  <button
                    type="button"
                    style={{
                      width: 'fit-content',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      margin: 0,
                      color: '#37AFE1',
                      //textDecoration: 'underline',
                      cursor: 'pointer',
                      font: 'inherit',
                      outline: 'none',
                      boxShadow: 'none',
                      display: 'inline',
                      fontWeight: 400,
                    }}
                    onClick={() => {
                      setPlanDetailsDrawerOpen(true);
                    }}
                  >
                    Ver mas detalles
                  </button>
                  <div className="custom-package-aside-total-container">
                    <span>Total mensual</span>
                    <h4>
                      ${calculateTotal()} <span>ARS</span>
                    </h4>
                  </div>
                  <button
                    className="custom-package-aside-total-button"
                    onClick={() => (window.location.href = '/package')}
                  >
                    Subscribe Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <ModalComponent
        open={openProductModal}
        onClose={() => {
          setSelectedProduct(null);
          setOpenProductModal(false);
          reset();
        }}
      >
        {selectedProduct && (
          <form onSubmit={handleSubmit(addProductToCart)}>
            <div>
              <label>Cantidad</label>
              <input
                type="number"
                min={1}
                defaultValue={1}
                {...register('amount', { valueAsNumber: true, min: 1 })}
                style={{ width: '100%' }}
              />
            </div>
            {selectedProduct.selectableOptions.map((option) => (
              <div key={option.keyOption}>
                <label>{option.keyOption}</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {option.valueOption.map((value) => (
                    <label
                      key={value}
                      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <input
                        type="radio"
                        value={value}
                        {...register(option.keyOption, {
                          onChange: () => setProductModalError(null),
                        })}
                        name={option.keyOption}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {productModalError && <span>{productModalError}</span>}
            <button type="submit">Agregar al carrito</button>
          </form>
        )}
      </ModalComponent>
      <DrawerComponent
        open={planDetailsDrawerOpen}
        onClose={() => {
          setPlanDetailsDrawerOpen(false);
        }}
      >
        <>
          <div
            style={{
              fontWeight: 600,
              fontSize: 18,
              height: '60px',
              backgroundColor: 'green',
            }}
          >
            Lista de productos
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              height: 'calc(100vh - 70px)',
              backgroundColor: 'pink',
              overflowY: 'scroll',
            }}
          >
            {productsInCart.length === 0 ? (
              <li style={{ color: '#888', fontSize: 14 }}>
                No hay productos en el carrito.
              </li>
            ) : (
              productsInCart.map((item) => {
                const productData = products.find(
                  (prod) => prod.product._id === item.productId,
                );
                if (!productData) return null;
                return (
                  <li
                    key={item.listId}
                    style={{
                      borderBottom: '1px solid #eee',
                      boxSizing: 'border-box',
                      padding: '10px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>
                      {productData.product.name}
                    </div>
                    <div style={{ fontSize: 13, color: '#888' }}>
                      ${productData.product.price.toLocaleString()}{' '}
                      {productData.product.currencyId} x {item.amount}
                    </div>
                    {item.selectedOptions.length > 0 && (
                      <div style={{ fontSize: 12, color: '#666' }}>
                        {item.selectedOptions
                          .map((opt) => `${opt.keyOption}: ${opt.valueOption}`)
                          .join(', ')}
                      </div>
                    )}
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#E14C37',
                        cursor: 'pointer',
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        padding: 0,
                        marginTop: 2,
                      }}
                      onClick={() => removeProductfromCart(item.listId)}
                    >
                      Quitar
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </>
      </DrawerComponent>
    </>
  );
};

export default CustomPackageDetailsContent;
