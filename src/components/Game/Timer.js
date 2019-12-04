import React, { Component } from 'react';
import Endgame from './Endgame';
import Puzzle from './Puzzle';
import './Game.css'
//props this file needs to operate: Time limit
class Timer extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            isPaused: this.props.gameFinished
        }
        this.gameHandler = this.gameHandler.bind(this);
    }

    gameHandler() {
        this.setState({
            isPaused: true
        })
    }

    convertSeconds(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        return String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    }

    render() {
        const { count } = this.state;
        //time out
        if (this.state.count === 0) {
            clearInterval(this.myInterval);
            return <Endgame
                gameId={this.props.gameID}
                gameUserName={this.props.gameUserName}
                gameReviewCount={this.props.gameReviewCount}
                gameAverageRating={this.props.gameAverageRating}
                outcome={false} />;
            //not time out and win the game
        } else {
            if (this.state.isPaused) {
                console.log("Win game yet? ", this.state.isPaused)
                const winPage = <Endgame
                    gameId={this.props.gameID}
                    gameUserName={this.props.gameUserName}
                    gameReviewCount={this.props.gameReviewCount}
                    gameAverageRating={this.props.gameAverageRating}
                    outcome={this.state.isPaused} />;
                return (
                    <div>
                        {winPage}
                    </div>
                )
            }
            else {
                return (
                    <div id="time">
                        <p id="timer"><strong>{this.convertSeconds(count)}</strong></p>
                        <Puzzle
                            gID={this.props.gameID}
                            gTitle={this.props.gameTitle}
                            gTotalQuestions={this.props.gameTotalQuestions}
                            gTotalHints={this.props.gameTotalHints}
                            gAtQuestion={this.props.gameAtQuestion}
                            gQuestions={this.props.gameQuestions}
                            gQuestionGeos={this.props.gameQuestionGeos}
                            gQuestionVisualAids={this.props.gameQuestionVisualAids}
                            gHints={this.props.gameHints}
                            gAnswerType={this.props.gameAnswerType}
                            gVisualAid0={this.props.gameVisualAid0}
                            gVisualAid1={this.props.gameVisualAid1}
                            gVisualAid2={this.props.gameVisualAid2}
                            gVisualAid3={this.props.gameVisualAid3}
                            gAnswers={this.props.gameAnswers}
                            gAidStuffs={this.props.gameAidStuffs}
                            gameHandler={this.gameHandler}
                        />
                    </div>
                )
            }

        }

    }

    async componentDidMount() {
        this._isMounted = true;
        const { startCount } = this.props;
        this.setState({
            count: startCount
        })
        this.myInterval = setInterval(() => {
            if (!this.state.isPaused) {
                this.setState(prevState => ({
                    count: prevState.count - 1
                }))
            }
        }, 10000)
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

}

export default Timer;