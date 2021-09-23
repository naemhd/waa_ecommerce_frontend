import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getOneProduct } from "../../shared/api-calls/productsAPI";

import "./ProductDetails.css"

const ProductDetails = ({ cartAddingHandler, cartProducts }) => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const history = useHistory();
    useEffect(() => {
        getOneProduct(params.id).then((data) => {
            setProduct(data);
        }).catch(e => console.log(e))
    }, [params.id]);

    return (
        <>
            {product ? <div className="product-details-container">
                <div className="card">
                    <div className="card__title">
                        <div className="icon">
                            <a href="1" onClick={() => history.push("/products")}>
                                <i className="fa fa-arrow-left"></i>
                            </a>
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
                                <span>
                                    ({product.reviews.length === 0 ? 0 : product.reviews.length} reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card__footer">
                        <div className="recommend">
                            <p>Seller</p>
                            <h3>{product.seller.name}</h3>
                        </div>
                        <div className="action">
                            {cartProducts.find(cp => cp.id === product.id) ?
                                <label className="label label-success">Added</label>
                                :
                                <button type="button" onClick={() => cartAddingHandler(product)}>Add to cart</button>
                            }

                        </div>
                    </div>
                </div>
            </div> : null}
        </>)
}

export default ProductDetails;