import React, { useEffect, useState, useRef } from 'react';
import ModalComponent from './ModalComponent.tsx';
import DrawerComponent from './DrawerComponent.tsx';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import '../../public/styles/cartStyles.css';
import EmptyCartAnimation from './EmptyCartAnimation.tsx';

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
            valueOption: ['Básico', 'Intermedio', 'Avanzado', 'Super'],
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
    shipping_required: boolean;
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

  const [amountModal, setAmountModal] = useState(1);

  const {
    handleSubmit,
    reset,
    register,
    //control,
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
    setAmountModal(1);
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

  const getTotalProductsInCart = () => {
    return productsInCart.reduce((acc, item) => acc + item.amount, 0);
  };

  const [planDetailsDrawerOpen, setPlanDetailsDrawerOpen] =
    useState<boolean>(false);

  // Lógica para aumentar/disminuir cantidad en el carrito
  const handleIncreaseAmount = (listId: string) => {
    setProductsInCart((prev) =>
      prev.map((item) =>
        item.listId === listId ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  };

  const handleDecreaseAmount = (listId: string) => {
    setProductsInCart((prev) =>
      prev.map((item) =>
        item.listId === listId && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item,
      ),
    );
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<{
    listId: string;
    productId: string;
    selectedOptions: { keyOption: string; valueOption: string }[];
    amount: number;
  } | null>(null);
  const [editAmount, setEditAmount] = useState(1);

  const handleUpdateProductInCart = (data: any) => {
    if (!editProduct) return;
    setProductsInCart((prev) =>
      prev.map((item) =>
        item.listId === editProduct.listId
          ? {
              ...item,
              amount: editAmount,
              selectedOptions: editProduct.selectedOptions.map((opt) => ({
                ...opt,
                valueOption: data[opt.keyOption] || opt.valueOption,
              })),
            }
          : item,
      ),
    );
    setEditModalOpen(false);
    setEditProduct(null);
    setEditAmount(1);
  };

  // Estado para modal de edición de producto
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [editProductData, setEditProductData] = useState<any>(null);
  const [editProductModalError, setEditProductModalError] = useState<
    string | null
  >(null);

  // Función para abrir modal de edición (renombrada para evitar conflicto)
  const handleEditProductClick = (item: any) => {
    setPlanDetailsDrawerOpen(false);
    const productData = products.find(
      (prod) => prod.product._id === item.productId,
    );
    if (!productData) return;
    setEditProductData({
      ...productData.product,
      shipping_required: productData.shipping_required,
      selectedOptions: item.selectedOptions,
      listId: item.listId,
    });
    setEditAmount(item.amount);
    setOpenEditProductModal(true);
    setEditProductModalError(null);
  };

  // Función para actualizar producto editado en el carrito
  const updateEditedProductInCart = (data: any) => {
    if (!editProductData) return;
    // Validar opciones seleccionadas
    const selectedOptions = editProductData.selectableOptions.map(
      (option: any) => {
        const value = data[option.keyOption];
        if (!value) {
          setEditProductModalError(
            `Selecciona una opción para ${option.keyOption}`,
          );
          throw new Error('Faltan opciones');
        }
        return { keyOption: option.keyOption, valueOption: value };
      },
    );
    setProductsInCart((prev) =>
      prev.map((item) =>
        item.listId === editProductData.listId
          ? { ...item, selectedOptions, amount: editAmount }
          : item,
      ),
    );
    setOpenEditProductModal(false);
    setEditProductData(null);
    setEditAmount(1);
    setEditProductModalError(null);
  };

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
                      setSelectedProduct({
                        ...item.product,
                        shipping_required: item.shipping_required,
                      });
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
                <>
                  <div
                    className="custom-package-aside-total-card-title-container"
                    style={{ marginBottom: 10 }}
                  >
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
                    <span style={{ fontSize: 15 }}>Tu Plan Personalizado</span>
                  </div>

                  <div className="custom-package-aside-total-container">
                    <span style={{ fontSize: 15 }}>Total mensual</span>
                    <h4>
                      $0 <span>ARS</span>
                    </h4>
                  </div>

                  <button
                    className="custom-package-aside-total-button"
                    style={{
                      background:
                        'linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 100%)',
                      color: '#bdbdbd',
                      border: '1px solid #e0e0e0',
                      cursor: 'not-allowed',
                      opacity: 0.7,
                      boxShadow: 'none',
                      fontWeight: 600,
                    }}
                    disabled
                  >
                    Subscribe Now
                  </button>
                  <span
                    style={{
                      fontSize: 12,
                      color: '#8c8c8c',
                      fontWeight: 300,
                      display: 'block',
                      textAlign: 'center',
                    }}
                  >
                    ¡Tu carrito está vacío! Agrega productos para crear tu plan
                    personalizado.
                  </span>
                </>
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
                    <span style={{ fontSize: 15 }}>Tu Plan Personalizado</span>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: '#8c8c8c',
                      fontWeight: 300,
                    }}
                  >
                    • {getTotalProductsInCart()} producto
                    {getTotalProductsInCart() > 1 ? 's' : ''}
                  </span>
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
                      fontSize: 13,
                      textDecoration: 'underline',
                    }}
                    onClick={() => {
                      console.log(productsInCart);
                      setPlanDetailsDrawerOpen(true);
                    }}
                  >
                    Ver Detalles
                  </button>
                  <div className="custom-package-aside-total-container">
                    <span style={{ fontSize: 15 }}>Total mensual</span>
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
          setAmountModal(1);
        }}
        containerStyles={{ width: '780px', height: '500px' }}
      >
        {selectedProduct && (
          <form
            onSubmit={handleSubmit((data) =>
              addProductToCart({ ...data, amount: amountModal }),
            )}
            style={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 20,
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelectedProduct(null);
                setOpenProductModal(false);
                reset();
                setAmountModal(1);
              }}
            >
              x
            </div>
            <div className="custom-package-add-item-modal-base-container custom-package-add-item-modal-content">
              {selectedProduct?.image ? (
                <img
                  className="custom-package-add-item-modal-img"
                  src={selectedProduct.image.url}
                />
              ) : (
                <div
                  className="custom-package-add-item-modal-img"
                  style={{ backgroundColor: 'grey' }}
                ></div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box',
                  gap: 12,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 19 }}>
                  {selectedProduct?.name}
                </span>
                <p
                  style={{
                    fontSize: 11,
                    lineHeight: 1.3,
                    margin: 0,
                    fontWeight: 400,
                    color: 'grey',
                  }}
                >
                  Smooth, rich cold brew coffee made from premium organic beans.
                  Perfect for your morning routine or afternoon pick-me-up. Low
                  acidity and naturally sweet.
                </p>
                <span style={{ fontWeight: 800, fontSize: 23 }}>
                  ${selectedProduct?.price}{' '}
                  <span
                    style={{ fontWeight: 300, fontSize: 12, color: '#595959' }}
                  >
                    per unit
                  </span>
                </span>

                <div
                  className="custom-package-add-item-info-container"
                  style={{
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      className="bi bi-truck"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg>
                    <span style={{ fontSize: 11.5, fontWeight: 500 }}>
                      Delivery Type
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      border: '2px solid #1d39c4',
                      backgroundColor: ' #ffffff',
                      padding: 10,
                      borderRadius: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    {selectedProduct.shipping_required ? (
                      <>
                        <div
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 5,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-house-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                          </svg>
                          <span style={{ fontSize: 11, fontWeight: 500 }}>
                            Home Delivery
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 300,
                            color: 'grey',
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          Delivered to your doorstep with your subscription
                        </p>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 5,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-shop"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.375 2.375 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                          </svg>
                          <span style={{ fontSize: 11, fontWeight: 500 }}>
                            Store Pickup
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 300,
                            color: 'grey',
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          Pick up at your nearest location
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {productModalError && (
                  <span
                    style={{ marginBottom: 10, fontSize: 12, color: '#f5222d' }}
                  >
                    *{productModalError}
                  </span>
                )}

                {/*--------*/}
                {selectedProduct.selectableOptions.map((option) => (
                  <div
                    key={option.keyOption}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 5,
                    }}
                  >
                    <label style={{ display: 'block', fontSize: 13 }}>
                      {option.keyOption}
                    </label>

                    <div className="radio-group">
                      {option.valueOption.map((value) => (
                        <label key={value} className="radio-card">
                          <input
                            type="radio"
                            value={value}
                            {...register(option.keyOption, {
                              onChange: () => setProductModalError(null),
                            })}
                            name={option.keyOption}
                          />
                          <span>{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box',
                  gap: 15,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    boxSizing: 'border-box',
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 450 }}>
                    Quantity
                  </span>
                  <div
                    className="custom-package-plan-details-drawer-list-item-quantity-control"
                    style={{ margin: 0 }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setAmountModal((prev) => Math.max(1, prev - 1))
                      }
                      disabled={amountModal === 1}
                    >
                      -
                    </button>
                    <span>{amountModal}</span>
                    <button
                      type="button"
                      onClick={() => setAmountModal((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 300 }}>
                    Min: 1 | Max: 12 bottles per delivery
                  </span>
                </div>
                <div className="custom-package-add-item-total-amount-container">
                  <div className="custom-package-add-item-total-amount-row">
                    <span
                      style={{
                        fontSize: 11,
                        color: '#4b5563',
                      }}
                    >
                      Unit Price
                    </span>
                    <span
                      style={{ fontWeight: 500, fontSize: 11, color: 'black' }}
                    >
                      ${selectedProduct.price}
                    </span>
                  </div>
                  <div className="divider"></div>
                  <div className="custom-package-add-item-total-amount-row">
                    <span
                      style={{ fontWeight: 600, fontSize: 12, color: 'black' }}
                    >
                      Subtotal
                    </span>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 17,
                        color: '#7d2ae8',
                      }}
                    >
                      ${amountModal * selectedProduct.price}
                    </span>
                  </div>
                </div>
                <div className="custom-package-add-item-info-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="#2762ea"
                    className="bi bi-info-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                  </svg>
                  <p style={{ margin: 0, lineHeight: 1.2, fontSize: 12 }}>
                    This product will be included in your recurring
                    subscription. You can modify or cancel anytime from your
                    account dashboard.
                  </p>
                </div>
              </div>
            </div>

            <>
              {/*
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
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
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
            */}
            </>
            <div className="custom-package-add-item-modal-base-container custom-package-add-item-modal-footer">
              <button
                className="card-button"
                style={{ width: 'calc(100% - 20px)', margin: '0 auto' }}
                type="submit"
              >
                + Add to Plan
              </button>
            </div>
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
          {productsInCart.length === 0 ? (
            <>
              <div className="custom-package-plan-details-drawer-base-container custom-package-plan-details-drawer-header">
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                >
                  <span style={{ fontWeight: 600, fontSize: 18 }}>
                    Your Plan
                  </span>
                  <span style={{ fontWeight: 400, fontSize: 13 }}>
                    Details of your recurring plan
                  </span>
                </div>
                <div>x</div>
              </div>
              <div className="custom-package-plan-details-drawer-empty-cart-container">
                <EmptyCartAnimation />
                <span style={{ fontSize: 13, fontWeight: 300, color: 'grey' }}>
                  No has seleccionado ningun item
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="custom-package-plan-details-drawer-base-container custom-package-plan-details-drawer-header">
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                >
                  <span style={{ fontWeight: 600, fontSize: 18 }}>
                    Your Plan
                  </span>
                  <span style={{ fontWeight: 400, fontSize: 13 }}>
                    Details of your recurring plan
                  </span>
                </div>
                <div>x</div>
              </div>
              <ul className="custom-package-plan-details-drawer-base-container custom-package-plan-details-drawer-list-container">
                <li>
                  <span style={{ fontSize: 12 }}>
                    Products in Plan ({productsInCart.length})
                  </span>
                </li>
                {productsInCart.map((item, index) => {
                  const productData = products.find(
                    (prod) => prod.product._id === item.productId,
                  );
                  if (!productData) return null;
                  return (
                    <>
                      <li
                        key={index}
                        className="custom-package-plan-details-drawer-list-item"
                      >
                        {productData.product.image ? (
                          <img
                            className="custom-package-plan-details-drawer-list-item-img"
                            src={productData.product.image.url}
                            alt={`${productData.product.name}`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="custom-package-plan-details-drawer-list-item-img"></div>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                          }}
                        >
                          <span style={{ fontSize: 13, fontWeight: 600 }}>
                            {productData.product.name}
                          </span>
                          <span style={{ fontSize: 11.5, fontWeight: 300 }}>
                            {item.selectedOptions
                              .map(
                                (opt) => `${opt.keyOption}: ${opt.valueOption}`,
                              )
                              .join(', ')}
                          </span>
                          <div className="custom-package-plan-details-drawer-list-item-quantity-control">
                            <button
                              onClick={() => handleDecreaseAmount(item.listId)}
                              disabled={item.amount === 1}
                            >
                              -
                            </button>
                            <span>{item.amount}</span>
                            <button
                              onClick={() => handleIncreaseAmount(item.listId)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="custom-package-plan-details-drawer-list-item-right-col">
                          <div style={{ display: 'flex', gap: 5 }}>
                            <img
                              src="/assets/icons/trash3.svg"
                              alt="Trash icon"
                              width="15"
                              height="15"
                              style={{ cursor: 'pointer' }}
                              onClick={() => removeProductfromCart(item.listId)}
                            />
                            <img
                              src="/assets/icons/edit-icon.svg"
                              alt="Edit icon"
                              width="15"
                              height="15"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleEditProductClick(item)}
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 2,
                              textAlign: 'end',
                            }}
                          >
                            <span style={{ fontSize: 11, fontWeight: 300 }}>
                              ${productData.product.price} c/u
                            </span>
                            <span
                              style={{
                                fontSize: 16,
                                fontWeight: 800,
                              }}
                            >
                              ${productData.product.price * item.amount}
                            </span>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
              <div className="custom-package-plan-details-drawer-base-container custom-package-plan-details-drawer-footer">
                <div className="custom-package-plan-details-drawer-footer-row">
                  <span style={{ fontWeight: 300, fontSize: 13 }}>
                    Subtotal
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>
                    ${calculateTotal()}
                  </span>
                </div>
                <div className="custom-package-plan-details-drawer-footer-row">
                  <span style={{ fontWeight: 300, fontSize: 13 }}>
                    Store Tax
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>$0</span>
                </div>
                <div className="divider"></div>
                <div className="custom-package-plan-details-drawer-footer-row">
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                  >
                    <span style={{ fontWeight: 800, fontSize: 16 }}>
                      Total Monthly
                    </span>
                    <span style={{ fontWeight: 300, fontSize: 11 }}>
                      Billed monthly, cancel anytime
                    </span>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 18 }}>
                    ${calculateTotal()}
                  </span>
                </div>
                <button className="card-button" style={{ marginTop: 5 }}>
                  Pay Now
                </button>
                <span
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 300,
                    fontSize: 11,
                    color: 'grey',
                  }}
                >
                  Secure checkout · Cancel anytime
                </span>
              </div>
            </>
          )}
          {/*
            <div
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                height: 'calc(100vh - 100px)',
                backgroundColor: 'pink',
                overflowY: 'scroll',
              }}
            >
              {productsInCart.length === 0 ? (
                <div>No hay productos</div>
              ) : (
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    {productsInCart.map((item) => {
                      const productData = products.find(
                        (prod) => prod.product._id === item.productId,
                      );
                      if (!productData) return null;
  
                      const { product } = productData;
                      const subtotal = product.price * item.amount;
  
                      return (
                        <tr key={item.listId}>
                          {/* PRODUCT * /}
                          <td className="product-cell">
                            <div className="product-wrapper">
                              {product.image?.url && (
                                <img
                                  src={product.image.url}
                                  alt={product.name}
                                  className="product-image"
                                />
                              )}
  
                              <div className="product-info">
                                <span className="product-name">
                                  {product.name}
                                </span>
  
                                <span className="product-options">
                                  {item.selectedOptions
                                    .map(
                                      (opt) =>
                                        `${opt.keyOption}: ${opt.valueOption}`,
                                    )
                                    .join(', ')}
                                </span>
                              </div>
                            </div>
                          </td>
  
                          {/* QUANTITY * /}
                          <td className="quantity-cell">
                            <div className="quantity-control">
                              <button>-</button>
                              <span>{item.amount}</span>
                              <button>+</button>
                            </div>
                          </td>
  
                          {/* SUBTOTAL * /}
                          <td className="subtotal-cell">
                            ${subtotal.toLocaleString('es-AR')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            
            */}
          {/*
            <div
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
                <div>no hay productos</div>
              ) : (
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    {productsInCart.map((item) => {
                      const productData = products.find(
                        (prod) => prod.product._id === item.productId,
                      );
                      if (!productData) return null;
  
                      const price = productData.product.price;
                      const subtotal = price * item.amount;
  
                      return (
                        <tr key={item.listId}>
                          <td className="product-cell">
                            <div className="product-info">
                              <strong title={productData.product.name}>
                                {productData.product.name}
                              </strong>
                              <span className="options">
                                {item.selectedOptions
                                  .map(
                                    (opt) =>
                                      `${opt.keyOption}: ${opt.valueOption}`,
                                  )
                                  .join(', ')}
                              </span>
                            </div>
                          </td>
  
                          <td className="quantity-cell">{item.amount}</td>
  
                          <td className="subtotal-cell">
                            ${subtotal.toLocaleString('es-AR')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            */}
          {/*
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
          */}
        </>
      </DrawerComponent>
      <ModalComponent
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditProduct(null);
          setEditAmount(1);
        }}
        containerStyles={{ width: '780px', height: '500px' }}
      >
        {editProduct &&
          (() => {
            const productData = products.find(
              (p) => p.product._id === editProduct.productId,
            );
            if (!productData) return null;
            return (
              <form
                onSubmit={handleSubmit((data) =>
                  handleUpdateProductInCart(data),
                )}
                style={{
                  width: '100%',
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 20,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setEditModalOpen(false);
                    setEditProduct(null);
                    setEditAmount(1);
                  }}
                >
                  x
                </div>
                <div className="custom-package-add-item-modal-base-container custom-package-add-item-modal-content">
                  {productData.product.image ? (
                    <img
                      className="custom-package-add-item-modal-img"
                      src={productData.product.image.url}
                    />
                  ) : (
                    <div
                      className="custom-package-add-item-modal-img"
                      style={{ backgroundColor: 'grey' }}
                    ></div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      boxSizing: 'border-box',
                      gap: 12,
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 19 }}>
                      {productData.product.name}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: 23 }}>
                      ${productData.product.price}{' '}
                      <span
                        style={{
                          fontWeight: 300,
                          fontSize: 12,
                          color: '#595959',
                        }}
                      >
                        per unit
                      </span>
                    </span>
                    {/* Opciones seleccionables */}
                    {productData.product.selectableOptions.map((option) => (
                      <div
                        key={option.keyOption}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 5,
                        }}
                      >
                        <label style={{ display: 'block', fontSize: 13 }}>
                          {option.keyOption}
                        </label>
                        <div className="radio-group">
                          {option.valueOption.map((value) => (
                            <label key={value} className="radio-card">
                              <input
                                type="radio"
                                value={value}
                                defaultChecked={
                                  !!editProduct.selectedOptions.find(
                                    (opt) =>
                                      opt.keyOption === option.keyOption &&
                                      opt.valueOption === value,
                                  )
                                }
                                {...register(option.keyOption, {
                                  onChange: () => setProductModalError(null),
                                })}
                                name={option.keyOption}
                              />
                              <span>{value}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* Cantidad */}
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        boxSizing: 'border-box',
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 450 }}>
                        Quantity
                      </span>
                      <div
                        className="custom-package-plan-details-drawer-list-item-quantity-control"
                        style={{ margin: 0 }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setEditAmount((prev) => Math.max(1, prev - 1))
                          }
                          disabled={editAmount === 1}
                        >
                          -
                        </button>
                        <span>{editAmount}</span>
                        <button
                          type="button"
                          onClick={() => setEditAmount((prev) => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="custom-package-add-item-total-amount-container">
                      <div className="custom-package-add-item-total-amount-row">
                        <span style={{ fontSize: 11, color: '#4b5563' }}>
                          Unit Price
                        </span>
                        <span
                          style={{
                            fontWeight: 500,
                            fontSize: 11,
                            color: 'black',
                          }}
                        >
                          ${productData.product.price}
                        </span>
                      </div>
                      <div className="divider"></div>
                      <div className="custom-package-add-item-total-amount-row">
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 12,
                            color: 'black',
                          }}
                        >
                          Subtotal
                        </span>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 17,
                            color: '#7d2ae8',
                          }}
                        >
                          ${editAmount * productData.product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="custom-package-add-item-modal-base-container custom-package-add-item-modal-footer">
                  <button
                    className="card-button"
                    style={{ width: 'calc(100% - 20px)', margin: '0 auto' }}
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            );
          })()}
      </ModalComponent>
      <ModalComponent
        open={openEditProductModal}
        onClose={() => {
          setOpenEditProductModal(false);
          setEditProductData(null);
          setEditAmount(1);
          setEditProductModalError(null);
        }}
        containerStyles={{ width: '780px', height: '500px' }}
      >
        {editProductData && (
          <form
            onSubmit={handleSubmit((data) => {
              try {
                updateEditedProductInCart({ ...data, amount: editAmount });
              } catch {}
            })}
            style={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 20,
                cursor: 'pointer',
              }}
              onClick={() => {
                setOpenEditProductModal(false);
                setEditProductData(null);
                setEditAmount(1);
                setEditProductModalError(null);
              }}
            >
              x
            </div>
            <div className="custom-package-add-item-modal-base-container custom-package-add-item-modal-content">
              {editProductData?.image ? (
                <img
                  className="custom-package-add-item-modal-img"
                  src={editProductData.image.url}
                />
              ) : (
                <div
                  className="custom-package-add-item-modal-img"
                  style={{ backgroundColor: 'grey' }}
                ></div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box',
                  gap: 12,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 19 }}>
                  {editProductData?.name}
                </span>
                <p
                  style={{
                    fontSize: 11,
                    lineHeight: 1.3,
                    margin: 0,
                    fontWeight: 400,
                    color: 'grey',
                  }}
                >
                  Smooth, rich cold brew coffee made from premium organic beans.
                  Perfect for your morning routine or afternoon pick-me-up. Low
                  acidity and naturally sweet.
                </p>
                <span style={{ fontWeight: 800, fontSize: 23 }}>
                  ${editProductData?.price}{' '}
                  <span
                    style={{ fontWeight: 300, fontSize: 12, color: '#595959' }}
                  >
                    per unit
                  </span>
                </span>

                <div
                  className="custom-package-add-item-info-container"
                  style={{
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      className="bi bi-truck"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg>
                    <span style={{ fontSize: 11.5, fontWeight: 500 }}>
                      Delivery Type
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      border: '2px solid #1d39c4',
                      backgroundColor: ' #ffffff',
                      padding: 10,
                      borderRadius: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    {editProductData.shipping_required ? (
                      <>
                        <div
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 5,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-house-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                          </svg>
                          <span style={{ fontSize: 11, fontWeight: 500 }}>
                            Home Delivery
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 300,
                            color: 'grey',
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          Delivered to your doorstep with your subscription
                        </p>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 5,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-shop"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.375 2.375 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                          </svg>
                          <span style={{ fontSize: 11, fontWeight: 500 }}>
                            Store Pickup
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 300,
                            color: 'grey',
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          Pick up at your nearest location
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {editProductModalError && (
                  <span
                    style={{ marginBottom: 10, fontSize: 12, color: '#f5222d' }}
                  >
                    *{editProductModalError}
                  </span>
                )}

                {editProductData.selectableOptions.map((option: any) => (
                  <div
                    key={option.keyOption}
                    style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                  >
                    <label style={{ display: 'block', fontSize: 13 }}>
                      {option.keyOption}
                    </label>
                    <div className="radio-group">
                      {option.valueOption.map((value: string) => (
                        <label key={value} className="radio-card">
                          <input
                            type="radio"
                            value={value}
                            {...register(option.keyOption, {
                              onChange: () => setEditProductModalError(null),
                            })}
                            name={option.keyOption}
                            defaultChecked={
                              editProductData.selectedOptions?.find(
                                (opt: any) =>
                                  opt.keyOption === option.keyOption,
                              )?.valueOption === value
                            }
                          />
                          <span>{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box',
                  gap: 15,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    boxSizing: 'border-box',
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 450 }}>
                    Quantity
                  </span>
                  <div
                    className="custom-package-plan-details-drawer-list-item-quantity-control"
                    style={{ margin: 0 }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setEditAmount((prev) => Math.max(1, prev - 1))
                      }
                      disabled={editAmount === 1}
                    >
                      -
                    </button>
                    <span>{editAmount}</span>
                    <button
                      type="button"
                      onClick={() => setEditAmount((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 300 }}>
                    Min: 1 | Max: 12 bottles per delivery
                  </span>
                </div>
                <div className="custom-package-add-item-total-amount-container">
                  <div className="custom-package-add-item-total-amount-row">
                    <span style={{ fontSize: 11, color: '#4b5563' }}>
                      Unit Price
                    </span>
                    <span
                      style={{ fontWeight: 500, fontSize: 11, color: 'black' }}
                    >
                      ${editProductData.price}
                    </span>
                  </div>
                  <div className="divider"></div>
                  <div className="custom-package-add-item-total-amount-row">
                    <span
                      style={{ fontWeight: 600, fontSize: 12, color: 'black' }}
                    >
                      Subtotal
                    </span>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 17,
                        color: '#7d2ae8',
                      }}
                    >
                      ${editAmount * editProductData.price}
                    </span>
                  </div>
                </div>
                <div className="custom-package-add-item-info-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="#2762ea"
                    className="bi bi-info-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                  </svg>
                  <p style={{ margin: 0, lineHeight: 1.2, fontSize: 12 }}>
                    This product will be included in your recurring
                    subscription. You can modify or cancel anytime from your
                    account dashboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-package-add-item-modal-base-container custom-package-add-item-modal-footer">
              <button
                className="card-button"
                style={{ width: 'calc(100% - 20px)', margin: '0 auto' }}
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </ModalComponent>
    </>
  );
};

export default CustomPackageDetailsContent;
