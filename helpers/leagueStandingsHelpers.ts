import { byTeamsFixturesParser } from './fixturesHelpers'

const resultSumCalculator = (array: any[], fieldName: string) => {
	return array
		.filter(f => f[fieldName] !== null)
		.map(f => f[fieldName])
		.reduce((a, v) => a + v, 0)
}

export const teamsResultsFromFixtures = (
	data: IFixtureData[],
	corrections: ICorrectedLeaguesTeamData[],
	sortType?: 'all' | 'home' | 'away'
): ITeamResultsFromFixtures[] => {
	const parsedData = byTeamsFixturesParser(data)

	const selectedData = parsedData.map(teamData => ({
		...teamData,
		fixtures: teamData.fixtures.filter(fixture => {
			if (sortType === 'all' || sortType === undefined) {
				return true
			}
			if (sortType === 'home') {
				return fixture.isHomeGame
			}
			if (sortType === 'away') {
				return !fixture.isHomeGame
			}
		})
	}))

	const fixturesAndResultsData = selectedData.map(teamData => ({
		...teamData,
		corrections: null,
		results: {
			games: teamData.fixtures.filter(fixture => fixture.status === 'FT').length,
			win: teamData.fixtures.filter(fixture => fixture.result === 'W').length,
			draw: teamData.fixtures.filter(fixture => fixture.result === 'D').length,
			lose: teamData.fixtures.filter(fixture => fixture.result === 'L').length,
			goalsFor: resultSumCalculator(teamData.fixtures, 'goalsFor'),
			goalsAgainst: resultSumCalculator(teamData.fixtures, 'goalsAgainst'),
			goalsDiff: resultSumCalculator(teamData.fixtures, 'goalsDiff'),
			points: resultSumCalculator(teamData.fixtures, 'points')
		}
	}))

	const correctedRsultsData = fixturesAndResultsData.map(teamInfo => {
		const isForCorrection = corrections.find(
			item => item.teamId === teamInfo.teamId && item.leagueId === teamInfo.leagueId
		)

		// console.log(isForCorrection);

		const statsValues = Object.keys(teamInfo.results)

		if (isForCorrection) {
			const correctionsData: CorretionItemType | undefined = isForCorrection.data.find(item =>
				statsValues.includes(item.field)
			)

			const teamResults = teamInfo.results

			statsValues.forEach(field => {

				if (field === correctionsData?.field) {

					teamResults[field as keyof typeof teamResults] =
						teamInfo.results[field as keyof typeof teamResults] + correctionsData.value

					if(field !== 'goalsDiff') {
						teamResults.goalsDiff = teamResults.goalsFor - teamResults.goalsAgainst
					}

					if(field !== 'points') {
						teamResults.points = teamResults.win * 3 + teamResults.draw
					}
				}
			})

	

			return {
				...teamInfo,
				results: {
					...teamInfo.results,
					goalsDiff: statsValues.includes('goalsDiff')
						? teamInfo.results.goalsDiff
						: teamInfo.results.goalsFor - teamInfo.results.goalsAgainst,
					points: statsValues.includes('points')
						? teamInfo.results.points
						: teamInfo.results.win * 3 + teamInfo.results.draw
				},

				corrections: !teamInfo.corrections
					? [{ ...correctionsData }]
					: [...teamInfo.corrections, { ...correctionsData }]
			}
		}

		return teamInfo
	})

	correctedRsultsData
		.sort((a, b) => b.results.goalsFor - a.results.goalsFor)
		.sort((a, b) => b.results.goalsDiff - a.results.goalsDiff)
		.sort((a, b) => b.results.points - a.results.points)

	const finilizedResultsData = correctedRsultsData.map((item, index) => ({
		...item,
		leaguePosition: index + 1
	}))

	return finilizedResultsData
}

// export const standingsTableRowsHelper = (
// 	fixturesData: IFixtureData[],
// 	corrections: ICorrectedLeaguesTeamData[],
// 	sortType?: 'all' | 'home' | 'away'
// ) => {
// 	const statsByTeams = teamsResultsFromFixtures(fixturesData, corrections, sortType)

// 	const tableData = statsByTeams.map(team => {
// 		// const allMatchesData = team.fixtures.map(fixture => ({
// 		// 	fixtureId: fixture.fixtureId,
// 		// 	fixtureDate: fixture.date.toISOString().split('T')[0].split('-').join('.'),
// 		// 	fixtureStatus: fixture.status,
// 		// 	fixtureRound: fixture.round,
// 		// 	fixtureScore: fixture.finalScore,
// 		// 	fixtureResult: fixture.result,

// 		// 	isHomeGame: fixture.isHomeGame,
// 		// 	points: fixture.points,
// 		// 	goalsFor: fixture.goalsFor,
// 		// 	goalsAgainst: fixture.goalsAgainst,
// 		// 	goalsDiff: fixture.goalsDiff,

// 		// 	homeTeamId: fixture.isHomeGame ? team.teamId : fixture.opponentId,
// 		// 	homeTeamName: fixture.isHomeGame ? team.teamName : fixture.opponentTeamName,

// 		// 	awayTeamId: !fixture.isHomeGame ? team.teamId : fixture.opponentId,
// 		// 	awayTeamName: !fixture.isHomeGame ? team.teamName : fixture.opponentTeamName
// 		// }))

// 		// const finishedMatches = allMatchesData.filter(item => item.fixtureStatus === 'FT')

// 		// const winMatches = finishedMatches.filter(item => item.fixtureResult === 'W')
// 		// const drawMatches = finishedMatches.filter(item => item.fixtureResult === 'D')
// 		// const loseMatches = finishedMatches.filter(item => item.fixtureResult === 'L')

// 		const finishedFixturesData = team.fixtures.filter(item => item.status === 'FT')

// 		const gamesData = finishedFixturesData.map(item => ({
// 			isHomeGame: item.isHomeGame,
// 			opponentName: item.opponentTeamName,
// 			opponentId: item.opponentId,
// 			finalScore: item.finalScore,
// 			fixtureId: item.fixtureId,
// 			result: item.result,
// 			goalsFor: item.goalsFor,
// 			goalsAgainst: item.goalsAgainst,
// 			goalsDiff: item.goalsDiff
// 		}))

// 		return {
// 			teamId: team.teamId,
// 			teamName: team.teamName,
// 			teamLogo: team.teamLogo,
// 			resultsValues: {
// 				position: team.leaguePosition,
// 				...team.results
// 			},
// 			resultsData: {
// 				games: gamesData,
// 				win: gamesData.filter(item => item.result === 'W'),
// 				draw: gamesData.filter(item => item.result === 'D'),
// 				lose: gamesData.filter(item => item.result === 'L')
// 			}
// 		}
// 	})

// 	return statsByTeams
// 	// return tableData
// }