import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import "./NewProduct.css"

const NewProduct = ({ addProduct }) => {
    const formRef = useRef();
    const history = useHistory();

    const formHandler = (e) => {
        e.preventDefault();
        const title = formRef.current["title"].value;
        const price = formRef.current["price"].value;
        const description = formRef.current["description"].value;
        addProduct({ title, price, description }, history)
    }

    return (
        <form className="new-product-container" ref={formRef} onSubmit={formHandler}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Title" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="price">Price</label>
                    <input type="text" className="form-control" id="price" name="price" placeholder="$" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea rows="4" type="text" className="form-control" id="description" name="description" placeholder="Description" />
            </div>

            <button type="submit" className="btn btn-primary">Add</button>
        </form>)
}

export default NewProduct;