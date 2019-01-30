import React, { Component, Fragment } from 'react';
import '../Stylesheets/Field.css';
import Player from './Player'

class Field extends Component {

    render() {
        return (
            <div className="Field">
                {this.props.players.map((player, index) => (
                    <Fragment key={index}>
                        <Player
                            key={index}
                            name={player ? player.player_name : ''}
                            position={index}
                            onClick={this.props.onPositionClicked}
                        />
                        {[0,4,7,10].includes(index) && <br/>}
                    </Fragment>
                ))}


            </div>
        );
    }
}

export default Field;
