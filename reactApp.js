
function Team(props) {
    let shotPercentageDiv
    if (props.stats.shots) {
        const shotPercentage = Math.floor((props.stats.score / props.stats.shots) * 100)
        shotPercentageDiv = (
            <div><strong> Shooting %:</strong> {shotPercentage}</div>
        )
    }

    return (
        <div className="Team">
            <h2> {props.name}</h2>
            <img src={props.logo} alt={props.name} />


            <div>
                <strong>shots:</strong> {props.stats.shots}

            </div>
            <div> <strong> score:</strong> {props.stats.score}
            </div>
            {shotPercentageDiv}
            <button onClick={props.Theshooter}>Shoot Here!</button>
        </div>
    )
}


class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            resetCount: 0,

            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }

        }
        this.shotSound = new Audio('./assets/Swish.mp3')
        this.scoreSound = new Audio('./assets/bball.wav')
    }
    Theshooter = (team) => {
        const teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score
        this.shotSound.play()


        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 100)
        }


        this.setState((state, props) => ({
            [teamStatsKey]: {
                shots: state[teamStatsKey].shots + 1,
                score
            }
        }))
        resetGame = () => {
            this.setState((state, props)({
                resetCount: state.resetCount + 1,
                homeTeamStats: {
                    score: 0,
                    shoot: 0
                },
                visitingTeamStats: {
                    score: 0,
                    shoot: 0

                }



            }))
        }

    }

    render() {
        return (
            <div className="Game">
                <h1> Welcome to the SHOWDOWN!</h1>
                <div className="stats">

                    <Team
                        name={this.props.hometeam.name}
                        logo={this.props.hometeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        Theshooter={this.Theshooter('home')}

                    />
                    <div className="versus">
                        <h1>VS</h1>
                        <div><strong>Reset:</strong> {this.state.resetCount}
                            <button onClick={resetGame} >Reset Game!</button>
                        </div>
                    </div>

                    <Team
                        name={this.props.visitingteam.name}
                        logo={this.props.visitingteam.logoSrc}
                        stats={this.state.visitingTeamStats}
                        Theshooter={this.Theshooter('visiting')}
                    />
                </div>
            </div>
        )
    }

}
function App(props) {
    const Rascals = {
        name: "California Rascals",
        logoSrc: "./assets/Rascals.png"
    }
    const Undertakers = {
        name: "  Miami Undertakes",
        logoSrc: "./assets/Undertakers.png"
    }
    const Ladiesteam1 = {
        name: "Denver Kittens",
        logoSrc: './assets/ladiesteam1.webp'
    }
    const Ladiesteam2 = {
        name: "Michigan Bulldogs",
        logoSrc: "./assets/ladiesteam2.jpg"
    }
    return (
        <div className="App">
            <Game venue="Melina Park Ave"
                hometeam={Rascals}
                visitingteam={Undertakers}
            />

            <Game venue="Lasher Arena"
                hometeam={Ladiesteam2}
                visitingteam={Ladiesteam1}
            />

        </div>)

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)