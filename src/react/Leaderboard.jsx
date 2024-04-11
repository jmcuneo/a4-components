import * as React from "react"

function Leaderboard(props) {
  let scores = []
  props.userScores.forEach(user => {
    scores.push(<tr>
      <td>{user.user}</td>
      <td>{user.score}</td>
    </tr>)
  })

    return (
      <div class="leaderboard">
          <table>
            <tbody id="leaderboard">
              <tr>
                <th>User</th>
                <th>Total</th>
              </tr>
              {scores}
          </tbody>
          </table>
        </div>
    );
  }
  
export default Leaderboard;
  