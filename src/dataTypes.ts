export type game = {
    team1: string
    team2: string
    score1: number
    score2: number
    winner: string
    user: user
}

export type user = {
    username: string
    password: string
}