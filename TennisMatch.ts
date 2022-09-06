interface Match{
    PlayerName:string,
    PlayerId:string,
    Rank:number
}


const match:Match[] = [
    { PlayerName: "Ramanathan Krishnan", PlayerId: "RK01", Rank: 2 },
    { PlayerName: "Vijay Amritraj", PlayerId: "VA02", Rank: 8 },
    { PlayerName: "Leander Paes", PlayerId: "LP03", Rank: 5 },
    { PlayerName: "Mahesh Bhupathi.", PlayerId: "MB04", Rank: 1 },
    { PlayerName: "Rohan Bopanna.", PlayerId: "RB05", Rank: 3 },
    { PlayerName: "Ramkumar Ramanathan", PlayerId: "RR06", Rank: 4 },
    { PlayerName: "Somdev Devvarman", PlayerId: "SD07", Rank: 7 },
    { PlayerName: "Sumit Nagal", PlayerId: "SN08", Rank: 6 },
]
// probability
function probability(player1:string, player2:string) {
    let player1Rank = findingRankByUsingName(player1)
    let player2Rank = findingRankByUsingName(player2)
    let random = Math.random()
    let x:number = 0
    let y:number = 0
    if (random > 0.5) {
        x = random
        y = (1 - x)
    } else {
        y = random
        x = (1 - y)
    }
    if (player1Rank < player2Rank && x >= 0.45) {
        return player1
    }
    else {
        return player2
    }
}
// match or round
let matchL:any = []
for (let i = 0; i < match.length / 2; i++) {
    matchL.push([match[i].PlayerName, match[match.length - 1 - i].PlayerName])
}
let Round1:any = []
let Round2:any = []
for (let i=0;i<matchL.length;i++) {
    if (i % 2 == 0) {
        Round1.push(matchL[i])
    }

    else {
        Round2.push(matchL[i])
    }
}
for (let i of Round2.reverse()) {
    Round1.push(i)
}
// winner
let z = 0
let winners:any = []
function winner():any {
    let Round1Winners = []
    let winnerslist = []
    for (let i = 0; i < Round1.length; i = i + 2) {
        let list:any = []
        let QuarterFinal = i + 1
        let SemiFinal = i + 2
        let Q_final:any = {}
        let S_final:any = {}
        let a = probability(Round1[i][0], Round1[i][1])
        Q_final["MatchNo"] = QuarterFinal
        Q_final["Player vs Player"] = Round1[i][0] + " vs " + Round1[i][1]
        Q_final["MatchId"] = Round1[i][0].toLowerCase().slice(0, 2) + findingRankByUsingName(Round1[i][0]) + Round1[i][1].toLowerCase().slice(0, 2) + findingRankByUsingName(Round1[i][1])
        Q_final["Winner"] = a
        let b = probability(Round1[i + 1][0], Round1[i + 1][1])
        S_final["MatchNo"] = SemiFinal
        S_final["Player vs Player"] = Round1[i + 1][0] + " vs " + Round1[i + 1][1]
        S_final["MatchId"] = Round1[i + 1][0].toLowerCase().slice(0, 2) + findingRankByUsingName(Round1[i + 1][0]) + Round1[i + 1][1].toLowerCase().slice(0, 2) + findingRankByUsingName(Round1[i + 1][1])
        S_final["Winner"] = b
        list.push(a)
        list.push(b)
        Round1Winners.push(list)
        winnerslist.push(Q_final)
        winnerslist.push(S_final)
    }
    winners.push(winnerslist)
    Round1 = Round1Winners
    while (Round1.length != 1) {
        winner()
    }
    if (Round1Winners.length >= 1) {
        return Round1Winners
    }
}
let finalRound = winner()
function findingRankByUsingName(teamName:string) {
    let rank = 0;
    match.forEach(element => {
        if (element.PlayerName == teamName) {
            rank = element.Rank
        }
    });
    return rank
}
// final
let final:any = {}
final["MatchNo"] = "Final"

final["Palyer vs Player"] = finalRound[0][0] + " vs " + finalRound[0][1]
final["MatchId"] = finalRound[0][0].toLowerCase().slice(0, 2) + findingRankByUsingName(finalRound[0][0]) + finalRound[0][1].toLowerCase().slice(0, 2) + findingRankByUsingName(finalRound[0][1])
final["Winner"] = finalRound[0][Math.floor(Math.random() * 2)]
winners.push([final])
let count = 1
winners.forEach((element: any) => {
    if(winners.length>=1){
    console.log("Round", count)
    console.log(element)
    count++
    }
});