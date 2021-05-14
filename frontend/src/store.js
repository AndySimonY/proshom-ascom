import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducers,
       productDetailsReducers,
       productDeleteReducers,
       productCreateReducers,
       productUpdateReducers,
       productReviewCreate,
       productTopRatedReducer,
} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userUpdateReducer,userDeleteReducer,userListReducer,userDetailsReducers, userLoginReducers, userRegisterReducers,userUpdateProfileReducers,} from './reducers/userReducers'
import { orderDeliverReducer, orderListReducer, orderListMyReducer,orderCreateReducer,orderDetailsReducer,orderPayReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    productDelete:productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate:productUpdateReducers,
    createProductReview:productReviewCreate,
    productTopRated:productTopRatedReducer,


    cart:cartReducer,

    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile:userUpdateProfileReducers,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,


    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')): null


const shippingAddressFromStorage = localStorage.getItem('shippingAddres') ?
    JSON.parse(localStorage.getItem('shippingAddres')): {}

    const savingPaymantMethod = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')): {}


const initialState = {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddres: shippingAddressFromStorage,
        paymentMethod: savingPaymantMethod
        
    },
    userLogin:{userInfo: userInfoFromStorage},

}

const middleware = [thunk]

const store = createStore(reducer,initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store