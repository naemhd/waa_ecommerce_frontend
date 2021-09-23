import React from "react";
import Admin from "../Admin/Admin";
import Products from "../Products/Products";

const Home = ({ isAdmin, currentUser, cartAddingHandler, products, setProducts }) => {
    return (<>
        {isAdmin ?
            <Admin currentUser={currentUser} />
            :
            <Products
                cartAddingHandler={cartAddingHandler}
                currentUser={currentUser}
                products={products}
                setProducts={setProducts} />
        }
    </>)
}

export default Home;