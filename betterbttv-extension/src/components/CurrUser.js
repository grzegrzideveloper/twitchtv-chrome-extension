import React, {useState, useEffect} from "react";
import axios from "axios";

const CurrUser = ({userData}) => {
    
    
    const renderUserProfile = ()=>{
        if(userData === undefined || userData.error){
            return <h3 className="text-light text-center">There was an error loading user data. Try refreshing the extension or go to someone's profile if you're not.</h3>
        }
        return (
            <div className="row">
                <div className="col-6">
                    <div className="card m-2" style={{ width: '13rem' }}>
                        <img src={userData.profile_image_url} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{userData.display_name}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h3 className="text-light mt-5">Partner:</h3>
                    <img src={userData.broadcaster_type === 'partner' ? 'verified.png' : 'notverified.png'} style={{ width: '7rem' }}/>
                </div>
                <h3 className="text-light mt-3">Description:</h3>
                <h5 className="text-light">{userData.description}</h5>
            </div>
           
        );
    };
    
    return (<div>{renderUserProfile()}</div>);
};

export default CurrUser;