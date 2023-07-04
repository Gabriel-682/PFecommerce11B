import React, { useEffect, useState } from "react";
import classnames from 'classnames'
import { Context } from "./ContextProvider";
import { deleteItemActions } from "../../redux/foodActions";
import { useDispatch, useSelector } from "react-redux";;

const Checkout = ({ onClick }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const { preferenceId, isLoading: disabled, orderData, setOrderData } = React.useContext(Context);
  const shoppingCartClass = classnames('shopping-cart dark', {
    'shopping-cart--hidden': !isVisible,
  })
  const dispatch=useDispatch();
  
  const updatePrice = (event) => {
    const quantity = event.target.value;
    const name=event.target.name;
    if(quantity===0){
      const id=orderData.filter(it=>it.name===name)[0].id;
      dispatch(deleteItemActions(id));
    }else{
      const variation=quantity-orderData.quantity;
      const item=orderData.filter(it=>it.name===name)[0]
      const amount= parseInt(item.final_price) * parseInt(quantity);
      
      const actual=[]
      orderData.map(it=>{if(it.name===name){
          actual.push({'id':it.id,'name':it.name,'image':it.image,'final_price':it.final_price,quantity:parseInt(quantity),amount:amount})
        }else{actual.push(it)}
      })
      setOrderData(actual)
      console.log(orderData)
      total=total+variation*orderData.final_price;
  }}

  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId])

let total=0
orderData.forEach(item=>{
  total=total+item.amount;
})

const handleDelete=(event)=>{
  const name=event.target.name
  const id=orderData.filter(it=>it.name===name)[0].id
  console.log(id)
  dispatch(deleteItemActions(id))
  const refresh=useSelector(state=>state.foodsReducer.allItems)
  setOrderData(refresh)
  Checkout({ onClick })
}


  
  return (
    <section className={shoppingCartClass}>
      <div className="container" id="container">
        <div className="block-heading">
          <h2>Shopping Cart</h2>
          {/* <p>This is an example of Checkout Pro integration of Mercado Pago</p> */}
        </div>
        <div className="content">
        <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                <div className="product">
                  <div className="info">
                    <div className="product-details">
                      <div className="row justify-content-md-center">
                        <div className="col-md-3">
                          {/* espacio para la imagen*/}
                        </div>
                        <div className="col-md-4 product-detail">
                          <h5>Product</h5>
                          {/* columna de producto*/}
                        </div>
                        <div className="col-md-3 product-detail">
                          <label htmlFor="quantity">
                            <b>Quantity</b>
                          </label>
                          {/*espacio para la cantidad*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <h3>Cart</h3>
                <div className="summary-item">
                  <span className="text">Subtotal</span>
                  {/*espacio para el subtotal*/}
                </div>
                {/*espacio del button*/}
              </div>
            </div>
          </div>

          {orderData.map(item=>{
            return(
              
              <div className="row">
      <div className="col-md-12 col-lg-8">
        <div className="items">
          <div className="product">
            <div className="info">
              <div className="product-details">
                <div className="row justify-content-md-center">
                  <div className="col-md-3">
                    <img
                      className="img-fluid mx-auto d-block image"
                      alt="Image of a product"
                      src={item.image}
                    />
                  </div>
                  <div className="col-md-4 product-detail">
                    <div className="product-info">
                      <b>{item.name}</b><br></br>
                      <b>Price:</b> $ <span id="unit-price">{item.final_price}</span>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-3 product-detail">
                    <input
                      onChange={updatePrice}
                      type="number"
                      id="quantity"
                      name={item.name}
                      value={item.quantity}
                      min="0"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-4">
        <div className="summary">
          <div className="summary-item">
            <span className="price" id="cart-total">${item.amount}</span>
            <button  name={item.name} className="btn btn-primary btn-lg btn-block" onClick={handleDelete} >Eliminar</button>
          </div>
        </div>
      </div>
    </div>

            )
          })}

          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                <div className="product">
                  <div className="info">
                    <div className="product-details">
                      <div className="row justify-content-md-center">
                        <div className="col-md-3">
                          {/* espacio para la imagen*/}
                        </div>
                        <div className="col-md-4 product-detail">
                          {/* columna de producto*/}
                        </div>
                        <div className="col-md-3 product-detail">
                          {/*espacio para la cantidad*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <div className="summary-item">
                  <span className="text">Total</span>
                  <span className="price" id="cart-total">${total}</span>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={onClick}
                  id="checkout-btn"
                  disabled={disabled}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
};

export default Checkout;