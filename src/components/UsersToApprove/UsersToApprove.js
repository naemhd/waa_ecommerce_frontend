import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "../User/User";

const UsersToApprove = ({setUsersOrReviewFlag, usersOrReviewFlag}) => {

    const [usersToApprove, setUsersToApprove] = useState([{ id: 1, name: "First User", billing_address: "Test" },
    { id: 2, name: "Second User", billing_address: "One Two" }]);


    // const config = {
    //     headers: { authorization: localStorage.getItem("userData") }
    // }

    // useEffect(() => {
    //     axios.get("/users-pending-approval", config).then((res) => {
    //         setUsersToApprove(res.data);
    //     })
    // }, [])

    const approveUser = (user) => {
        // axios.put("/approve-user", config).then(usr => {
        //     setUsersToApprove(usersToApprove.filter(usr => usr.id != user.id))
        // });
        setUsersToApprove(usersToApprove.filter(usr => user.id != usr.id))
    }

    const renderUser = (user) => {
        return (<User user={user} key={user.id} 
            approveHTML={<a href="#" class="btn btn-success" onClick={() => approveUser(user)}>Approve</a>}/>
            );
    }

    return ( <div>
        {usersToApprove.map(user => renderUser(user))}
        <button onClick={() => setUsersOrReviewFlag(!usersOrReviewFlag)}>Go to Reviews</button>
    </div>);
}


export default UsersToApprove;