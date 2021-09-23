import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Users from '../../components/Users/Users';
import Reviews from '../../components/Reviews/Reviews';
import { ADMIN_ROLE } from '../../shared/globals';

const Admin = ({ currentUser, users, setUsers, reviews, setReviews }) => {
    const [usersOrReviewFlag, setUsersOrReviewFlag] = useState(true);
    const historyObject = useHistory();

    return (
        <div>
            {/* { currentUser.roleName == ADMIN_ROLE ? null : historyObject.push("/products") } */}
            <div className="container">
                {usersOrReviewFlag ?
                 <Users setUsersOrReviewFlag={setUsersOrReviewFlag} usersOrReviewFlag={usersOrReviewFlag} users={users} setUsers={setUsers}/>
                  : <Reviews setUsersOrReviewFlag={setUsersOrReviewFlag} usersOrReviewFlag={usersOrReviewFlag} reviews={reviews} setReviews={setReviews}/> }
            </div>
        </div>
    );
}

export default Admin;