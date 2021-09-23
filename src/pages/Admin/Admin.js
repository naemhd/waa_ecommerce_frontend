import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import UsersToApprove from '../../components/UsersToApprove/UsersToApprove';
import ReviewsToApprove from '../../components/UsersToReview/UsersToReview';
// import { ADMIN_ROLE } from '../../shared/globals';

const Admin = ({ currentUser }) => {
    const [usersOrReviewFlag, setUsersOrReviewFlag] = useState(true);
    // const historyObject = useHistory();

    return (
        <div>
            {/* { currentUser.roleName == ADMIN_ROLE ? null : historyObject.push("/products") } */}
            <div className="container">
                {usersOrReviewFlag ?
                    <UsersToApprove setUsersOrReviewFlag={setUsersOrReviewFlag} usersOrReviewFlag={usersOrReviewFlag} />
                    : <ReviewsToApprove setUsersOrReviewFlag={setUsersOrReviewFlag} usersOrReviewFlag={usersOrReviewFlag} />}
            </div>
        </div>
    );
}

export default Admin;