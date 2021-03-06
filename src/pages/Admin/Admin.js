import React, { useState, useEffect } from 'react';
import Users from '../../components/Users/Users';
import Reviews from '../../components/Reviews/Reviews';
import { getNotApprovedReviews, getNotApprovedUsers } from '../../shared/api-calls/adminAPI';
import "./Admin.css";

const Admin = ({ currentUser }) => {
    const [usersOrReviewFlag, setUsersOrReviewFlag] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getNotApprovedUsers().then((data) => {
            setUsers(data);
        }).catch(e => console.log(e))
    }, []);

    useEffect(() => {
        getNotApprovedReviews().then((data) => {
            setReviews(data);
        }).catch(e => console.log(e))
    }, []);

    return (
        <div>
            <div className="container admin-container">
                {usersOrReviewFlag ?
                    <Users setUsersOrReviewFlag={setUsersOrReviewFlag} usersOrReviewFlag={usersOrReviewFlag} users={users} setUsers={setUsers} />
                    : <Reviews setUsersOrReviewFlag={setUsersOrReviewFlag} usersOrReviewFlag={usersOrReviewFlag} reviews={reviews} setReviews={setReviews} />}
            </div>
        </div>
    );
}

export default Admin;