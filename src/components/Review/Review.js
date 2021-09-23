import React from "react"

const Review = ({ review, approveHTML }) => {
    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                {/* <h5 className="card-title">{review.product.name}</h5> */}
                <h6 className="card-subtitle mb-2 text-muted">{review.buyer.name}</h6>
                <p className="card-text">{review.descprtion}</p>
                {approveHTML}
            </div>
        </div>
    )
}

export default Review;