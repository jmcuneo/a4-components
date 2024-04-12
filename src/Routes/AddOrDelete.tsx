import React, {ChangeEvent, useEffect, useState} from 'react';
import '../css/App.css';
import NavBar from "../Components/NavBar";
import {game, user} from "../dataTypes";
import GamesTable from "../Components/GamesTable";

type Props = {
    user: user
    games: game[]
    setGames: (g: game[]) => void
}
function AddOrDelete(props: Props) {
    useEffect(() => {
        const tempGames: game[] = [
            {team1: 'he', user: props.user, team2: 'she', winner: 'draw', score2: 3, score1: 3},
            {team1: 'Mike', user: props.user, team2: 'Prof. Cuneo', winner: 'Mike', score2: 0, score1: 100},
            {team1: 'as', user: props.user, team2: 'df', winner: 'df', score2: 10, score1: 9}
        ];
        props.setGames(tempGames)
    }, [props.user]);

    const [game, setGame] = useState<game>(
        {team1: '', user: props.user, team2: '', winner: '', score2: 0, score1: 0});
    function addGame() {
        let temp: game[] = props.games
        game.winner = "draw";
        if (game.score1 > game.score2) {
            game.winner = game.team1;
        } else if (game.score1 < game.score2) {
            game.winner = game.team2;
        }
        temp.push(game)
        props.setGames(temp);
        setGame({team1: '', user: props.user, team2: '', winner: '', score2: 0, score1: 0});
    }

    function deleteGame() {
        let temp: game[] = [];
        props.games.forEach((g: game) => {
            if (game.team1 !== g.team1 || game.team2 !== g.team2 || game.score1 !== g.score1 || game.score2 !== g.score2) {
                temp.push(g);
            }
        });
        props.setGames(temp);
        setGame({team1: '', user: props.user, team2: '', winner: '', score2: 0, score1: 0});
    }


    return (
        <div className="h-full w-full flex flex-col">
            <NavBar/>
            <div className="mainDiv bg-amber-200 flex-grow flex flex-row gap-16">
                <div
                    className="bg-blue-100 w-96 h-4/5 flex flex-col align-middle justify-center p-4 rounded-2xl border-4 border-blue-950">
                    <h1 className="font-bold text-2xl">Enter game information</h1>
                    <br/>
                    <p>First team</p>
                    <input value={game.team1} onChange={(e: ChangeEvent<HTMLInputElement>) => {setGame(prevState => ({
                        ...prevState, team1: e.target.value}))}}/>
                    <p>Second team</p>
                    <input value={game.team2} onChange={(e: ChangeEvent<HTMLInputElement>) => {setGame(prevState => ({
                        ...prevState, team2: e.target.value}))}}/>
                    <p>First team's score</p>
                    <input value={game.score1} onChange={(e: ChangeEvent<HTMLInputElement>) => {setGame(prevState => ({
                        ...prevState, score1: parseInt(e.target.value)}))}}/>
                    <p>Second team's score</p>
                    <input value={game.score2} onChange={(e: ChangeEvent<HTMLInputElement>) => {setGame(prevState => ({
                        ...prevState, score2: parseInt(e.target.value)}))}}/>
                    <br/>
                    <br/>
                    <div className="flex justify-between">
                        <button onClick={addGame}
                                className="bg-amber-950 text-white w-40 h-12 hover:bg-amber-100 hover:text-black">Add
                            Game
                        </button>
                        <button onClick={deleteGame}
                                className="bg-amber-950 text-white w-40 h-12 hover:bg-amber-100 hover:text-black">Delete
                            Game
                        </button>
                    </div>
                </div>
                <div
                     className="bg-blue-100 w-1/2 h-4/5 flex flex-col align-middle justify-start p-4 rounded-2xl border-4 border-blue-950">
                    <GamesTable user={props.user} games={props.games} />
                </div>
            </div>
        </div>
    );
}

export default AddOrDelete;
