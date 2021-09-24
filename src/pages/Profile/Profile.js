import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { followUser, getSeller, unFollowUser } from "../../shared/api-calls/userAPI";
import { BUYER_ROLE } from "../../shared/globals";
import "./Profile.css"

const Profile = ({ currenUser, currentUserFollowing, setcurrentUserFollowing }) => {
    const params = useParams();
    const currentId = parseInt(params.id);

    const [sellerProfile, setSellerProfile] = useState(null);

    useEffect(() => {
        getSeller(currentId).then(data => {
            setSellerProfile(data);
        }).catch(e => console.log(e))
    }, [currentId]);

    const follow = () => {
        followUser(currentId).then(() => {
            setcurrentUserFollowing([...currentUserFollowing, currentId]);
        }).catch(e => console.log(e));
    }
    const unFollow = () => {
        unFollowUser(currentId).then(() => {
            const updatedFollowing = currentUserFollowing.filter(id => id !== currentId)
            setcurrentUserFollowing(updatedFollowing);
        }).catch(e => console.log(e));
    }
    return (<>
        {currenUser.role === BUYER_ROLE && sellerProfile &&
            <div className="card profile">
                <h5>{sellerProfile.name}</h5>
                <p className="card-subtitle">Email: {sellerProfile.email}</p>
                {" "}
                <p className="card-subtitle">Address: {sellerProfile.shipping_address}</p>
                {currentUserFollowing.includes(sellerProfile.id) ?
                    <button className="btn btn-warning" onClick={unFollow}>
                        Unfollow
                    </button>
                    :
                    <button className="btn btn-warning" onClick={follow}>
                        Follow
                    </button>
                }
            </div>
        }
    </>)
}

export default Profile;