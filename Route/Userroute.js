import { useradd, userlogin, updateuser, getdetails, googleLogin, resetpassword } from "../Controller/Usercontroller.js";
import { addProduct, getProducts, updateProduct, deleteProduct } from "../Controller/Productcontroller.js";
import { getCart, removeFromCart, addToCart, updateQuantity } from "../Controller/Cartcontroller.js";
import { placeOrder,clearCart,getUserOrders,getOrderById,cancelOrder     } from "../Controller/Ordercontoller.js";
import {addItemToWishlist,getWishlist,removeItemFromWishlist} from "../Controller/Wishlistcontroller.js"
import { forgotPassword,verifyOtp } from "../Controller/ResetPincontroller.js";
import { Router } from "express";
import authMiddleware from "../Connection/middleware.js";
import { addAddress, deleteAddress, getAddressesByUserId, updateAddress } from "../Controller/AddressController.js";
import { getAllUserOrders,getFilteredOrders,getOrderStatistics,updateOrderStatus,getOrderByIdAdmin } from "../Controller/Ordercontoller.js";

const route = Router()

//user
route.post('/register', useradd)
route.post('/login', userlogin)
route.post('/login/google', googleLogin)
route.put('/user/update', authMiddleware, updateuser)
route.get('/user/get', authMiddleware, getdetails)
route.put('/user/resetpassword',resetpassword)

//cart
route.get('/cart', authMiddleware, getCart); 
route.post('/cart/add', authMiddleware, addToCart);
route.put('/cart/item', authMiddleware, updateQuantity); 
route.delete('/cart/item', authMiddleware, removeFromCart); 

//product 
route.post('/products/add',authMiddleware, addProduct)
route.get('/products/get',authMiddleware, getProducts)
route.put('/products/:id', authMiddleware,updateProduct);
route.delete('/products/:id',authMiddleware, deleteProduct);


//wishlist 

route.get('/wishlist/get', authMiddleware, getWishlist);
route.post('/wishlist/add', authMiddleware, addItemToWishlist);
route.delete('/wishlist/remove', authMiddleware, removeItemFromWishlist);


//resetpin
route.post("/forgot-password", forgotPassword);
route.post("/verify-otp", verifyOtp);


//address

route.post('/addaddress',authMiddleware,addAddress)
route.get('/getaddress',authMiddleware,getAddressesByUserId)
route.put('/updateaddress/:id',authMiddleware,updateAddress)
route.delete('/deleteaddress/:id',authMiddleware,deleteAddress)


//order
route.post('/place', authMiddleware, placeOrder);

// Clear cart after order confirmation
route.delete('/clear-cart', authMiddleware, clearCart);

// Get all orders for logged-in user
route.get('/my-orders', authMiddleware, getUserOrders);

// Get specific order details
route.get('/:orderId', authMiddleware, getOrderById);

// Cancel an order
route.put('/:orderId/cancel', authMiddleware, cancelOrder);



//admin





route.get('/admin/all-orders', authMiddleware, getAllUserOrders);

// Get filtered orders (Admin)
route.get('/admin/orders/filter', authMiddleware, getFilteredOrders);

// Get order statistics (Admin)
route.get('/admin/orders/statistics', authMiddleware, getOrderStatistics);

// Get single order details (Admin)
route.get('/admin/orders/:orderId', authMiddleware, getOrderByIdAdmin);

// Update order status (Admin)
route.put('/admin/orders/:orderId/status', authMiddleware, updateOrderStatus);

export default route;

