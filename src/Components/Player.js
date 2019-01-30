import React, { Component } from 'react';
import '../Stylesheets/Player.css';

class Player extends Component {
    render() {
        return (
            <button className="Player" onClick={() => this.props.onClick(this.props.position)}>
                <span className="Player-name">{this.props.name}</span>
            </button>
        );
    }
}

export default Player;
