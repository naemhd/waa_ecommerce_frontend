import React from "react"

const User = ({ user, approveHTML }) => {
    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.billing_address}</p>
                <p className="card-text">{user.shipping_address}</p>
                {approveHTML}
            </div>
        </div>
    )
}

export default User;