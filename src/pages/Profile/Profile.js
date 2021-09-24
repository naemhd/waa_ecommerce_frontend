import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { followUser, getSeller, unFollowUser } from "../../shared/api-calls/userAPI";
import { BUYER_ROLE } from "../../shared/globals";

const Profile = ({ currenUser, userFollowing, setUserFollowing }) => {
    const params = useParams();
    const [userFollowers, setUserFollowers] = useState([]);
    const [sellerProfile, setSellerProfile] = useState(null);

    useEffect(()=> {
        getSeller(params.id).then(data => {
            setSellerProfile(data);
        }) 
    }, []);

    const alreadyFollowing = () => {
        return userFollowing.includes(sellerProfile.id);
    }

    const handleFollowing = () => {
        if(alreadyFollowing) {
            followUser(params.id).then(() => {
                setUserFollowing(userFollowing.filter(user => user.id !== sellerProfile.id));
                setUserFollowers(userFollowers.filter(user => user.id !== sellerProfile.id));
            });

        } else {
            unFollowUser(params.id).then(() => {
                setUserFollowers(sellerProfile.id);
                setUserFollowing(sellerProfile.id);
            });
        }
    }

    return (<>
        { currenUser.role === BUYER_ROLE && sellerProfile && <div className="card">
            <h5>{sellerProfile.name}</h5>
            <p className="card-subtitle">{sellerProfile.billing_address}</p>
            <p lassName="card-subtitle">{sellerProfile.shipping_address}</p>
            <h3>Followers: {sellerProfile.followers.length}</h3>
            <button className="btn btn-warning" onClick={handleFollowing}>{alreadyFollowing() ? "Unfollow" : "Follow"}</button>        
            </div>}
    </>)
}

export default Profile;