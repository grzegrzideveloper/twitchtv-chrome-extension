import React from "react";

const FfzEmotes = ({emotes}) => {
    const renderedFfzEmotes = emotes.map((emote) =>{
        return <img onClick={() => {navigator.clipboard.writeText(emote.code)}} key={emote.id} src={`https://cdn.frankerfacez.com/emote/${emote.id}/2`} />;
            
    });
    return (
        <div>{renderedFfzEmotes}</div>
    );
};

export default FfzEmotes;