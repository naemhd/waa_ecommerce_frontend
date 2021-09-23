import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../shared/api-calls/productsAPI";

import "./ProductDetails.css"

const ProductDetails = (props) => {
    const params = useParams();
    const [product, setProduct] = useState({
        id: 1,
        title: "Pepsi",
        price: 2.5,
        description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        reviews: 5,
        seller: "Emad"
    });
    // useEffect(() => {
    //     getOneProduct(params.id).then((res) => {
    //         setProduct(res.data);
    //     }).catch(e => console.log(e))
    // }, []);
    return (
        <div className="product-details-container">
            <div className="card">
                <div className="card__title">
                    <div className="icon">
                        <a href="#"><i className="fa fa-arrow-left"></i></a>
                    </div>
                    <h3>Details</h3>
                </div>
                <div className="card__body">
                    <div className="half">
                        <div className="featured_text">
                            <h1>{product.title}</h1>
                            <p className="sub">Type</p>
                            <p className="price">${product.price}</p>
                        </div>
                    </div>
                    <div className="half">
                        <div className="description">
                            <p>{product.description}</p>
                        </div>
                        <span className="stock"><i className="fa fa-pen"></i> In stock</span>
                        <div className="reviews">
                            <ul className="stars">
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star-o"></i></li>
                            </ul>
                            <span>({product.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
                <div className="card__footer">
                    <div className="recommend">
                        <p>Seller</p>
                        <h3>{product.seller}</h3>
                    </div>
                    <div className="action">
                        <button type="button">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default ProductDetails;