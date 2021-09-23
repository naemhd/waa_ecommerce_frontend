// import axios from "axios";
import React, { useState } from "react";

const UsersToApprove = ({ setUsersOrReviewFlag, usersOrReviewFlag }) => {

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

    const RenderUser = ({ user }) => {
        return (
            <section>
                <h2>{user.name}</h2>
                <h2>{user.billing_address}</h2>
            </section>
        )
    }

    return (<div>
        {usersToApprove.map(user => <RenderUser user={user} key={user.id} />)}
        <button onClick={() => setUsersOrReviewFlag(!usersOrReviewFlag)}> Go to Review</button>
    </div>)
}

export default UsersToApprove;