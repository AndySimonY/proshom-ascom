import React ,{ useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Col, Card, Image, ListGroup, Row,Form, Button} from 'react-bootstrap';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const CartScreen = ({match, location, history}) => {

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (productId) =>{
        dispatch(removeFromCart(productId))

    }

    const checkoutHandler = () =>{
        history.push(`/login?redirect=shipping`)
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ):(
                    <ListGroup variant ='flush'> 
                        {cartItems.map(item =>(
                            <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>

                                        <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            ${item.price}
                                        </Col>

                                        <Col md={3}>
                                        <Form.Control as='select'
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>

                                         {
                                             [...Array(item.countInStock).keys()]  //Cоздаём массив из product.countInStock элементов т.к товара на складе только product.countInStock, проходимся по игдексам и отображаем 
                                             .map((x) => (                           // индекс +1 в панели опций нашего выпадающего списка 
                                                 <option key={x+1} value={x+1}>
                                                     {x+1}
                                                 </option>
                                             ))
                                         }
                                          
                                        </Form.Control>
                                        </Col>

                                        <Col md={1}>
                                         <Button type ='button' variant='light'
                                         onClick={() => removeFromCartHandler(item.product)}
                                         >
                                         <i className='fas fa-trash'></i>
                                         </Button>
                                        </Col>
                                    </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Subtotal ({
                                cartItems.reduce((acc, item) => acc + item.qty, 0)
                                //reduсe принимает наш массив и складывает qty каждого продукта тем самым получая ощее количество в корзине
                                }) items</h2> 
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item> 
                    </ListGroup>
                  
                    <ListGroup.Item>
                    <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    >
                        Proceed To Chekout
                    </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
