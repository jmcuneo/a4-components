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
function PatchData(props: Props) {
    useEffect(() => {
        const tempGames: game[] = [
            {team1: 'he', user: props.user, team2: 'she', winner: 'draw', score2: 3, score1: 3},
            {team1: 'Mike', user: props.user, team2: 'Prof. Cuneo', winner: 'Mike', score2: 0, score1: 100},
            {team1: 'as', user: props.user, team2: 'df', winner: 'df', score2: 10, score1: 9}
        ];
        props.setGames(tempGames)
    }, [props.user]);

    const [gameOld, setGameOld] = useState<game>(
        {team1: '', user: props.user, team2: '', winner: '', score2: 0, score1: 0});
    const [gameNew, setGameNew] = useState<game>(
        {team1: '', user: props.user, team2: '', winner: '', score2: 0, score1: 0});


    function patchData() {
        let temp: game[] = props.games;
        props.games.forEach((g: game) => {
            if (gameOld.team1 === g.team1 || gameOld.team2 === g.team2 || gameOld.score1 === g.score1 || gameOld.score2 === g.score2) {
                g.team1 = gameNew.team1;
                g.team2 = gameNew.team2;
                g.score1 = gameNew.score1;
                g.score2 = gameNew.score2;
                g.winner = "draw";
                if (g.score1 > g.score2) {
                    g.winner = g.team1;
                } else if (g.score1 < g.score2) {
                    g.winner = g.team2;
                }
            }
        });
        props.setGames(temp);
        setGameOld({team1: '', user: props.user, team2: '', winner: '', score2: 0, score1: 0});
        setGameNew({team1: '', user: props.user, team2: '', winner: '', score2: 0, score1: 0});
    }
    return (
        <div className="h-full w-full flex flex-col">
            <div className="bg-blue-950 h-16 w-full flex justify-end items-center p-0 m-0">
                <NavBar />
            </div>
            <div className="mainDiv bg-amber-200 flex-grow flex flex-row gap-16">
                <div
                    className="bg-blue-100 w-96 h-4/5 flex flex-col align-middle justify-center p-4 rounded-2xl border-4 border-blue-950">
                    <h1 className="font-bold text-2xl">Modify Data</h1>
                    <h2>Select the game you wish to edit</h2>
                    <p>First team</p>
                    <input value={gameOld.team1} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGameOld(prevState => ({
                            ...prevState, team1: e.target.value
                        }))
                    }}/>
                    <p>Second team</p>
                    <input value={gameOld.team2} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGameOld(prevState => ({
                            ...prevState, team2: e.target.value
                        }))
                    }}/>
                    <p>First team's score</p>
                    <input value={gameOld.score1} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGameOld(prevState => ({
                            ...prevState, score1: parseInt(e.target.value)
                        }))
                    }}/>
                    <p>Second team's score</p>
                    <input value={gameOld.score2} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGameOld(prevState => ({
                            ...prevState, score2: parseInt(e.target.value)
                        }))
                    }}/>
                    <br/>
                    <h2>Fill in the fields with the modified values</h2>
                    <p>First team</p>
                    <input value={gameNew.team1} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGameNew(prevState => ({
                            ...prevState, team1: e.target.value
                        }))
                    }}/>
                    <p>Second team</p>
                    <input value={gameNew.team2} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGameNew(prevState => ({
                            ...prevState, team2: e.target.value
                        }))
                    }}/>
                    <p>First team's score</p>
                    <input value={gameNew.score1} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGameNew(prevState => ({
                            ...prevState, score1: parseInt(e.target.value)
                        }))
                    }}/>
                    <p>Second team's score</p>
                    <input value={gameNew.score2} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGameNew(prevState => ({
                            ...prevState, score2: parseInt(e.target.value)
                        }))
                    }}/>
                    <br/>
                    <button onClick={patchData}
                            className="bg-amber-950 text-white h-12 hover:bg-amber-100 hover:text-black">Modify Data
                    </button>
                </div>
                <div id="tableDiv"
                     className="bg-blue-100 w-1/2 h-4/5 flex flex-col align-middle justify-start p-4 rounded-2xl border-4 border-blue-950">
                    <GamesTable user={props.user} games={props.games}/>
                </div>
            </div>
        </div>
    );
}

export default PatchData;
