import React, { useEffect, useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import {ORDER_NOT_PAYMENT_METHOD, DELETE_MESSAGE} from '../constants/orderConstants'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddres } = cart;

  const dispatch = useDispatch();

  const [paymentMethod, SetPaymentMethod] = useState('');

  if (!shippingAddres.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder");
  };



const  selectPaymentMethodHandler = () => {
  if(paymentMethod !== 'PayPal'){
  dispatch({type: ORDER_NOT_PAYMENT_METHOD})
  }
}
const failPayment = useSelector(state => state.orderCreate) //Слишко заковыристые пути по удалению одгого едеинственного предупреждения
const {errror, stylee} = failPayment
const deleteMessage =() =>{
   dispatch({type: DELETE_MESSAGE})
}




  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value={'on' ? 'PayPal' : null}
              onClick={deleteMessage}
              onChange={(e) => SetPaymentMethod(e.target.value)}
            ></Form.Check>
            {errror  && <Message variant={stylee}>{errror}</Message>}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" onClick={selectPaymentMethodHandler} >
          Continue
        </Button>
        
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
