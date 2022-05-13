import React from "react";

const BttvEmotes = ({emotes}) => {
    const renderedBttvEmotes = emotes.map((emote) =>{
        return <img className="img-rounded" onClick={() => {navigator.clipboard.writeText(emote.code)}} key={emote.id} src={`https://cdn.betterttv.net/emote/${emote.id}/2x`} />         
    });

    return (
        <div>{renderedBttvEmotes}</div>
    );
};

export default BttvEmotes;