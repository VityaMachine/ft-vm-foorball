import { byTeamsFixturesParser } from './fixturesHelpers'

const resultSumCalculator = (array: any[], fieldName: string) => {
	return array
		.filter(f => f[fieldName] !== null)
		.map(f => f[fieldName])
		.reduce((a, v) => a + v, 0)
}

// type : ITeamResultsFromFixtures[]
export const teamsResultsFromFixtures = (
	data: IFixtureData[],
	corrections: ICorrectedLeaguesTeamData[],
	sortType?: 'all' | 'home' | 'away'
) => {
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
		prev5: teamData.fixtures
			.filter(item => item.status === 'FT')
			.slice(-5)
			.reverse(),
		next5: teamData.fixtures.filter(item => item.status !== 'FT' && item.status !== 'CANC').slice(0, 5),
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

					if (field !== 'goalsDiff') {
						teamResults.goalsDiff = teamResults.goalsFor - teamResults.goalsAgainst
					}

					if (field !== 'points') {
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

// type ITeamResultsFromFixtures[]
export const sortTableDataHandler = (
	teamsData: ITeamResultsFromFixtures[],
	sortingField: keyof ISortingResultsData,
	sortingBy: 'asc' | 'desc'
) => {
	const dataToSorting = teamsData.map(team => ({
		teamId: team.teamId,
		position: team.leaguePosition,
		teamName: team.teamName,
		games: team.results.games,

		win: team.results.win,
		draw: team.results.draw,
		lose: team.results.lose,

		goalsFor: team.results.goalsFor,
		goalsAgainst: team.results.goalsAgainst,
		goalsDiff: team.results.goalsDiff,

		points: team.results.points
	}))

	dataToSorting.sort(function (a, b) {
		if (
			sortingField !== 'next5' &&
			sortingField !== 'prev5' &&
			(sortingField === 'position' ||
				sortingField === 'games' ||
				sortingField === 'win' ||
				sortingField === 'draw' ||
				sortingField === 'lose' ||
				sortingField === 'goalsFor' ||
				sortingField === 'goalsAgainst' ||
				sortingField === 'goalsDiff' ||
				sortingField === 'points')
		) {
			if (a[sortingField] !== undefined && b[sortingField] !== undefined && a[sortingField] < b[sortingField]) {
				return sortingBy === 'asc' ? -1 : 1
			}
			if (a[sortingField] && b[sortingField] && a[sortingField] > b[sortingField]) {
				return sortingBy === 'asc' ? 1 : -1
			}
		}
		return 0
	})

	const sortedTeamsData = dataToSorting.map(team => {
		const teamId = team.teamId

		return teamsData.find(item => item.teamId === teamId)
	})

	return sortedTeamsData
}
