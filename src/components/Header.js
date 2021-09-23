import React from "react";
import { Link } from "react-router-dom";
import { ADMIN_ROLE, BUYER_ROLE } from "../shared/globals";
import "./Header.css"

const Header = ({ signOutHandler, currentUser, noOfCartProducts }) => {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    {currentUser.role !== ADMIN_ROLE ? <ul className="nav col-10 mb-2 mb-md-0">
                        <li>
                            <Link to="/products" className="nav-link px-2 text-white lead">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders" className="nav-link px-2 text-white lead">
                                Orders
                            </Link>
                        </li>
                        <li>
                            {currentUser.role === BUYER_ROLE ? <Link to="/cart" className="px-2 lead">
                                <i className="fa" style={{ fontSize: "40px" }}>&#xf07a;</i>
                                <span className='badge badge-warning' id='lblCartCount'>
                                    {noOfCartProducts}
                                </span>
                            </Link> : <Link to="/new-product" className="nav-link px-2 text-white lead">
                                Add Product
                            </Link>}
                        </li>
                    </ul> : null}


                    <div className="text-end row">
                        <div className="mr-5">
                            <h3 className="lead m-0">{currentUser.name}</h3>
                            <h6 className="lead text-muted m-0">{currentUser.role}</h6>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-light me-2"
                            onClick={signOutHandler}>
                            <h3 className="lead m-0">Sign out</h3>
                        </button>


                    </div>
                </div>
            </div>
        </header>
    );

};

export default Header;