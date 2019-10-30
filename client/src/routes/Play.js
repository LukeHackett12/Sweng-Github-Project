import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { unityShouldBeMounted: true };

    this.unityContent = new UnityContent(
      "Build/game.json",
      "Build/UnityLoader.js"
    );
  }

  render() {
    return (
      <div>
        {this.state.unityShouldBeMounted === true && (
          <Unity unityContent={this.unityContent} />
        )}
      </div>
    );
  }
}

export default App;
