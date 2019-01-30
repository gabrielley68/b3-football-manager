import React, { Component } from 'react';
import '../Stylesheets/Select.css';

class Select extends Component {

    constructor(props){
        super(props);

        this.state = {
            result : []
        };

        this.timeOut = null;
        this.setTypePlayer();
    }

    onInput(e){
        clearTimeout(this.timeOut);
        e.persist();
        this.timeOut = setTimeout(() => this.apiCall(e), 500);
    }

    apiCall(e){
        const urlApi = "https://allsportsapi.com/api/football/?met=Players";
        const keyApi = "eb7490e0ca3a3d75eab567df34d6b3bce6f747b8b30c8bdeee27f52a1ed3b150";
        const value = e.target.value;
        if (value.length >= 4) {
            fetch(urlApi + '&playerName=' + value + '&APIkey=' + keyApi)
                .then(rawData => {
                    rawData.json().then(value => {
                        let results = [];
                        if (value.result) {
                            value.result.map((player) => {
                                if (results.length < 10) {
                                    if(player.player_type === this.playerType || this.playerType === '') {
                                        results = [...results, player];
                                    }
                                }
                            });
                            this.setState({
                                result: results
                            });
                        } else {
                            this.setState({
                                result: []
                            });
                        }
                    });
                });
        } else {
            this.setState({
                result: []
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.position !== this.props.position){
            this.setState({
                result: []
            });
            this.setTypePlayer();
        }
    }

    setTypePlayer(){
        this.playerType = '';
        if(this.props.position === 0){
            this.playerType = "Goalkeepers";
        }
        else if(this.props.position >= 1 && this.props.position <= 4){
            this.playerType = "Defenders";
        }
        else if(this.props.position >= 5 && this.props.position <= 7){
            this.playerType = "Midfielders";
        }
        else if(this.props.position >= 8 && this.props.position <= 10){
            this.playerType="Forwards";
        }
        else this.playerType="";
    }


    render() {
        return (
            <div className="Select">
                <label>Selectionnez votre joueur</label>
                <input type="text" name="name" onInput={e => this.onInput(e)}/>
                {this.state.result.length !== 0 &&
                    <>
                        {this.state.result.map((player, index) => (
                            <button key={index}
                                onClick={() => this.props.playerSelected(this.props.position, player)}
                                    className={"selectPlayer"}
                            >
                                {player.player_name}
                            </button>
                        ))}
                    </>
                }
            </div>
        );
    }
}

export default Select;
