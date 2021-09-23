import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewsToApprove = ({setUsersOrReviewFlag, usersOrReviewFlag}) => {

    const [reviewsToApprove, setReviewsToApprove] = useState([{ id: 1, descprtion: "This dildo is shit dont work correctly ", rating: 5 },
    { id: 2, descprtion: "Nice Pen", rating: 3 }]);
    const config = {
        headers: { authorization: localStorage.getItem("userData") }
    }

    // useEffect(() => {
    //     axios.get("/reviews-pending-approval", config).then((res) => {
    //         setReviewsToApprove(res.data);
    //     })
    // }, [])

    const RenderReview = ({review}) => {
        return (
        <section>
            <h2>Description: {review.descprtion}</h2>
            <h2>Rating: {review.rating}</h2>
        </section>
        )
    }

    return ( <div>
        {reviewsToApprove.map(review => <RenderReview review={review} key={review.id}/>)}
        <button onClick={() => setUsersOrReviewFlag(!usersOrReviewFlag)}> Go to Users</button>
    </div>)
}

export default ReviewsToApprove;