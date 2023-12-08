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
		leagueId: item.league.id,
		leagueName: item.league.name,

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
			leagueId: homeTeamFixture?.leagueId,
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
					date: fixture.dateTime,

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
			leagueId: baseData.leagueId,
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
