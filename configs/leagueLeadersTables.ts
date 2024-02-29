export const basicLeadersTablesConfig = [
	{
		id: 'rank',
		label: {
			en: 'Place',
			ua: 'Місце'
		},
		labelShort: {
			en: '#',
			ua: '#'
		},
		isSortable: true,
		width: 45,
        justifyItems: 'center',
		noMobile: false
		
	},
	{
		id: 'team',
		label: {
			en: 'Player team',
			ua: 'Клуб гравця'
		},
		labelShort: {
			en: 'Team',
			ua: 'Клуб'
		},
		isSortable: false,
		width: 40,
        justifyItems: 'center',
		noMobile: false
	},
	{
		id: 'playerName',
		label: {
			en: 'Player name',
			ua: "Ім'я гравця"
		},
		labelShort: {
			en: 'Player',
			ua: 'Гравець'
		},
		isSortable: false,
		width: 150,
        justifyItems: 'flex-start',
		noMobile: false
	},
	{
		id: 'gamesPlayed',
		label: {
			en: 'Matches played',
			ua: 'Зіграні матчі'
		},
		labelShort: {
			en: 'M',
			ua: 'М'
		},
		isSortable: true,
		width: 55,
        justifyItems: 'center',
		noMobile: false
	},
	{
		id: 'minutesPlayed',
		label: {
			en: "Minutes played",
			ua: 'Хвилин зіграно'
		},
		labelShort: {

			en: "Min's",
			ua: 'Хв'
		},
		isSortable: true,
		width: 65,
        justifyItems: 'center',
		noMobile: false
	}
] as LeagLeadersTableHeadCell[]
