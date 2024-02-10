export const leagueLeadersDataParser = (
	data: IApiPlayerStatData[]
): PlayerLeadersTableData[] => {
	return data.map((item, idx) => ({
		id: item.player.id,
		rank: idx + 1,
		teamName: item.statistics[0].team.name,
		teamLogo: item.statistics[0].team.logo,
		playerName: item.player.name,
		gamesPlayed: item.statistics[0].games.appearences,
		minutesPlayed: item.statistics[0].games.minutes,
		goals: item.statistics[0].goals.total,
		penaltiesGoals: item.statistics[0].penalty.scored
			? item.statistics[0].penalty.scored
			: 0,
		assists: item.statistics[0].goals.assists,
		passes: item.statistics[0].passes.total,
		foulsCommitted: item.statistics[0].fouls.committed,
		yellowCards: item.statistics[0].cards.yellow,
		redCards: item.statistics[0].cards.red,
		yellowRedCards: item.statistics[0].cards.yellowred,

		goalsPerGame:
			item.statistics[0].goals.total / item.statistics[0].games.appearences,
		assistPerGame:
			item.statistics[0].goals.assists / item.statistics[0].games.appearences,
		yellowPerGame:
			item.statistics[0].cards.yellow / item.statistics[0].games.appearences,
		redPerGame: item.statistics[0].cards.red / item.statistics[0].games.appearences,

		minForGoal:
			item.statistics[0].goals.total > 0
				? item.statistics[0].games.minutes / item.statistics[0].goals.total
				: 0,
		minForAssist:
			item.statistics[0].goals.assists > 0
				? item.statistics[0].games.minutes / item.statistics[0].goals.assists
				: 0,
		minForYellow:
			item.statistics[0].cards.yellow > 0
				? item.statistics[0].games.minutes / item.statistics[0].cards.yellow
				: 0,
		minForRed: item.statistics[0].cards.red
			? item.statistics[0].games.minutes / item.statistics[0].cards.red
			: 0
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
			numeric: true,
			disablePadding: true,
			label:
				tableType === 'goals'
					? 'Goals (Pen.)'
					: tableType === 'assists'
					? 'Assists'
					: tableType === 'ycards' || tableType === 'rcards'
					? 'Cards'
					: 'id',
			isSortable: true
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
			numeric: true,
			disablePadding: true,
			label:
				tableType === 'goals'
					? 'GpG'
					: tableType === 'assists'
					? 'ApG'
					: tableType === 'ycards'
					? 'YCpG'
					: tableType === 'rcards'
					? 'RCpG'
					: 'id',
			isSortable: true
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
			numeric: true,
			disablePadding: true,
			label:
				tableType === 'goals'
					? 'MpG'
					: tableType === 'assists'
					? 'MpA'
					: tableType === 'ycards'
					? 'MpYC'
					: tableType === 'rcards'
					? 'MpRC'
					: 'id',
			isSortable: true
		}
	]

	return [...basicConfigs, ...configuredArr]
}
