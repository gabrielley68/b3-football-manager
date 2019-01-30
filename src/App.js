import React, { Component } from 'react';
import './Stylesheets/App.css';
import Select from './Components/Select';
import Field from './Components/Field';

class App extends Component {

    constructor(props){
        super(props);

        let initPlayers = new Array(11).fill(null);

        this.state = {
            players : initPlayers,
            lastPositionClicked: null
        }
    }

    onPositionClicked = (position) => {
        this.setState({
            lastPositionClicked: null
        });
        this.setState({
            lastPositionClicked: position
        });
    };

    playerSelected = (position, data) => {
        let error = false;
        this.state.players.map((player) => {
           if(player != null && player.player_name === data.player_name){
               console.error('Joueur déjà présent');
               error = true;
           }
        });

        if(!error) {
            this.setState({
                lastPositionClicked: null
            });
            let newPlayers = this.state.players.slice();
            newPlayers[position] = data;
            this.setState({
                players: newPlayers
            });
        }
    };


    render() {
        return (
            <div className="App">
                <Field
                    players={this.state.players}
                    onPositionClicked={this.onPositionClicked}
                />

                {this.state.lastPositionClicked !== null &&
                    <Select
                        position={this.state.lastPositionClicked}
                        playerSelected={this.playerSelected}
                    />
                }
            </div>
        );
    }
}

export default App;
