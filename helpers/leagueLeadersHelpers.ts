export const leagueLeadersDataParser = (data: IApiPlayerStatData[]): PlayerLeadersTableData[] => {
	return data.map((item, idx) => ({
		id: item.player.id,
		rank: idx + 1,
		teamName: item.statistics[0].team.name,
		teamLogo: item.statistics[0].team.logo,
		teamId: item.statistics[0].team.id,
		playerName: item.player.name,
		gamesPlayed: item.statistics[0].games.appearences,
		minutesPlayed: item.statistics[0].games.minutes,
		goals: item.statistics[0].goals.total,
		penaltiesGoals: item.statistics[0].penalty.scored ? item.statistics[0].penalty.scored : 0,
		assists: item.statistics[0].goals.assists,
		passes: item.statistics[0].passes.total,
		foulsCommitted: item.statistics[0].fouls.committed,
		yellowCards: item.statistics[0].cards.yellow,
		redCards: item.statistics[0].cards.red,
		yellowRedCards: item.statistics[0].cards.yellowred,

		goalsPerGame: item.statistics[0].goals.total / item.statistics[0].games.appearences,
		assistPerGame: item.statistics[0].goals.assists / item.statistics[0].games.appearences,
		yellowPerGame: item.statistics[0].cards.yellow / item.statistics[0].games.appearences,
		redPerGame: item.statistics[0].cards.red / item.statistics[0].games.appearences,

		minForGoal:
			item.statistics[0].goals.total > 0 ? item.statistics[0].games.minutes / item.statistics[0].goals.total : 0,
		minForAssist:
			item.statistics[0].goals.assists > 0 ? item.statistics[0].games.minutes / item.statistics[0].goals.assists : 0,
		minForYellow:
			item.statistics[0].cards.yellow > 0 ? item.statistics[0].games.minutes / item.statistics[0].cards.yellow : 0,
		minForRed: item.statistics[0].cards.red ? item.statistics[0].games.minutes / item.statistics[0].cards.red : 0
	}))
}

export const tableRowsConfigCreator = (
	basicConfigs: LeagLeadersTableHeadCell[],
	tableType: LeagueLeadersStatsTypes
): LeagLeadersTableHeadCell[] => {
	const configuredArr: LeagLeadersTableHeadCell[] = [
		{
			id:
				tableType === 'goals'
					? 'goals'
					: tableType === 'assists'
					? 'assists'
					: tableType === 'ycards'
					? 'yellowCards'
					: tableType === 'rcards'
					? 'redCards'
					: 'id',
			label: {
				en:
					tableType === 'goals'
						? 'Goals (Penalties)'
						: tableType === 'assists'
						? 'Assists'
						: tableType === 'ycards'
						? 'Yellow Cards'
						: tableType === 'rcards'
						? 'Red Cards'
						: 'id',
				ua:
					tableType === 'goals'
						? 'Голи (Пенальті)'
						: tableType === 'assists'
						? 'Асисти'
						: tableType === 'ycards'
						? 'Жовті Картки'
						: tableType === 'rcards'
						? 'Червоні Картки'
						: 'id'
			},
			labelShort: {
				en:
					tableType === 'goals'
						? 'G(P)'
						: tableType === 'assists'
						? 'A'
						: tableType === 'ycards'
						? 'YC'
						: tableType === 'rcards'
						? 'RC'
						: 'id',
				ua:
					tableType === 'goals'
						? 'Г(П)'
						: tableType === 'assists'
						? 'А'
						: tableType === 'ycards'
						? 'ЖК'
						: tableType === 'rcards'
						? 'ЧК'
						: 'id'
			},
			isSortable: true,
			width: 65,
			justifyItems: 'center',
			noMobile: false
		},
		{
			id:
				tableType === 'goals'
					? 'goalsPerGame'
					: tableType === 'assists'
					? 'assistPerGame'
					: tableType === 'ycards'
					? 'yellowPerGame'
					: tableType === 'rcards'
					? 'redPerGame'
					: 'id',
			label: {
				en:
					tableType === 'goals'
						? 'Goals per Match'
						: tableType === 'assists'
						? 'Assists per Game'
						: tableType === 'ycards'
						? 'Yellow Cards per Game'
						: tableType === 'rcards'
						? 'Red Cards per Game'
						: 'id',
				ua:
					tableType === 'goals'
						? 'Голів за Матч'
						: tableType === 'assists'
						? 'Асистів за Матч'
						: tableType === 'ycards'
						? 'Жовті Картки за Матч'
						: tableType === 'rcards'
						? 'Червоні Картки за Матч'
						: 'id'
			},
			labelShort: {
				en:
					tableType === 'goals'
						? 'GpM'
						: tableType === 'assists'
						? 'ApG'
						: tableType === 'ycards'
						? 'YCpG'
						: tableType === 'rcards'
						? 'RCpG'
						: 'id',
				ua:
					tableType === 'goals'
						? 'Г/М'
						: tableType === 'assists'
						? 'А/М'
						: tableType === 'ycards'
						? 'Ж/М'
						: tableType === 'rcards'
						? 'Ч/М'
						: 'id'
			},
			isSortable: true,
			width: 80,
			justifyItems: 'center',
			noMobile: true
		},
		{
			id:
				tableType === 'goals'
					? 'minForGoal'
					: tableType === 'assists'
					? 'minForAssist'
					: tableType === 'ycards'
					? 'minForYellow'
					: tableType === 'rcards'
					? 'minForRed'
					: 'id',
			label: {
				en:
					tableType === 'goals'
						? 'Minutes per goal'
						: tableType === 'assists'
						? 'Minutes per Assist'
						: tableType === 'ycards'
						? 'Minutes per Yellow Card'
						: tableType === 'rcards'
						? 'Minutes per Red Card'
						: 'id',
				ua:
					tableType === 'goals'
						? 'Хвилин на Гол'
						: tableType === 'assists'
						? 'Хвилин на Асист'
						: tableType === 'ycards'
						? 'Хвилин на Жовту Картку'
						: tableType === 'rcards'
						? 'Хвилин на Червону Картку'
						: 'id'
			},
			labelShort: {
				en:
					tableType === 'goals'
						? 'MpG'
						: tableType === 'assists'
						? 'MpA'
						: tableType === 'ycards'
						? 'MpYC'
						: tableType === 'rcards'
						? 'MpRC'
						: 'id',
				ua:
					tableType === 'goals'
						? 'Хв/Г'
						: tableType === 'assists'
						? 'Хв/А'
						: tableType === 'ycards'
						? 'Хв/Ж'
						: tableType === 'rcards'
						? 'Хв/Ч'
						: 'id'
			},
			isSortable: true,
			width: 80,
			justifyItems: 'center',
			noMobile: true
		}
	]

	return [...basicConfigs, ...configuredArr]
}

export const sortLeadersTableHandler = (
	data: PlayerLeadersTableData[],
	sortField: keyof PlayerLeadersTableData,
	sortingDirection: 'asc' | 'desc'
) => {
	const sortedData = data.sort(function (a, b) {
		if (a[sortField] < b[sortField]) {
			return sortingDirection === 'asc' ? -1 : 1
		}

		if (a[sortField] > b[sortField]) {
			return sortingDirection === 'asc' ? 1 : -1
		}

		return 0
	})

	return sortedData
}
