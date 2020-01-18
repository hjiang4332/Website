import React from 'react';

function Joke(props){
    return(
        <div>
            {props.question} {props.punchline}
        </div>
    )
}

export default Joke;