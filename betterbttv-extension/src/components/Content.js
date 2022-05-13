import React, {useState, useEffect} from "react";
import NavBar from "./Navbar";
import CurrUser from "./CurrUser";
import BttvEmotes from "./BttvEmotes";
import FfzEmotes from "./FfzEmotes";
import axios from "axios";

const Content = ({currUrl}) => {
    const [currTab, setCurrTab] = useState('curr-user');
    const [userData, setUserData] = useState({});
    const [isBusy, setIsBusy] = useState(true);
    const [bttvEmotes, setBttvEmotes] = useState([]);
    const [ffzEmotes, setFfzEmotes] = useState([]);
    const [keys, setKeys] = useState('');

    const userName = currUrl.replace('https://www.twitch.tv/', '');
    

    const onNavBarClick = (e) => {
        
        const buttons = document.querySelectorAll('.nav-link');
        buttons.forEach((button)=> {
            if (button.className === 'nav-link active text-dark'){
                button.className = 'nav-link text-light';
            }
        });
        e.target.className = 'nav-link active text-dark'
        setCurrTab(e.target.id);
    };

    const onEmoteClick = (e) =>{

    }
    
    
    useEffect(()=>{
        fetch('https://nldgs4xzbh.execute-api.us-east-1.amazonaws.com/default/apiSecureKeys', {
            method: 'post',
        })
        .then(response => response.text())
        .then(data => {

                const keys = JSON.parse(data).message;
                const [TOKEN, CLIENT_ID] = keys.split('$');
                const twitch = axios.create({
                    baseURL: 'https://api.twitch.tv',
                    headers: {
                        "Client-ID": CLIENT_ID,
                        Authorization: `Bearer ${TOKEN}`
                    }
                    
                });
                twitch.get('/helix/users', {
                    params:{
                        login: userName
                    }
                }).then((response)=>{
                    setIsBusy(false);
                    setUserData(response.data.data[0]);
                    axios.get(`https://api.betterttv.net/3/cached/users/twitch/${response.data.data[0].id}`).then((bttv)=>{
                        setBttvEmotes(bttv.data.sharedEmotes);
                    });
                    axios.get(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${response.data.data[0].id}`).then((ffz)=>{
                        setFfzEmotes(ffz.data);
                    });
                }).catch((err)=>{
                    setIsBusy(false);
                    setUserData({error:err});
                });
        });
        
    }, []);

    
    const renderContent= (userData)=>{
        if (currTab === 'curr-user'){
            return <CurrUser userData={userData}/>;
        }else if (currTab == 'bttv'){
            return <BttvEmotes onEmoteClick={onEmoteClick} emotes={bttvEmotes}/>;
        }else if (currTab == 'ffz'){
            return <FfzEmotes onEmoteClick={onEmoteClick} emotes={ffzEmotes} />;
        }

    };

    

    return (
        <div className="">
            <NavBar onNavBarClick={onNavBarClick}/>
            {isBusy ? <div>Waiting for data...</div> : renderContent(userData)}
        </div>
    );

};

export default Content;