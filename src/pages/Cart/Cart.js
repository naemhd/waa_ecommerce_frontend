import React, { useEffect, useState } from "react";
import { getCurrentUserCart, removeProductFromCart } from "../../shared/api-calls/cartAPI";
import "./Cart.css"

const Cart = ({ products, setProducts }) => {
    const deleteFromCart = (productId) => {
        const updatedProducts = products.filter(p => p.id !== productId);
        removeProductFromCart(productId);
        setProducts(updatedProducts);
    }

    const [userCart, setUserCart] = useState(null);
    useEffect(() => {
        getCurrentUserCart().then(res => {
            console.log(res)
            setUserCart(res)
        })
    }, []);
    
    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Shopping cart</h4>
                        <div className="d-flex flex-row align-items-center pull-right">
                            <span className="mr-1">Sort by:</span>
                            <span className="mr-1 font-weight-bold">Price</span>
                            <i className="fa fa-angle-down"></i>
                        </div>
                    </div>

                    {/* Cart Products goes here... */}
                    {products ? products.map((p, index) => {
                        return (<div
                            className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded"
                            key={p.id}
                        >
                            <div className="mr-1">
                                <img
                                    className="rounded"
                                    src="cartCar.jpeg"
                                    width="70"
                                    alt="cartCar"
                                />
                            </div>
                            <div
                                className="d-flex flex-column align-items-center product-details"
                            >
                                <span className="font-weight-bold">{p.title}</span>
                                <div className="d-flex flex-row product-desc">
                                    <div className="size mr-1">
                                        <span className="text-grey">Seller:</span
                                        ><span className="font-weight-bold">&nbsp;{p.seller.name}</span>
                                    </div>

                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center qty">
                                <i className="fa fa-minus text-danger"></i>
                                <h5 className="text-grey mt-1 mr-1 ml-1">1</h5>
                                <i className="fa fa-plus text-success"></i>
                            </div>
                            <div>
                                <h5 className="text-grey">${p.price}</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <button type="button" className="btn" onClick={() => deleteFromCart(p.id)}>
                                    <i className="fa fa-trash mb-1 text-danger"></i>
                                </button>

                            </div>
                        </div>)
                    }) : null}


                    <div
                        className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"
                    >
                        <input
                            type="text"
                            className="form-control border-0 gift-card"
                            placeholder="discount code/gift card"
                        />
                        <button className="btn btn-outline-warning btn-sm ml-2" type="button">
                            Apply
                        </button>
                    </div>
                    <div
                        className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"
                    >
                        <button
                            className="btn btn-warning btn-block btn-lg ml-2 pay-button"
                            type="button"
                        >
                            Create Order
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}

export default Cart;