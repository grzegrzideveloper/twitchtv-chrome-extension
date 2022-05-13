import React, {useState} from "react";
import reactDom from "react-dom";
import Disabled from "./components/Disabled";
import Content from "./components/Content";

const Popup = () => {
    const [currUrl, setCurrUrl] = useState('');
    
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        setCurrUrl(url);
        // use `url` here inside the callback because it's asynchronous!
    });
    
    

    return (
        <div className="container-fluid text-center">
            {/* <Content currUrl={'https://www.twitch.tv/rybsonlol_'}/> */}
            <div>{currUrl.includes('https://www.twitch.tv/') ? <Content currUrl={currUrl}/> : <Disabled/>}</div>
        </div>
    );
};

reactDom.render(<Popup/>, document.querySelector('#react-target'));