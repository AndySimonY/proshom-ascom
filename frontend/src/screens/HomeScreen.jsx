import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product';
import {listProducts} from '../actions/productActions'
import Preloader from '../components/Preloader';
import Paginate from '../components/Paginate';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';



const HomeScreen = ({history}) => {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products , page, pages} = productList

    let keyword = history.location.search
    useEffect(() => {
            dispatch(listProducts(keyword))
       
    },[dispatch, keyword])


    return (
        <div>
            {!keyword && <ProductCarousel/>}
          
            <h1>Latest Products</h1>
            {loading ? <Preloader/>
            : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                <Row>
                    {products.map((product =>(
                        <Col key={product._id} sm={12} md={6} ld={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                            )))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword}/>
                    </div>
                        }  
        </div>
    )
}

export default HomeScreen
