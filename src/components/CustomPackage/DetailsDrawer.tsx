import React, { useState } from 'react';
import DrawerComponent from '../DrawerComponent.tsx';
import EmptyCartAnimation from '../EmptyCartAnimation.tsx';
import '../../../public/styles/CustomPackageDetailsDrawer.css';

interface ComponentProps {
  planDetailsDrawerOpen: boolean;
  setPlanDetailsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /*================= SERVICES =================*/
  services: {
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
  }[];
  servicesInCart: {
    listId: string;
    serviceId: string;
    selectedOptions: { keyOption: string; valueOption: string }[];
    amount: number;
  }[];
  setServicesInCart: React.Dispatch<
    React.SetStateAction<
      {
        listId: string;
        serviceId: string;
        selectedOptions: { keyOption: string; valueOption: string }[];
        amount: number;
      }[]
    >
  >;
  handleEditServiceClick: (item: any) => void;
  /*================= PRODUCTS =================*/
  products: {
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
  }[];
  productsInCart: {
    listId: string;
    productId: string;
    selectedOptions: { keyOption: string; valueOption: string }[];
    amount: number;
  }[];
  setProductsInCart: React.Dispatch<
    React.SetStateAction<
      {
        listId: string;
        productId: string;
        selectedOptions: { keyOption: string; valueOption: string }[];
        amount: number;
      }[]
    >
  >;
  handleEditProductClick: (item: any) => void;
  /*================= BENEFITS =================*/
  benefits: {
    benefit: {
      _id: string;
      title: string;
      description: string;
      price: number;
      currencyId: string;
    };
    delivery_mode: 'inperson' | 'online' | 'athome';
  }[];
  benefitsInCart: {
    listId: string;
    benefitId: string;
    amount: number;
  }[];
  setBenefitsInCart: React.Dispatch<
    React.SetStateAction<
      {
        listId: string;
        benefitId: string;
        amount: number;
      }[]
    >
  >;
  handleEditBenefitClick: (item: any) => void;
  /*================= DISCOUNTS =================*/
  discounts: {
    discount: {
      _id: string;
      title: string;
      description: string;
      price: number;
      currencyId: string;
    };
  }[];
  discountsInCart: {
    listId: string;
    discountId: string;
    amount: number;
  }[];
  setDiscountsInCart: React.Dispatch<
    React.SetStateAction<
      {
        listId: string;
        discountId: string;
        amount: number;
      }[]
    >
  >;
  handleEditDiscountClick: (item: any) => void;
}

const DetailsDrawer: React.FC<ComponentProps> = ({
  planDetailsDrawerOpen,
  setPlanDetailsDrawerOpen,
  services,
  servicesInCart,
  setServicesInCart,
  handleEditServiceClick,
  products,
  productsInCart,
  setProductsInCart,
  handleEditProductClick,
  benefits,
  benefitsInCart,
  setBenefitsInCart,
  handleEditBenefitClick,
  discounts,
  discountsInCart,
  setDiscountsInCart,
  handleEditDiscountClick,
}) => {
  /*================= PRODUCTS LOGIC =================*/
  const handleIncreaseProductAmount = (listId: string) => {
    setProductsInCart((prev) =>
      prev.map((item) =>
        item.listId === listId ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  };

  const handleDecreaseProductAmount = (listId: string) => {
    setProductsInCart((prev) =>
      prev.map((item) =>
        item.listId === listId && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item,
      ),
    );
  };

  const removeProductfromCart = (listId: string) => {
    const updateData = productsInCart.filter((prod) => prod.listId !== listId);
    setProductsInCart(updateData);
  };

  const getTotalProductsInCart = () => {
    return productsInCart.reduce((acc, item) => acc + item.amount, 0);
  };

  /*================= SERVICES LOGIC =================*/
  const handleIncreaseServiceAmount = (listId: string) => {
    setServicesInCart((prev) =>
      prev.map((item) =>
        item.listId === listId ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  };

  const handleDecreaseServiceAmount = (listId: string) => {
    setServicesInCart((prev) =>
      prev.map((item) =>
        item.listId === listId && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item,
      ),
    );
  };

  const removeServicefromCart = (listId: string) => {
    const updateData = servicesInCart.filter((serv) => serv.listId !== listId);
    setServicesInCart(updateData);
  };

  /*================= BENEFITS LOGIC =================*/

  const handleIncreaseBenefitAmount = (listId: string) => {
    setBenefitsInCart((prev) =>
      prev.map((item) =>
        item.listId === listId ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  };

  const handleDecreaseBenefitAmount = (listId: string) => {
    setBenefitsInCart((prev) =>
      prev.map((item) =>
        item.listId === listId && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item,
      ),
    );
  };

  const removeBenefitfromCart = (listId: string) => {
    const updateData = benefitsInCart.filter(
      (benefit) => benefit.listId !== listId,
    );
    setBenefitsInCart(updateData);
  };

  const getTotalBenefitsInCart = () => {
    return benefitsInCart.reduce((acc, item) => acc + item.amount, 0);
  };

  /*================= DISCOUNTS LOGIC =================*/

  const handleIncreaseDiscountAmount = (listId: string) => {
    setDiscountsInCart((prev) =>
      prev.map((item) =>
        item.listId === listId ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  };

  const handleDecreaseDiscountAmount = (listId: string) => {
    setDiscountsInCart((prev) =>
      prev.map((item) =>
        item.listId === listId && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item,
      ),
    );
  };

  const removeDiscountfromCart = (listId: string) => {
    const updateData = discountsInCart.filter(
      (discount) => discount.listId !== listId,
    );
    setDiscountsInCart(updateData);
  };

  const getTotalDiscountsInCart = () => {
    return discountsInCart.reduce((acc, item) => acc + item.amount, 0);
  };

  /*================= GENERAL LOGIC =================*/

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

  const getTotalServicesInCart = () => {
    return servicesInCart.reduce((acc, item) => acc + item.amount, 0);
  };

  return (
    <>
      <DrawerComponent
        open={planDetailsDrawerOpen}
        onClose={() => {
          setPlanDetailsDrawerOpen(false);
        }}
        customClassName="custom-package-details-drawer-container"
      >
        <>
          {productsInCart.length !== 0 ||
          servicesInCart.length !== 0 ||
          benefitsInCart.length !== 0 ||
          discountsInCart.length !== 0 ? (
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
                <div
                  onClick={() => {
                    setPlanDetailsDrawerOpen(false);
                  }}
                  className="close-icon"
                >
                  <img
                    className="navbar-responsive-logo"
                    src="/assets/icons/close-icon.svg"
                    alt="Menu icon"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
              <ul className="custom-package-plan-details-drawer-base-container custom-package-plan-details-drawer-list-container">
                {productsInCart.length !== 0 && (
                  <>
                    <li>
                      <span style={{ fontSize: 12 }}>
                        Products in Plan ({getTotalProductsInCart()})
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
                                    (opt) =>
                                      `${opt.keyOption}: ${opt.valueOption}`,
                                  )
                                  .join(', ')}
                              </span>
                              <div className="custom-package-plan-details-drawer-list-item-quantity-control">
                                <button
                                  onClick={() =>
                                    handleDecreaseProductAmount(item.listId)
                                  }
                                  disabled={item.amount === 1}
                                >
                                  -
                                </button>
                                <span>{item.amount}</span>
                                <button
                                  onClick={() =>
                                    handleIncreaseProductAmount(item.listId)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="custom-package-plan-details-drawer-list-item-right-col">
                              <div style={{ display: 'flex', gap: 7 }}>
                                <img
                                  src="/assets/icons/trash3.svg"
                                  alt="Trash icon"
                                  width="13"
                                  height="13"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    removeProductfromCart(item.listId)
                                  }
                                />
                                <img
                                  src="/assets/icons/edit-icon.svg"
                                  alt="Edit icon"
                                  width="14"
                                  height="14"
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
                  </>
                )}
                {servicesInCart.length !== 0 && (
                  <>
                    <li>
                      <span style={{ fontSize: 12 }}>
                        Services in Plan ({getTotalServicesInCart()})
                      </span>
                    </li>
                    {servicesInCart.map((item, index) => {
                      const serviceData = services.find(
                        (serv) => serv.service._id === item.serviceId,
                      );
                      if (!serviceData) return null;
                      return (
                        <>
                          <li
                            key={index}
                            className="custom-package-plan-details-drawer-list-item"
                          >
                            {serviceData.service.image ? (
                              <img
                                className="custom-package-plan-details-drawer-list-item-img"
                                src={serviceData.service.image.url}
                                alt={`${serviceData.service.name}`}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <></>
                            )}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                              }}
                            >
                              <span style={{ fontSize: 13, fontWeight: 600 }}>
                                {serviceData.service.name}
                              </span>
                              <span style={{ fontSize: 11.5, fontWeight: 300 }}>
                                {item.selectedOptions
                                  .map(
                                    (opt) =>
                                      `${opt.keyOption}: ${opt.valueOption}`,
                                  )
                                  .join(', ')}
                              </span>
                              <div className="custom-package-plan-details-drawer-list-item-quantity-control">
                                <button
                                  onClick={() =>
                                    handleDecreaseServiceAmount(item.listId)
                                  }
                                  disabled={item.amount === 1}
                                >
                                  -
                                </button>
                                <span>{item.amount}</span>
                                <button
                                  onClick={() =>
                                    handleIncreaseServiceAmount(item.listId)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="custom-package-plan-details-drawer-list-item-right-col">
                              <div style={{ display: 'flex', gap: 7 }}>
                                <img
                                  src="/assets/icons/trash3.svg"
                                  alt="Trash icon"
                                  width="13"
                                  height="13"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    removeServicefromCart(item.listId)
                                  }
                                />
                                <img
                                  src="/assets/icons/edit-icon.svg"
                                  alt="Edit icon"
                                  width="14"
                                  height="14"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleEditServiceClick(item)}
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
                                  ${serviceData.service.price} c/u
                                </span>
                                <span
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 800,
                                  }}
                                >
                                  ${serviceData.service.price * item.amount}
                                </span>
                              </div>
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </>
                )}
                {benefitsInCart.length !== 0 && (
                  <>
                    <li>
                      <span style={{ fontSize: 12 }}>
                        Benefits in Plan ({getTotalBenefitsInCart()})
                      </span>
                    </li>
                    {benefitsInCart.map((item, index) => {
                      const benefitData = benefits.find(
                        (benefit) => benefit.benefit._id === item.benefitId,
                      );
                      if (!benefitData) return null;
                      return (
                        <>
                          <li
                            key={index}
                            className="custom-package-plan-details-drawer-list-item"
                          >
                            <></>

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  boxSizing: 'border-box',
                                  gap: 5,
                                }}
                              >
                                <img
                                  src="/assets/icons/verified.svg"
                                  alt="Verified icon"
                                  width="18"
                                  height="18"
                                  loading="lazy"
                                  decoding="async"
                                  referrerPolicy="no-referrer"
                                />
                                <span style={{ fontSize: 13, fontWeight: 600 }}>
                                  {benefitData.benefit.title}
                                </span>
                              </div>

                              <div className="custom-package-plan-details-drawer-list-item-quantity-control">
                                <button
                                  onClick={() =>
                                    handleDecreaseBenefitAmount(item.listId)
                                  }
                                  disabled={item.amount === 1}
                                >
                                  -
                                </button>
                                <span>{item.amount}</span>
                                <button
                                  onClick={() =>
                                    handleIncreaseBenefitAmount(item.listId)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="custom-package-plan-details-drawer-list-item-right-col">
                              <div style={{ display: 'flex', gap: 7 }}>
                                <img
                                  src="/assets/icons/trash3.svg"
                                  alt="Trash icon"
                                  width="13"
                                  height="13"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    removeBenefitfromCart(item.listId)
                                  }
                                />
                                <img
                                  src="/assets/icons/edit-icon.svg"
                                  alt="Edit icon"
                                  width="14"
                                  height="14"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleEditBenefitClick(item)}
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
                                  ${benefitData.benefit.price} c/u
                                </span>
                                <span
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 800,
                                  }}
                                >
                                  ${benefitData.benefit.price * item.amount}
                                </span>
                              </div>
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </>
                )}
                {discountsInCart.length !== 0 && (
                  <>
                    <li>
                      <span style={{ fontSize: 12 }}>
                        Discounts in Plan ({getTotalDiscountsInCart()})
                      </span>
                    </li>
                    {discountsInCart.map((item, index) => {
                      const discountData = discounts.find(
                        (benefit) => benefit.discount._id === item.discountId,
                      );
                      if (!discountData) return null;
                      return (
                        <>
                          <li
                            key={index}
                            className="custom-package-plan-details-drawer-list-item"
                          >
                            <></>

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  boxSizing: 'border-box',
                                  gap: 5,
                                }}
                              >
                                <img
                                  src="/assets/icons/verified.svg"
                                  alt="Verified icon"
                                  width="18"
                                  height="18"
                                  loading="lazy"
                                  decoding="async"
                                  referrerPolicy="no-referrer"
                                />
                                <span style={{ fontSize: 13, fontWeight: 600 }}>
                                  {discountData.discount.title}
                                </span>
                              </div>

                              <div className="custom-package-plan-details-drawer-list-item-quantity-control">
                                <button
                                  onClick={() =>
                                    handleDecreaseDiscountAmount(item.listId)
                                  }
                                  disabled={item.amount === 1}
                                >
                                  -
                                </button>
                                <span>{item.amount}</span>
                                <button
                                  onClick={() =>
                                    handleIncreaseDiscountAmount(item.listId)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="custom-package-plan-details-drawer-list-item-right-col">
                              <div style={{ display: 'flex', gap: 7 }}>
                                <img
                                  src="/assets/icons/trash3.svg"
                                  alt="Trash icon"
                                  width="13"
                                  height="13"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    removeDiscountfromCart(item.listId)
                                  }
                                />
                                <img
                                  src="/assets/icons/edit-icon.svg"
                                  alt="Edit icon"
                                  width="14"
                                  height="14"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleEditDiscountClick(item)}
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
                                  ${discountData.discount.price} c/u
                                </span>
                                <span
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 800,
                                  }}
                                >
                                  ${discountData.discount.price * item.amount}
                                </span>
                              </div>
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </>
                )}
              </ul>
              <div className="custom-package-plan-details-drawer-base-container custom-package-plan-details-drawer-footer">
                <div className="custom-package-plan-details-drawer-footer-row">
                  <span style={{ fontWeight: 300, fontSize: 13 }}>
                    Subtotal
                  </span>
                  <span style={{ fontWeight: 420, fontSize: 13 }}>
                    ${calculateTotal()}
                  </span>
                </div>
                <div className="custom-package-plan-details-drawer-footer-row">
                  <span style={{ fontWeight: 300, fontSize: 13 }}>
                    Store Tax
                  </span>
                  <span
                    style={{ fontWeight: 420, fontSize: 13, color: '#95de64' }}
                  >
                    + $0
                  </span>
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
                <div
                  onClick={() => {
                    setPlanDetailsDrawerOpen(false);
                  }}
                  className="close-icon"
                >
                  <img
                    className="navbar-responsive-logo"
                    src="/assets/icons/close-icon.svg"
                    alt="Menu icon"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
              <div className="custom-package-plan-details-drawer-empty-cart-container">
                <EmptyCartAnimation />
                <span style={{ fontSize: 13, fontWeight: 300, color: 'grey' }}>
                  No has seleccionado ningun item
                </span>
              </div>
            </>
          )}
        </>
      </DrawerComponent>
    </>
  );
};

export default DetailsDrawer;
