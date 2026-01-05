import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../../public/styles/cartStyles.css';
import ServiceSection from './CustomPackage/ServiceSection.tsx';
import DetailsDrawer from './CustomPackage/DetailsDrawer.tsx';
import ProductsSection from './CustomPackage/ProductsSection.tsx';
import EditProductModal from './CustomPackage/EditProductModal.tsx';
import EditServiceModal from './CustomPackage/EditServiceModal.tsx';
import BenefitsSection from './CustomPackage/BenefitsSection.tsx';
import EditBenefitModal from './CustomPackage/EditBenefitModal.tsx';
import DiscountsSection from './CustomPackage/DiscountsSection.tsx';
import EditDiscountModal from './CustomPackage/EditDiscountModal.tsx';

const CustomPackageDetailsContent: React.FC = () => {
  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);
  // Estado para ocultar el aside al llegar al footer
  const [hideAside, setHideAside] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  const [showSecondaryStickyBar, setShowSecondaryStickyBar] = useState(false);
  const secondaryStickyRef = useRef<HTMLDivElement>(null);

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
  const services: {
    service: {
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
    delivery_mode: 'inperson' | 'online' | 'athome';
  }[] = [
    {
      service: {
        _id: 'svc1',
        name: 'Servicio de Consultoría',
        image: null,
        description: 'Asesoramiento profesional en diversas áreas.',
        selectableOptions: [
          {
            keyOption: 'Duración',
            valueOption: ['30 minutos', '1 hora', '2 horas'],
          },
          { keyOption: 'Idioma', valueOption: ['Español', 'Inglés'] },
        ],
        price: 100,
        currencyId: 'USD',
      },
      delivery_mode: 'online',
    },
    {
      service: {
        _id: 'svc2',
        name: 'Sesión de Entrenamiento Personal',
        image: null,
        description:
          'Entrenamiento físico personalizado para alcanzar tus metas.',
        selectableOptions: [
          {
            keyOption: 'Nivel',
            valueOption: ['Principiante', 'Intermedio', 'Avanzado'],
          },
          { keyOption: 'Duración', valueOption: ['45 minutos', '1 hora'] },
        ],
        price: 75,
        currencyId: 'USD',
      },
      delivery_mode: 'inperson',
    },
    {
      service: {
        _id: 'svc3',
        name: 'Clases de Cocina Gourmet',
        image: null,
        description:
          'Aprende a preparar platos gourmet con un chef profesional.',
        selectableOptions: [
          {
            keyOption: 'Tipo de Cocina',
            valueOption: ['Italiana', 'Japonesa', 'Mexicana'],
          },
          {
            keyOption: 'Nivel',
            valueOption: ['Básico', 'Intermedio', 'Avanzado'],
          },
        ],
        price: 120,
        currencyId: 'USD',
      },
      delivery_mode: 'athome',
    },
    {
      service: {
        _id: 'svc4',
        name: 'Terapia de Masajes',
        image: null,
        description:
          'Relájate y rejuvenece con sesiones de masajes terapéuticos.',
        selectableOptions: [
          {
            keyOption: 'Tipo de Masaje',
            valueOption: ['Sueco', 'Terapéutico', 'Deportivo'],
          },
          { keyOption: 'Duración', valueOption: ['30 minutos', '1 hora'] },
        ],
        price: 90,
        currencyId: 'USD',
      },
      delivery_mode: 'inperson',
    },
  ];
  const benefits: {
    benefit: {
      _id: string;
      title: string;
      description: string;
      price: number;
      currencyId: string;
    };
    delivery_mode: 'inperson' | 'online' | 'athome';
  }[] = [
    {
      benefit: {
        _id: 'ben1',
        title: 'Acceso Premium a Contenido Exclusivo',
        description: 'Disfruta de contenido exclusivo y recursos adicionales.',
        price: 50,
        currencyId: 'USD',
      },
      delivery_mode: 'online',
    },
    {
      benefit: {
        _id: 'ben2',
        title: 'Asesoría Personalizada',
        description: 'Recibe asesoría personalizada para tu negocio.',
        price: 100,
        currencyId: 'USD',
      },
      delivery_mode: 'inperson',
    },
    {
      benefit: {
        _id: 'ben3',
        title: 'Acceso a Webinars Exclusivos',
        description:
          'Participa en webinars exclusivos con expertos de la industria.',
        price: 75,
        currencyId: 'USD',
      },
      delivery_mode: 'online',
    },
    {
      benefit: {
        _id: 'ben4',
        title: 'Soporte Prioritario',
        description:
          'Obtén soporte prioritario para resolver tus dudas rápidamente.',
        price: 150,
        currencyId: 'USD',
      },
      delivery_mode: 'inperson',
    },
  ];

  const discounts: {
    discount: {
      _id: string;
      title: string;
      description: string;
      price: number;
      currencyId: string;
    };
  }[] = [
    {
      discount: {
        _id: 'disc1',
        title: 'Descuento de Primavera',
        description: 'Aprovecha un 20% de descuento en todos los servicios.',
        price: 20,
        currencyId: 'USD',
      },
    },
    {
      discount: {
        _id: 'disc2',
        title: 'Oferta de Fin de Año',
        description: 'Obtén un 25% de descuento en compras superiores a $200.',
        price: 25,
        currencyId: 'USD',
      },
    },
    {
      discount: {
        _id: 'disc3',
        title: 'Descuento para Nuevos Clientes',
        description: 'Recibe un 15% de descuento en tu primera compra.',
        price: 15,
        currencyId: 'USD',
      },
    },
  ];

  // ================= CATEGORÍAS Y NAVEGACIÓN SINCRONIZADA =================
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const benefitsSectionRef = useRef<HTMLDivElement>(null);
  const discountsSectionRef = useRef<HTMLDivElement>(null);

  // Forzamos el tipo correcto en el array categories
  const categories: {
    name: string;
    count: number;
    ref: React.RefObject<HTMLDivElement>;
  }[] = [
    {
      name: 'Productos',
      count: products.length,
      ref: productsSectionRef as React.RefObject<HTMLDivElement>,
    },
    {
      name: 'Servicios',
      count: services.length,
      ref: servicesSectionRef as React.RefObject<HTMLDivElement>,
    },
    {
      name: 'Beneficios',
      count: benefits.length,
      ref: benefitsSectionRef as React.RefObject<HTMLDivElement>,
    },
    {
      name: 'Descuentos',
      count: discounts.length,
      ref: discountsSectionRef as React.RefObject<HTMLDivElement>,
    },
  ];

  const [activeCategory, setActiveCategory] = useState('Productos');

  // Scroll suave al hacer click en categoría
  const handleCategoryClick = (
    ref: React.RefObject<HTMLDivElement>,
    name: string,
  ) => {
    setActiveCategory(name);
    if (ref.current) {
      const offset = 120; // Ajusta según altura de sticky bars
      const top =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Sincronizar categoría activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = 130; // Ajusta según altura de sticky bars
      const sectionTops = categories.map((cat) => {
        if (!cat.ref.current) return Infinity;
        return Math.abs(cat.ref.current.getBoundingClientRect().top - offset);
      });
      const minIndex = sectionTops.indexOf(Math.min(...sectionTops));
      setActiveCategory(categories[minIndex].name);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!secondaryStickyRef.current) return;
      const rect = secondaryStickyRef.current.getBoundingClientRect();
      // El sticky bar principal está en top: 50px y mide ~40px, así que el segundo debe aparecer debajo
      setShowSecondaryStickyBar(rect.top <= 50 + 40); // 90px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [planDetailsDrawerOpen, setPlanDetailsDrawerOpen] =
    useState<boolean>(false);

  /* ================= PRODUCTS ================= */
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
  const getTotalProductsInCart = () => {
    return productsInCart.reduce((acc, item) => acc + item.amount, 0);
  };
  const [editProductAmount, setEditProductAmount] = useState(1);

  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [editProductData, setEditProductData] = useState<any>(null);
  const [editProductModalError, setEditProductModalError] = useState<
    string | null
  >(null);

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
    setEditProductAmount(item.amount);
    setOpenEditProductModal(true);
    setEditProductModalError(null);
  };

  /* ================= SERVICES ================= */
  const [servicesInCart, setServicesInCart] = useState<
    {
      listId: string;
      serviceId: string;
      selectedOptions: { keyOption: string; valueOption: string }[];
      amount: number;
    }[]
  >([]);
  const [selectedService, setSelectedService] = useState<{
    _id: string;
    name: string;
    image?: {
      url: string;
    } | null;
    description: string;
    selectableOptions: { keyOption: string; valueOption: string[] }[];
    price: number;
    currencyId: string;
    delivery_mode: 'inperson' | 'online' | 'athome';
  } | null>(null);

  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [editServiceData, setEditServiceData] = useState<any>(null);
  const [editServiceAmount, setEditServiceAmount] = useState(1);
  const [editServiceModalError, setEditServiceModalError] = useState<
    string | null
  >(null);

  const handleEditServiceClick = (item: any) => {
    setPlanDetailsDrawerOpen(false);
    const serviceData = services.find(
      (serv) => serv.service._id === item.serviceId,
    );
    if (!serviceData) return;
    setEditServiceData({
      ...serviceData.service,
      delivery_mode: serviceData.delivery_mode,
      selectedOptions: item.selectedOptions,
      listId: item.listId,
    });
    setEditServiceAmount(item.amount);
    setOpenEditServiceModal(true);
    setEditServiceModalError(null);
  };

  const getTotalServicesInCart = () => {
    return servicesInCart.reduce((acc, item) => acc + item.amount, 0);
  };

  /* ================= BENEFITS ================= */
  const [selectedBenefit, setSelectedBenefit] = useState<{
    _id: string;
    title: string;
    description: string;
    price: number;
    currencyId: string;
    delivery_mode: 'inperson' | 'online' | 'athome';
  } | null>(null);
  const [benefitsInCart, setBenefitsInCart] = useState<
    {
      listId: string;
      benefitId: string;
      amount: number;
    }[]
  >([]);

  const [openEditBenefitModal, setOpenEditBenefitModal] = useState(false);
  const [editBenefitData, setEditBenefitData] = useState<any>(null);
  const [editBenefitAmount, setEditBenefitAmount] = useState(1);

  const handleEditBenefitClick = (item: any) => {
    setPlanDetailsDrawerOpen(false);
    const benefitData = benefits.find(
      (benefit) => benefit.benefit._id === item.benefitId,
    );
    if (!benefitData) return;
    setEditBenefitData({
      ...benefitData.benefit,
      delivery_mode: benefitData.delivery_mode,
      listId: item.listId,
    });
    setEditBenefitAmount(item.amount);
    setOpenEditBenefitModal(true);
  };

  const getTotalBenefitsInCart = () => {
    return benefitsInCart.reduce((acc, item) => acc + item.amount, 0);
  };

  /* ================= DISCOUNTS ================= */

  const [selectedDiscount, setSelectedDiscount] = useState<{
    _id: string;
    title: string;
    description: string;
    price: number;
    currencyId: string;
  } | null>(null);

  const [discountsInCart, setDiscountsInCart] = useState<
    {
      listId: string;
      discountId: string;
      amount: number;
    }[]
  >([]);

  const [openEditDiscountModal, setOpenEditDiscountModal] = useState(false);
  const [editDiscountData, setEditDiscountData] = useState<any>(null);
  const [editDiscountAmount, setEditDiscountAmount] = useState(1);

  const handleEditDiscountClick = (item: any) => {
    setPlanDetailsDrawerOpen(false);
    const discountData = discounts.find(
      (discount) => discount.discount._id === item.discountId,
    );
    if (!discountData) return;
    setEditDiscountData({
      ...discountData.discount,
      listId: item.listId,
    });
    setEditDiscountAmount(item.amount);
    setOpenEditDiscountModal(true);
  };

  const getTotalDiscountsInCart = () => {
    return discountsInCart.reduce((acc, item) => acc + item.amount, 0);
  };

  /* ================= ----------- ================= */

  const calculateTotal = () => {
    const productsTotal = productsInCart.reduce((total, item) => {
      const product = products.find((p) => p.product._id === item.productId);
      const price = product ? product.product.price : 0;
      return total + price * item.amount;
    }, 0);
    const servicesTotal = servicesInCart.reduce((total, item) => {
      const service = services.find((s) => s.service._id === item.serviceId);
      const price = service ? service.service.price : 0;
      return total + price * item.amount;
    }, 0);
    const benefitsTotal = benefitsInCart.reduce((total, item) => {
      const benefit = benefits.find((b) => b.benefit._id === item.benefitId);
      const price = benefit ? benefit.benefit.price : 0;
      return total + price * item.amount;
    }, 0);
    const discountsTotal = discountsInCart.reduce((total, item) => {
      const discount = discounts.find(
        (d) => d.discount._id === item.discountId,
      );
      const price = discount ? discount.discount.price : 0;
      return total + price * item.amount;
    }, 0);

    return productsTotal + servicesTotal + benefitsTotal + discountsTotal;
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
          padding: 0,
          height: 65,
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
      {showSecondaryStickyBar && (
        <section
          className="secondary-sticky-bar-section"
          style={{
            position: 'fixed',
            top: 115, // debajo del sticky bar principal
            left: 0,
            width: '930px',
            zIndex: 999,
            background: '#fff',
            transition: 'opacity 0.3s',
            opacity: 1,
            boxSizing: 'border-box',
            paddingTop: '10px',
            paddingLeft: '45px',
            paddingBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9fafb',
          }}
          aria-hidden={!showSecondaryStickyBar}
        >
          <div className="custom-package-categories-section">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`custom-package-categories-item${activeCategory === cat.name ? ' custom-package-categories-item-cta' : ''}`}
                onClick={() => handleCategoryClick(cat.ref, cat.name)}
                style={{ cursor: 'pointer' }}
              >
                <span>
                  {cat.name} ({cat.count})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
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
          {/* ================= PACKAGE DESCRIPTION ================= */}
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
          {/* ================= CATEGORIES ================= */}
          <div
            className="custom-package-categories-section"
            ref={secondaryStickyRef}
          >
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`custom-package-categories-item${activeCategory === cat.name ? ' custom-package-categories-item-cta' : ''}`}
                onClick={() => handleCategoryClick(cat.ref, cat.name)}
                style={{ cursor: 'pointer' }}
              >
                <span>
                  {cat.name} ({cat.count})
                </span>
              </div>
            ))}
          </div>
          {/* ================= PRODUCTS ================= */}
          <div ref={productsSectionRef} />
          <ProductsSection
            products={products}
            setProductsInCart={setProductsInCart}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
          {/* ================= SERVICES ================= */}
          <div ref={servicesSectionRef} />
          <ServiceSection
            services={services}
            setServicesInCart={setServicesInCart}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
          {/* ================= BENEFITS ================= */}
          <div ref={benefitsSectionRef} />
          <BenefitsSection
            benefits={benefits}
            setBenefitsInCart={setBenefitsInCart}
            selectedBenefit={selectedBenefit}
            setSelectedBenefit={setSelectedBenefit}
          />
          {/* ================= DISCOUNTS ================= */}
          <div ref={discountsSectionRef} />
          <DiscountsSection
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
            discounts={discounts}
            setDiscountsInCart={setDiscountsInCart}
          />
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
              {productsInCart.length !== 0 ||
              servicesInCart.length !== 0 ||
              benefitsInCart.length !== 0 ||
              discountsInCart.length !== 0 ? (
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
                  {productsInCart.length !== 0 && (
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
                  )}
                  {servicesInCart.length !== 0 && (
                    <span
                      style={{
                        fontSize: 13,
                        color: '#8c8c8c',
                        fontWeight: 300,
                      }}
                    >
                      • {getTotalServicesInCart()} servicio
                      {getTotalServicesInCart() > 1 ? 's' : ''}
                    </span>
                  )}

                  {benefitsInCart.length !== 0 && (
                    <span
                      style={{
                        fontSize: 13,
                        color: '#8c8c8c',
                        fontWeight: 300,
                      }}
                    >
                      • {getTotalBenefitsInCart()} beneficio
                      {getTotalBenefitsInCart() > 1 ? 's' : ''}
                    </span>
                  )}

                  {discountsInCart.length !== 0 && (
                    <span
                      style={{
                        fontSize: 13,
                        color: '#8c8c8c',
                        fontWeight: 300,
                      }}
                    >
                      • {getTotalDiscountsInCart()} descuento
                      {getTotalDiscountsInCart() > 1 ? 's' : ''}
                    </span>
                  )}
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
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </section>
      <DetailsDrawer
        planDetailsDrawerOpen={planDetailsDrawerOpen}
        setPlanDetailsDrawerOpen={setPlanDetailsDrawerOpen}
        services={services}
        servicesInCart={servicesInCart}
        setServicesInCart={setServicesInCart}
        handleEditServiceClick={handleEditServiceClick}
        products={products}
        productsInCart={productsInCart}
        setProductsInCart={setProductsInCart}
        handleEditProductClick={handleEditProductClick}
        benefits={benefits}
        benefitsInCart={benefitsInCart}
        setBenefitsInCart={setBenefitsInCart}
        handleEditBenefitClick={handleEditBenefitClick}
        discounts={discounts}
        discountsInCart={discountsInCart}
        setDiscountsInCart={setDiscountsInCart}
        handleEditDiscountClick={handleEditDiscountClick}
      />
      {/* ================= EDIT PRODUCT ================= */}
      <EditProductModal
        openEditProductModal={openEditProductModal}
        setOpenEditProductModal={setOpenEditProductModal}
        editProductData={editProductData}
        setEditProductData={setEditProductData}
        editProductAmount={editProductAmount}
        setEditProductAmount={setEditProductAmount}
        editProductModalError={editProductModalError}
        setEditProductModalError={setEditProductModalError}
        setProductsInCart={setProductsInCart}
        setSelectedProduct={setSelectedProduct}
      />
      {/* ================= EDIT SERVICE ================= */}
      <EditServiceModal
        openEditServiceModal={openEditServiceModal}
        setOpenEditServiceModal={setOpenEditServiceModal}
        editServiceData={editServiceData}
        setEditServiceData={setEditServiceData}
        editServiceAmount={editServiceAmount}
        setEditServiceAmount={setEditServiceAmount}
        editServiceModalError={editServiceModalError}
        setEditServiceModalError={setEditServiceModalError}
        setServicesInCart={setServicesInCart}
        setSelectedService={setSelectedService}
      />
      {/* ================= EDIT BENEFIT ================= */}
      <EditBenefitModal
        openEditBenefitModal={openEditBenefitModal}
        setOpenEditBenefitModal={setOpenEditBenefitModal}
        editBenefitData={editBenefitData}
        setEditBenefitData={setEditBenefitData}
        editBenefitAmount={editBenefitAmount}
        setEditBenefitAmount={setEditBenefitAmount}
        setBenefitsInCart={setBenefitsInCart}
        setSelectedBenefit={setSelectedBenefit}
      />
      {/* ================= EDIT DISCOUNT ================= */}
      <EditDiscountModal
        openEditDiscountModal={openEditDiscountModal}
        setOpenEditDiscountModal={setOpenEditDiscountModal}
        editDiscountData={editDiscountData}
        setEditDiscountData={setEditDiscountData}
        editDiscountAmount={editDiscountAmount}
        setEditDiscountAmount={setEditDiscountAmount}
        setDiscountsInCart={setDiscountsInCart}
        setSelectedDiscount={setSelectedDiscount}
      />
    </>
  );
};

export default CustomPackageDetailsContent;
