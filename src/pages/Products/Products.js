import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../shared/api-calls/productsAPI";
import "./Products.css"

const Products = (props) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            title: "Pepsi",
            price: 2.5,
            description: "Some quick example text to build on the card title and make up the bulk of the card's content."
        }, {
            id: 2,
            title: "CocaCola",
            price: 9.5,
            description: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            id: 3,
            title: "Mountain Dew",
            price: 0.5,
            description: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            id: 4,
            title: "Mello Yello",
            price: 1,
            description: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            id: 5,
            title: "Diet Coke",
            price: 7.5,
            description: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            id: 6,
            title: "Pepsi Diet",
            price: 4.5,
            description: "Some quick example text to build on the card title and make up the bulk of the card's content."
        }
    ]);
    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data);
        }).catch(e => console.log(e))
    }, []);
    return (
        <div className="products-container card-deck">
            {products.map((p, index) => {
                return (
                    <div key={index} className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{p.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{p.price}</h6>
                            <p className="card-text">{p.description}</p>
                            <a href="/" className="card-link">Add to cart</a>
                            <Link
                                to={`/product-details/${p.id}`}
                                className="card-link">
                                Details
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>)
}

export default Products;