import React from "react";
import Admin from "../Admin/Admin";
import Products from "../Products/Products";

const Home = ({ isAdmin, currentUser, cartAddingHandler, products, setProducts, cartProducts }) => {
    return (<>
        {isAdmin ?
            <Admin currentUser={currentUser} />
            :
            <Products
                cartAddingHandler={cartAddingHandler}
                currentUser={currentUser}
                cartProducts={cartProducts}
                products={products}
                setProducts={setProducts} />
        }
    </>)
}

export default Home;