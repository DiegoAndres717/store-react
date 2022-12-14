import React, { useContext } from 'react';
import { PaypalButton } from 'react-paypal-button';
import { AppContext } from '../context/AppContext';
import '../styles/components/Payment.css'

const Payment = ({history}) => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer} = state;

  const paypalOptions = {
    clientId: 'AQ8e3k3n7OxcsqMJF1mvWfju75is10QmGcIY3Tryi5HIGTcd0YLBCzcNks982XA58EHFBVZd-XdOSy8S',
    intent: 'capture',
    currency: 'USD'
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  const handleSumTotal = () => {
    const reducer = ( acumulador, currentValue ) => acumulador + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }
  const handlePaymentSuccess = (data) => {
  if(data.status === 'COMPLETED'){
    const newOrder = {
      buyer,
      product: cart,
      payment: data
    }
    addNewOrder(newOrder);
    history.push('/checkout/success')
  }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido</h3>
        {cart.map(( item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PaypalButton 
          paypalOptions={paypalOptions}
          buttonStyles={buttonStyles}
          amount={handleSumTotal()}
          onPaymentStart={ () => console.log('Start Payment')}
          onPaymentSuccess={data => handlePaymentSuccess(data)}
          onPaymentError={error => console.log(error)}
          onPaymentCancel={data => console.log(data)}
          />
        </div>
      </div>
      <div />
    </div>
  );
};

export { Payment };
