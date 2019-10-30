import React, { Component } from 'react';
import Unity, { UnityContent } from "react-unity-webgl";
import cookie from 'react-cookies';

class Play extends Component {

    constructor(props) {
        super(props);
    
        // Next up create a new Unity Content object to 
        // initialise and define your WebGL build. The 
        // paths are relative from your index file.

        this.unityContent = new UnityContent(
            "../Fighter/Build.json",
            "../Fighter/UnityLoader.js"
        );
    }

    componentDidMount() {
        console.log(this.props)

        this.unityContent.send(
            "Identification", 
            "identify", 
            cookie.load('access_token')
        );
    }

    render() {
        return (
            <div>
                <Unity unityContent={this.unityContent} />
            </div>
        )
    }
}
export default Play