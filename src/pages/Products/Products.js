import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts, getUserProducts } from "../../shared/api-calls/productsAPI";
import { SELLER_ROLE } from "../../shared/globals";
import "./Products.css"

const Products = ({ products, setProducts, cartAddingHandler, cartProducts, currentUser }) => {
    useEffect(() => {
        if (currentUser.role === SELLER_ROLE) {
            getUserProducts().then((data) => {
                setProducts(data);
            }).catch(e => console.log(e));
        } else {
            getAllProducts().then((data) => {
                setProducts(data);
            }).catch(e => console.log(e))
        }
    }, [currentUser.role, setProducts]);

    const onDelete = (productId) => {
        deleteProduct(productId).then(res => {
            const updatedProducts = products.filter(p => p.id !== productId);
            setProducts(updatedProducts);
        }).catch(e => console.log(e))
    }
    return (
        <div className="products-container card-deck">
            {products ? products.map((p, index) => {
                return (
                    <div key={index} className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{p.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{p.price}</h6>
                            <p className="card-text">{p.description}</p>
                            {currentUser.role === SELLER_ROLE ?
                                <button onClick={() => onDelete(p.id)} className="btn btn-danger">Delete</button>
                                :
                                <>
                                    {cartProducts.find(cp => cp.id === p.id) ?
                                        <label className="label label-success">Added</label>
                                        :
                                        <button onClick={() => cartAddingHandler(p)} className="btn btn-link">Add to cart</button>
                                    }
                                    <Link
                                        to={`/product-details/${p.id}`}
                                        className="btn btn-link">
                                        Details
                                    </Link>
                                </>
                            }


                        </div>
                    </div>
                )
            }) : null}
        </div>)
}

export default Products;