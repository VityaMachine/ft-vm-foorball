export const basicLeadersTablesConfig = [
    {
        id: 'rank' as keyof LeagLeadersTableHeadCell,
        numeric: true,
		disablePadding: false,
		label: '#',
		isSortable: false
    },
    {
        id: 'teamName' as keyof LeagLeadersTableHeadCell,
        numeric: false,
		disablePadding: false,
		label: 'Team',
		isSortable: false
    },
    {
        id: 'playerName' as keyof LeagLeadersTableHeadCell,
        numeric: false,
		disablePadding: false,
		label: 'Player',
		isSortable: false
    },
    {
        id: 'gamesPlayed' as keyof LeagLeadersTableHeadCell,
        numeric: true,
		disablePadding: true,
		label: 'Games',
		isSortable: true
    },
    {
        id: 'minutesPlayed' as keyof LeagLeadersTableHeadCell,
        numeric: true,
		disablePadding: true,
		label: "Min's played",
		isSortable: true
    },
] as LeagLeadersTableHeadCell[]