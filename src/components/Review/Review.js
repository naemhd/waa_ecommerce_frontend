import React from "react"

const Review = ({ review, approveHTML }) => {
    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{review.product.name}</h5>
                <p className="card-text">{review.descprtion}</p>
                {approveHTML}
            </div>
        </div>
    )
}

export default Review;