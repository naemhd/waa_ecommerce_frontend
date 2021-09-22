import React from "react";
import { Link } from "react-router-dom";

const Header = ({ signOutHandler }) => {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-10 mb-2 mb-md-0">
                        <li>
                            <Link to="/products" className="nav-link px-2 text-secondary">Products</Link>
                        </li>
                        <li>
                            <Link to="/cart" className="nav-link px-2 text-white">Cart</Link>
                        </li>
                        <li>
                            <Link to="/orders" className="nav-link px-2 text-white">Orders</Link>
                        </li>
                    </ul>

                    <div className="text-end">
                        <button type="button" className="btn btn-outline-light me-2" onClick={signOutHandler}>Sign out</button>
                    </div>
                </div>
            </div>
        </header>
    );

};

export default Header;