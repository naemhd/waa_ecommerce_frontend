import React from "react";
import Review from "../Review/Review";
import { approveReview } from "../../shared/api-calls/adminAPI";

const Reviews = ({ setUsersOrReviewFlag, usersOrReviewFlag, reviews, setReviews }) => {
    const approveReviewHandler = (review) => {
        approveReview(review.id)
        setReviews(reviews.filter(rev => rev.id !== review.id))
    }

    const renderReview = (review) => {
        return (<Review review={review} key={review.id}
            approveHTML={<button className="btn btn-success" onClick={() => approveReviewHandler(review)}>Approve</button>} />
        );
    }

    return (<div className={"card-deck"}>
        {reviews.map(review => renderReview(review))}
        <button className={"btn btn-dark btn-small"} onClick={() => setUsersOrReviewFlag(!usersOrReviewFlag)}> Go to Users</button>
    </div>)
}

export default Reviews;