import React, {useEffect, useState} from 'react';
import '../css/App.css';
import {game, user} from "../dataTypes";

type Props = {
    user: user
    games: game[]
}
function GamesTable(props: Props) {
    const [userGames, setUserGames] = useState<game[]>([])
    function buildTable() {
        let tempGames: game[] = []
        props.games.forEach((g: game) => {
            if (g.user === props.user) {
                tempGames.push(g);
            }
        });
        setUserGames(tempGames);
    }

    useEffect(() => {
        buildTable();
    }, [props]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Team1</th>
                    <th>Team2</th>
                    <th>score1</th>
                    <th>score2</th>
                    <th>winner</th>
                </tr>
            </thead>
            <tbody>
            {userGames.map((game: game) => (
                <tr>
                    <td>{game.team1}</td>
                    <td>{game.team2}</td>
                    <td>{game.score1}</td>
                    <td>{game.score2}</td>
                    <td>{game.winner}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default GamesTable;
