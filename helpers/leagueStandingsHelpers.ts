const teamStatsCreator = ({ played, win, draw, lose, goals }: IMatchesStandingsData) => ({
	played,
	win,
	draw,
	lose,
	goalsFor: goals.for,
	goalsAgainst: goals.against,
	goalsDiff: goals.for - goals.against,
	points: win * 3 + draw
})

export const leagueStandingsParser = (data: ILeagueStandings[]) =>
	data.map(item => ({
		rank: item.rank,
		teamName: item.team.name,
		teamId: item.team.id,
		teamLogo: item.team.logo,
		matches: {
			all: teamStatsCreator(item.all),
			home: teamStatsCreator(item.home),
			away: teamStatsCreator(item.away)
		},
		form: item.form
	}))

const fixtureResultHandler = (
	teamForGoals: number | null,
	teamAgainstGoals: number | null
): 'W' | 'D' | 'L' | null | undefined => {
	if (teamForGoals === null || teamAgainstGoals === null) {
		return null
	}

	if (teamForGoals > teamAgainstGoals) {
		return 'W'
	}
	if (teamForGoals === teamAgainstGoals) {
		return 'D'
	}
	if (teamForGoals < teamAgainstGoals) {
		return 'L'
	}
}

export const fixturesDataParser = (data: IFixtureData[]): IFixtureConvertedData[] =>
	data.map(item => ({
		fixtureId: item.fixture.id,
		date_text: item.fixture.date,
		dateTime: new Date(item.fixture.date),
		referee: item.fixture.referee,
		statusLong: item.fixture.status.long,
		statusShort: item.fixture.status.short,
		city: item.fixture.venue.city,
		stadiumName: item.fixture.venue.name,
		stadiumId: item.fixture.venue.id,
		round: item.league.round,

		homeTeamName: item.teams.home.name,
		homeTeamId: item.teams.home.id,
		homeTeamLogo: item.teams.home.logo,
		homeTeamGoalsHT: item.score.halftime.home,
		homeTeamGoalsFT: item.score.fulltime.home,
		homeTeamResult: fixtureResultHandler(item.score.fulltime.home, item.score.fulltime.away),

		awayTeamName: item.teams.away.name,
		awayTeamId: item.teams.away.id,
		awayTeamLogo: item.teams.away.logo,
		awayTeamGoalsHT: item.score.halftime.away,
		awayTeamGoalsFT: item.score.fulltime.away,
		awayTeamResult: fixtureResultHandler(item.score.fulltime.away, item.score.fulltime.home)
	}))

const ptsRsolver = (result: 'W' | 'D' | 'L' | null | undefined) => {
	switch (result) {
		case 'W':
			return 3
			break
		case 'D':
			return 1
			break
		case 'L':
			return 0
			break
		default:
			return null
	}
}

export const byTeamsFixturesParser = (data: IFixtureData[]) => {
	const fixtures = fixturesDataParser(data)

	fixtures.sort((a, b) => a.dateTime - b.dateTime)

	const teamsIds: number[] = []

	fixtures.forEach(fixture => {
		if (!teamsIds.includes(fixture.homeTeamId)) {
			teamsIds.push(fixture.homeTeamId)
		}
	})

	const teamsData = teamsIds.map(teamId => {
		const homeTeamFixture = fixtures.find(fixture => fixture.homeTeamId === teamId)

		const baseData = {
			teamId: homeTeamFixture?.homeTeamId,
			teamName: homeTeamFixture?.homeTeamName,
			teamLogo: homeTeamFixture?.homeTeamLogo,
			fixturesTotal: fixtures
				.filter(fixture => fixture.homeTeamId === teamId || fixture.awayTeamId === teamId)
				.map(fixture => ({
					fixtureId: fixture.fixtureId,
					result: fixture.homeTeamId === teamId ? fixture.homeTeamResult : fixture.awayTeamResult,
					finalScore:
						fixture.homeTeamGoalsFT === null || fixture.awayTeamGoalsFT === null
							? null
							: `${fixture.homeTeamGoalsFT}-${fixture.awayTeamGoalsFT}`,
					status: fixture.statusShort,
					round: fixture.round,
					referee: fixture.referee,
					stadiumId: fixture.stadiumId,
					stadiumName: fixture.stadiumName,
					stadiumCity: fixture.city,

					isHomeGame: fixture.homeTeamId === teamId,

					opponentId: fixture.homeTeamId === teamId ? fixture.awayTeamId : fixture.homeTeamId,
					opponentTeamName: fixture.homeTeamId === teamId ? fixture.awayTeamName : fixture.homeTeamName,
					goalsFor: fixture.homeTeamId === teamId ? fixture.homeTeamGoalsFT : fixture.awayTeamGoalsFT,
					goalsAgainst: fixture.homeTeamId === teamId ? fixture.awayTeamGoalsFT : fixture.homeTeamGoalsFT
				}))
		}

		const expandedData = {
			teamId: baseData.teamId,
			teamName: baseData.teamName,
			teamLogo: baseData.teamLogo,
			fixtures: baseData.fixturesTotal.map(fixture => ({
				...fixture,
				points: ptsRsolver(fixture.result),
				goalsDiff:
					fixture.goalsFor !== null && fixture.goalsAgainst !== null ? fixture.goalsFor - fixture.goalsAgainst : null
			}))
		}
		return expandedData
	})

	return teamsData
}

const resultSumCalculator = (array: any[], fieldName: string) => {
	return array
		.filter(f => f[fieldName] !== null)
		.map(f => f[fieldName])
		.reduce((a, v) => a + v, 0)
}

export const teamsResultsFromFixtures = (data: IFixtureData[], sortType?: 'all' | 'home' | 'away') => {
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

	fixturesAndResultsData
		.sort((a, b) => b.results.goalsFor - a.results.goalsFor)
		.sort((a, b) => b.results.goalsDiff - a.results.goalsDiff)
		.sort((a, b) => b.results.points - a.results.points)
		

	return fixturesAndResultsData
}
