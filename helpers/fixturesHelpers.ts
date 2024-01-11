import { teamNames } from '@/constants/teamNames'

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

export const fixturesDataParser = (data: IFixtureData[]): IFixtureConvertedData[] => {
	return data.map(item => {
		const homeTeamNames = teamNames.find(nameItem => nameItem.id === item.teams.home.id)
		const awayTeamNames = teamNames.find(nameItem => nameItem.id === item.teams.away.id)

		return {
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

			online: ['1H', '2H', 'HT'].includes(item.fixture.status.short)
				? {
						elapsedTime: item.fixture.status.elapsed,
						goalsHome: item.goals.home ? item.goals.home : 0,
						goalsAway: item.goals.away ? item.goals.away : 0
				  }
				: null,
			homeTeamNameOriginal: item.teams.home.name,
			homeTeamNameData: homeTeamNames
				? {
						longName: homeTeamNames.nameLong,
						shortName: homeTeamNames.nameShort
				  }
				: null,
			homeTeamId: item.teams.home.id,
			homeTeamLogo: item.teams.home.logo,
			homeTeamGoalsHT: item.score.halftime.home,
			homeTeamGoalsFT: item.score.fulltime.home,
			homeTeamResult: fixtureResultHandler(item.score.fulltime.home, item.score.fulltime.away),

			awayTeamNameOriginal: item.teams.away.name,
			awayTeamNameData: awayTeamNames
				? {
						longName: awayTeamNames.nameLong,
						shortName: awayTeamNames.nameShort
				  }
				: null,
			awayTeamId: item.teams.away.id,
			awayTeamLogo: item.teams.away.logo,
			awayTeamGoalsHT: item.score.halftime.away,
			awayTeamGoalsFT: item.score.fulltime.away,
			awayTeamResult: fixtureResultHandler(item.score.fulltime.away, item.score.fulltime.home)
		}
	})
}

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

	// console.log(fixtures.find(item => item.fixtureId === 1038133))

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
			teamNameOriginal: homeTeamFixture?.homeTeamNameOriginal,
			teamNameData: homeTeamFixture?.homeTeamNameData,
			teamLogo: homeTeamFixture?.homeTeamLogo,
			leagueId: homeTeamFixture?.leagueId,
			fixturesTotal: fixtures
				.filter(fixture => fixture.homeTeamId === teamId || fixture.awayTeamId === teamId)
				.map(fixture => ({
					fixtureId: fixture.fixtureId,

					// result: fixture.homeTeamId === teamId ? fixture.homeTeamResult : fixture.awayTeamResult,
					result:
						fixture.homeTeamId === teamId
							? !fixture.online
								? fixture.homeTeamResult
								: fixtureResultHandler(fixture.online.goalsHome, fixture.online.goalsAway)
							: !fixture.online
								? fixture.awayTeamResult
								: fixtureResultHandler(fixture.online.goalsAway, fixture.online.goalsHome),

					finalScore:
						fixture.homeTeamGoalsFT === null || fixture.awayTeamGoalsFT === null
							? null
							: `${fixture.homeTeamGoalsFT}-${fixture.awayTeamGoalsFT}`,

					online: !fixture.online
						? null
						: {
								...fixture.online,
								onlineResult:
									teamId === fixture.homeTeamId
										? fixtureResultHandler(fixture.online.goalsHome, fixture.online.goalsAway)
										: fixtureResultHandler(fixture.online.goalsAway, fixture.online.goalsHome)
						  },

					status: fixture.statusShort,
					round: fixture.round,
					referee: fixture.referee,
					stadiumId: fixture.stadiumId,
					stadiumName: fixture.stadiumName,
					stadiumCity: fixture.city,
					date: fixture.dateTime,

					isHomeGame: fixture.homeTeamId === teamId,

					opponentId: fixture.homeTeamId === teamId ? fixture.awayTeamId : fixture.homeTeamId,
					opponentTeamNameOriginal:
						fixture.homeTeamId === teamId ? fixture.awayTeamNameOriginal : fixture.homeTeamNameOriginal,
					opponentTeamNameData: fixture.homeTeamId === teamId ? fixture.awayTeamNameData : fixture.homeTeamNameData,
					opponentTeamLogo: fixture.homeTeamId === teamId ? fixture.awayTeamLogo : fixture.homeTeamLogo,
					goalsFor:
						fixture.homeTeamId === teamId
							? !fixture.online
								? fixture.homeTeamGoalsFT
								: fixture.online.goalsHome
							: !fixture.online
								? fixture.awayTeamGoalsFT
								: fixture.online.goalsAway,
					goalsAgainst:
						fixture.homeTeamId === teamId
							? !fixture.online
								? fixture.awayTeamGoalsFT
								: fixture.online.goalsAway
							: !fixture.online
								? fixture.homeTeamGoalsFT
								: fixture.online.goalsHome
				}))
		}

		const expandedData = {
			teamId: baseData.teamId,
			teamNameOriginal: baseData.teamNameOriginal,
			teamNameData: baseData.teamNameData,
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
