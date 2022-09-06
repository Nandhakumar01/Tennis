Match = [
    { PlayerName: "Ramanathan Krishnan", PlayerId: "RK01", Rank: 2 },
    { PlayerName: "Vijay Amritraj", PlayerId: "VA02", Rank: 8 },
    { PlayerName: "Leander Paes", PlayerId: "LP03", Rank: 5 },
    { PlayerName: "Mahesh Bhupathi.", PlayerId: "MB04", Rank: 1 },
    { PlayerName: "Rohan Bopanna.", PlayerId: "RB05", Rank: 3 },
    { PlayerName: "Ramkumar Ramanathan", PlayeId: "RR06", Rank: 4 },
    { PlayerName: "Somdev Devvarman", PlayerId: "SD07", Rank: 7 },
    { PlayerName: "Sumit Nagal", PlayerId: "SN08", Rank: 6 },
]
// probability
function probability(player1, player2) {
    player1Rank = findingRankByUsingName(player1)
    player2Rank = findingRankByUsingName(player2)
    random = Math.random().toFixed(2)
    x = 0, y = 0
    if (random > 0.5) {
        x = random
        y = (1 - x).toFixed(2)
    } else {
        y = random
        x = (1 - y).toFixed(2)
    }
    if (player1Rank < player2Rank & x >= 0.45) {
        return player1
    }
    else {
        return player2
    }
}
// match or round
match = []
for (i = 0; i < Match.length / 2; i++) {
    match.push([Match[i].PlayerName, Match[Match.length - 1 - i].PlayerName])
}
Round1 = []
Round2 = []
for (i=0;i<match.length;i++) {
    if (i % 2 == 0) {
        Round1.push(match[i])
    }

    else {
        Round2.push(match[i])
    }
}
for (i of Round2.reverse()) {
    Round1.push(i)
}
// winner
z = 0
winners = []
function winner() {
    Round1Winners = []
    winnerslist = []
    for (i = 0; i < Round1.length; i = i + 2) {
        list = []
        QuarterFinal = i + 1
        SemiFinal = i + 2
        Q_final = {}
        S_final = {}
        a = probability(Round1[i][0], Round1[i][1])
        Q_final["MatchNo"] = QuarterFinal
        Q_final["Player vs Player"] = Round1[i][0] + " vs " + Round1[i][1]
        Q_final["MatchId"] = Round1[i][0].toLowerCase().slice(0, 2) + findingRankByUsingName(Round1[i][0]) + Round1[i][1].toLowerCase().slice(0, 2) + findingRankByUsingName(Round1[i][1])
        Q_final["Winner"] = a
        b = probability(Round1[i + 1][0], Round1[i + 1][1])
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
    if (Round1Winners.length == 1) {
        return Round1Winners
    }
}
finalRound = winner()
function findingRankByUsingName(teamName) {
    rank = 0;
    Match.forEach(element => {
        if (element.PlayerName == teamName) {
            rank = element.Rank
        }
    });
    return rank
}
// final
final = {}
final["MatchNo"] = "Final"
final["Palyer vs Player"] = finalRound[0][0] + " vs " + finalRound[0][1]
final["MatchId"] = finalRound[0][0].toLowerCase().slice(0, 2) + findingRankByUsingName(finalRound[0][0]) + finalRound[0][1].toLowerCase().slice(0, 2) + findingRankByUsingName(finalRound[0][1])
final["Winner"] = finalRound[0][Math.floor(Math.random() * 2)]
winners.push([final])
count = 1
winners.forEach(element => {
    console.log("Round", count)
    console.table(element)
    count++
});


