import React, { useState } from 'react';
import ModalComponent from '../ModalComponent.tsx';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import '../../../public/styles/AddItemCustomPackageModal.css';

interface ComponentProps {
  selectedProduct: {
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
  } | null;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<{
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
    } | null>
  >;
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
}

const ProductsSection: React.FC<ComponentProps> = ({
  selectedProduct,
  setSelectedProduct,
  products,
  setProductsInCart,
}) => {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [amountModal, setAmountModal] = useState(1);
  const [productModalError, setProductModalError] = useState<string | null>();

  const { handleSubmit, reset, register } = useForm();

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

  return (
    <>
      <section
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 16 }}>Productos</h2>
        <div className="custom-package-items-grid custom-package-products-grid">
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
      </section>
      <ModalComponent
        open={openProductModal}
        onClose={() => {
          setSelectedProduct(null);
          setOpenProductModal(false);
          reset();
          setAmountModal(1);
        }}
        //containerStyles={{ width: '780px', height: '500px' }}
        customClassName="add-item-custom-package-modal-container"
        customMaskClassName="add-item-custom-package-modal-mask"
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
            {/*CLOSE BUTTON*/}
            <div
              onClick={() => {
                setSelectedProduct(null);
                setOpenProductModal(false);
                reset();
                setAmountModal(1);
              }}
              className="close-icon"
              style={{ position: 'absolute', top: 12, right: 20 }}
            >
              <img
                className="navbar-responsive-logo"
                src="/assets/icons/close-icon.svg"
                alt="Menu icon"
                width="20"
                height="20"
              />
            </div>
            {/*CONTENT*/}
            <div className="custom-package-add-item-modal-base-container custom-package-add-item-modal-content">
              {selectedProduct?.image ? (
                <img
                  className="custom-package-add-item-modal-img add-item-custom-package-modal-desktop-component"
                  src={selectedProduct.image.url}
                />
              ) : (
                <div
                  className="custom-package-add-item-modal-img add-item-custom-package-modal-desktop-component"
                  style={{ backgroundColor: 'grey' }}
                ></div>
              )}
              {/*desktop render*/}
              <div className="add-item-custom-package-modal-item-info add-item-custom-package-modal-desktop-component">
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
              {/*responsive content*/}
              <div className="add-item-custom-package-modal-responsive-item-info">
                {/*img*/}
                {selectedProduct?.image ? (
                  <img
                    className="add-item-custom-package-modal-responsive-item-info-img"
                    src={selectedProduct.image.url}
                  />
                ) : (
                  <div
                    className="add-item-custom-package-modal-responsive-item-info-img"
                    style={{ backgroundColor: 'grey' }}
                  ></div>
                )}
                <div className="add-item-custom-package-modal-item-info">
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
                    Smooth, rich cold brew coffee made from premium organic
                    beans. Perfect for your morning routine or afternoon
                    pick-me-up. Low acidity and naturally sweet.
                  </p>
                  <span style={{ fontWeight: 800, fontSize: 23 }}>
                    ${selectedProduct?.price}{' '}
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
                </div>
              </div>
              {/*standar*/}
              <div className="add-item-custom-package-modal-responsive-props">
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
                    style={{
                      marginBottom: 10,
                      fontSize: 12,
                      color: '#f5222d',
                    }}
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
              {/*Quantity*/}
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
            {/*BUTTON*/}
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
    </>
  );
};

export default ProductsSection;
