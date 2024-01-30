import { teamNames } from '@/constants/teamNames'

const fixtureResultHandler = (
	teamForGoals: number | null,
	teamAgainstGoals: number | null
): 'W' | 'D' | 'L' | null => {
	if (teamForGoals === null || teamAgainstGoals === null) {
		return null
	}

	if (typeof teamForGoals === 'number' && typeof teamAgainstGoals === 'number') {
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

	return null
}

export const fixturesDataParser = (
	data: IFixtureData[]
): IFixtureConvertedData[] => {
	return data.map(item => {
		const homeTeamNames = teamNames.find(
			nameItem => nameItem.id === item.teams.home.id
		)
		const awayTeamNames = teamNames.find(
			nameItem => nameItem.id === item.teams.away.id
		)

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
			// roundName: item.league.round.includes('Regular Season') ? `Round - ${item.league.round.split('Regular Season - ')[1]}` : item.league.round,
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
			homeTeamResult: fixtureResultHandler(
				item.score.fulltime.home,
				item.score.fulltime.away
			),

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
			awayTeamResult: fixtureResultHandler(
				item.score.fulltime.away,
				item.score.fulltime.home
			)
		} as IFixtureConvertedData
	})
}

const ptsRsolver = (result: 'W' | 'D' | 'L' | null) => {
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
	const fixturesBase = fixturesDataParser(data)

	const fixtures = fixturesBase.filter(item => item.round.includes('Regular Season'))

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
				.filter(
					fixture => fixture.homeTeamId === teamId || fixture.awayTeamId === teamId
				)
				.map(fixture => ({
					fixtureId: fixture.fixtureId,

					// result: fixture.homeTeamId === teamId ? fixture.homeTeamResult : fixture.awayTeamResult,
					result:
						fixture.homeTeamId === teamId
							? !fixture.online
								? fixture.homeTeamResult
								: fixtureResultHandler(
										fixture.online.goalsHome,
										fixture.online.goalsAway
								  )
							: !fixture.online
							? fixture.awayTeamResult
							: fixtureResultHandler(
									fixture.online.goalsAway,
									fixture.online.goalsHome
							  ),

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
										? fixtureResultHandler(
												fixture.online.goalsHome,
												fixture.online.goalsAway
										  )
										: fixtureResultHandler(
												fixture.online.goalsAway,
												fixture.online.goalsHome
										  )
						  },

					status: fixture.statusShort,
					round: fixture.round,
					referee: fixture.referee,
					stadiumId: fixture.stadiumId,
					stadiumName: fixture.stadiumName,
					stadiumCity: fixture.city,
					date: fixture.dateTime,

					isHomeGame: fixture.homeTeamId === teamId,

					opponentId:
						fixture.homeTeamId === teamId ? fixture.awayTeamId : fixture.homeTeamId,
					opponentTeamNameOriginal:
						fixture.homeTeamId === teamId
							? fixture.awayTeamNameOriginal
							: fixture.homeTeamNameOriginal,
					opponentTeamNameData:
						fixture.homeTeamId === teamId
							? fixture.awayTeamNameData
							: fixture.homeTeamNameData,
					opponentTeamLogo:
						fixture.homeTeamId === teamId
							? fixture.awayTeamLogo
							: fixture.homeTeamLogo,
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
					fixture.goalsFor !== null && fixture.goalsAgainst !== null
						? fixture.goalsFor - fixture.goalsAgainst
						: null
			}))
		}
		return expandedData
	})

	return teamsData
}

const fixturesFilterByMatchStatus = (
	status: selectedMatchesType,
	data: IFixtureConvertedData[]
): IFixtureConvertedData[] | undefined => {
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
	const tomorrowEndDate = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
	const week = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

	if (status === 'all') {
		return data
	}

	if (status === 'NS') {
		return data.filter(
			item =>
				item.statusShort === 'NS' ||
				item.statusShort === 'TBD' ||
				item.statusShort === 'CANC'
		)
	}

	if (status === 'online') {
		return data.filter(
			item =>
				item.statusShort === '1H' ||
				item.statusShort === '2H' ||
				item.statusShort === 'HT'
		)
	}

	if (status === 'FT') {
		return data.filter(item => item.statusShort === 'FT')
	}

	if (status === 'today') {
		return data.filter(
			item =>
				new Date(item.dateTime).getTime() >= today.getTime() &&
				new Date(item.dateTime).getTime() <= tomorrow.getTime()
		)
	}

	if (status === 'tomorrow') {
		return data.filter(
			item =>
				new Date(item.dateTime).getTime() >= tomorrow.getTime() &&
				new Date(item.dateTime).getTime() <= tomorrowEndDate.getTime()
		)
	}

	if (status === 'week') {
		return data.filter(
			item =>
				new Date(item.dateTime).getTime() >= today.getTime() &&
				new Date(item.dateTime).getTime() <= week.getTime()
		)
	}
}

const fixturesFilterByTeamName = (
	teamName: string | 'all',
	data: IFixtureConvertedData[]
): IFixtureConvertedData[] => {
	if (teamName !== 'all') {
		return data.filter(
			item =>
				item.awayTeamNameOriginal === teamName ||
				item.homeTeamNameOriginal === teamName
		)
	} else {
		return data
	}
}

const fixturesFilterBySide = (
	teamName: string,
	side: selectedSideType,
	data: IFixtureConvertedData[]
): IFixtureConvertedData[] => {
	if (side === 'all') {
		return data
	}

	if (side === 'home') {
		return data.filter(item => item.homeTeamNameOriginal === teamName)
	}

	if (side === 'away') {
		return data.filter(item => item.awayTeamNameOriginal === teamName)
	}

	return []
}

export const getTeamNamesFromFixtures = (
	data: IFixtureData[],
	language: LangStateType
) => {
	const teamNames = byTeamsFixturesParser(data).map(team => ({
		teamId: team.teamId,
		teamNameData: team.teamNameData,
		teamNameOriginal: team.teamNameOriginal
	}))

	if (language === 'en') {
		teamNames.sort(function (a, b) {
			if (a.teamNameData && b.teamNameData) {
				if (a.teamNameData.longName.en > b.teamNameData.longName.en) {
					return 1
				}

				if (a.teamNameData.longName.en < b.teamNameData.longName.en) {
					return -1
				}
			}

			return 0
		})
	}

	if (language === 'ua') {
		teamNames.sort(function (a, b) {
			if (a.teamNameData && b.teamNameData) {
				if (a.teamNameData.longName.ua > b.teamNameData.longName.ua) {
					return 1
				}

				if (a.teamNameData.longName.ua < b.teamNameData.longName.ua) {
					return -1
				}
			}

			return 0
		})
	}

	return teamNames
}

export const byRoundsFixturesParser = (
	data: IFixtureData[],
	matchStatus: selectedMatchesType,
	teamName: 'all' | string,
	side: selectedSideType
): IFixturesByRounds[] => {
	const fixtures = fixturesDataParser(data)

	// * DELETE THIS PART, ONLY FOR DEVELOPMENT
	// match online modifier
	// const fixturesBase = fixturesDataParser(data)
	// const fixtureToModif = fixturesBase.find(
	// 	item => item.fixtureId === 1035387
	// ) as IFixtureConvertedData
	// const customOnline = {
	// 	elapsedTime: 75,
	// 	goalsHome: 1,
	// 	goalsAway: 3
	// }
	// const modifiedFixture: IFixtureConvertedData = {
	// 	...fixtureToModif,
	// 	online: customOnline,
	// 	statusShort: '2H'
	// }
	// const fixtures = fixturesBase.map(item =>
	// 	item.fixtureId === 1035387 ? modifiedFixture : item
	// )
	// end modification

	// console.log(fixtFiltByStatus);

	if (matchStatus === 'all' && teamName === 'all') {
		console.log('all filter')

		fixtures.sort((a, b) => a.dateTime - b.dateTime)

		const rounds = fixtures
			.map(item => item.round)
			.filter((v, i, a) => a.indexOf(v) === i)

		const roundsData = rounds.map(item => {
			const roundMatches = fixtures.filter(fixtItem => fixtItem.round === item)
			return {
				roundName: item,
				roundMatches
			}
		})

		return roundsData
	}

	const fixtFiltByName = fixturesFilterByTeamName(
		teamName,
		fixtures
	) as IFixtureConvertedData[]
	const fixtFiltBySide = fixturesFilterBySide(
		teamName,
		side,
		fixtFiltByName
	) as IFixtureConvertedData[]
	const fixtFiltByStatus = fixturesFilterByMatchStatus(matchStatus, fixtFiltBySide)

	if (fixtFiltByStatus) {
		fixtFiltByStatus.sort((a, b) => a.dateTime - b.dateTime)

		const rounds = fixtFiltByStatus
			.map(item => item.round)
			.filter((v, i, a) => a.indexOf(v) === i)

		const roundsData = rounds.map(item => {
			const roundMatches = fixtFiltByStatus.filter(
				fixtItem => fixtItem.round === item
			)
			return {
				roundName: item,
				roundMatches
			}
		})

		return roundsData
	}

	return []
}
