import axios from "axios";
import React, { useEffect, useState } from "react";
import Review from "../Review/Review";

const Reviews = ({setUsersOrReviewFlag, usersOrReviewFlag, reviews, setReviews}) => {

    // const [reviewsToApprove, setReviewsToApprove] = useState([{ id: 1, descprtion: "This dildo is shit dont work correctly ", product: { name: "Text"} },
    // { id: 2, descprtion: "Nice Pen", product: { name: "One Twp"}}]);


    // const config = {
    //     headers: { authorization: localStorage.getItem("userData") }
    // }

    // useEffect(() => {
    //     axios.get("/reviews-pending-approval", config).then((res) => {
    //         setReviewsToApprove(res.data);
    //     })
    // }, [])

    const approveReview = (review) => {
        // axios.put("/approve-review", config).then(res => {
        //     setReviewsToApprove(reviewsToApprove.filter(rev => rev.id != review.id))
        // });
        setReviews(reviews.filter(rev => rev.id != review.id))
    }

    const renderReview = (review) => {
        return (<Review review={review} key={review.id} 
            approveHTML={<a href="#" class="btn btn-success" onClick={() => approveReview(review)}>Approve</a>}/>
            );
    }

    return ( <div>
        {reviews.map(review => renderReview(review))}
        <button onClick={() => setUsersOrReviewFlag(!usersOrReviewFlag)}> Go to Users</button>
    </div>)
}

export default Reviews;