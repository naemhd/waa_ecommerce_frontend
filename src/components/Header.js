import React from "react";
import { useHistory } from "react-router";
import { removeUserData } from "../shared/localStorage";

const Header = ({ signOutHandler }) => {
    return( 
        <header class="p-3 bg-dark text-white">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul class="nav col-10 mb-2 mb-md-0">
                        <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">About</a></li>
                    </ul>

                    <div class="text-end">
                        <button type="button" class="btn btn-outline-light me-2" onClick={signOutHandler}>Login</button>
                    </div>
                </div>
            </div>
        </header>
        );

};

export default Header;