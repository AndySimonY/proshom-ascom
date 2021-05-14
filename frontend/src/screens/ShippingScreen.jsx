import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps";


const ShippingScreen = ({ history }) => {

  const cart = useSelector(state => state.cart)
  const {shippingAddres} = cart

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddres.address);
  const [city, setCity] = useState(shippingAddres.city);
  const [postalCode, setPostalCode] = useState(shippingAddres.postalCode);
  const [country, setCountry] = useState(shippingAddres.country);

const submitHandler =(e) =>{
    e.preventDefault();
    dispatch(saveShippingAddress({address, city ,postalCode, country}))
    history.push('/payment')
}

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter city"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Postal code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Continue
        </Button>

      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;