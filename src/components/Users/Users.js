import React from "react";
import { approveUser } from "../../shared/api-calls/adminAPI";
import User from "../User/User";

const Users = ({setUsersOrReviewFlag, usersOrReviewFlag, users, setUsers}) => {

    const approveUserHandler = (user) => {
        approveUser(user.id);
        setUsers(users.filter(usr => user.id != usr.id))
    }

    const renderUser = (user) => {
        return (<User user={user} key={user.id} 
            approveHTML={<a href="#" className="btn btn-success" onClick={() => approveUserHandler(user)}>Approve</a>}/>
            );
    }

    return ( <div className={"card-deck"}>
        {users.map(user => renderUser(user))}
        <button className={"btn btn-dark btn-small"} onClick={() => setUsersOrReviewFlag(!usersOrReviewFlag)}>Go to Reviews</button>
    </div>);
}

export default Users;