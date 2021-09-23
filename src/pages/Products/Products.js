import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllProducts } from "../../shared/api-calls/productsAPI";
import "./Products.css"

const Products = ({ cartAddingHandler }) => {
    const [products, setProducts] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data);
        }).catch(e => console.log(e))
    }, []);

    return (
        <div className="products-container card-deck">
            {products ? products.map((p, index) => {
                return (
                    <div key={index} className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{p.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{p.price}</h6>
                            <p className="card-text">{p.description}</p>
                            <button onClick={() => cartAddingHandler(p, history)} className="btn btn-link">Add to cart</button>
                            <Link
                                to={`/product-details/${p.id}`}
                                className="btn btn-link">
                                Details
                            </Link>
                        </div>
                    </div>
                )
            }) : null}
        </div>)
}

export default Products;