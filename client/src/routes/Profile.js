import React, { Component } from "react";
import "./Magic.css";

class Profile extends Component {
    render() { 
            return (
                <div class="flexContainer flexColumn fullHeight">
                    <div class="flexContainer flexItem">
                        <aside class="sidebar sidebarLeft card pt-1 pd-1 pl-1 pr-1">
                            <h2>Left Sidebar</h2>
                            <p>Put your content here</p>
                        </aside>
                        <main class="flexItem whiteBackground main card  pt-1 pd-1 pl-1 pr-1">
                            <div>
                                {JSON.stringify(this.props.repos)}
                            </div> 
                        </main>
                        <aside class="sidebar sidebarRight card pt-1 pd-1 pl-1 pr-1">
                            {JSON.stringify(this.props.profile)}
                        </aside>
                    </div>
                </div>
        );
    }
}

export default Profile;
