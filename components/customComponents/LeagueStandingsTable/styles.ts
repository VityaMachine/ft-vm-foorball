import { leaguesPlacesColors, tableDataColors } from '@/constants/colors'

export const styles = {
	mainContainer: {
		display: 'flex',
		mt: '35px'
	},

	desktopTabletContainer: {
		display: {
			xs: 'none',
			sm: 'flex'
		},
		width: '100%',
		justifyContent: 'center'
	},

	infoTableContainer: {
		width: 250,
		minWidth: 250,
		overflow: 'hidden'
	},

	infoTableHeadRowContainer: (justifyContent: string) => ({
		display: 'flex',
		justifyContent,
		'&:first-child': {
			pl: '5px'
		},
		width: justifyContent === 'position' ? 69 : justifyContent === 'teamName' ? 185 : 0
	}),

	infoTableHeadRowTextBox: {
		display: 'flex',
		alignItems: 'center'
	},

	tableHeadRowText: {
		fontWeight: '700',
		fontSize: '16px',
		color: '#fff',
		pr: '8px',
		cursor: 'default'
	},

	tableHeadRowSortIconBtn: (sortField: keyof ISortingResultsData, fieldName: keyof ISortingResultsData) => ({
		bgcolor: sortField === fieldName ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'
	}),

	tableHeadRowSortIcon: {
		width: '12px',
		height: '12px',
		fill: '#fff'
	},

	tableBodyRow: {
		height: '40px'
	},

	infoTableBodyTooltipBox: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '250px',
		fontSize: '12px'
	},

	infoTableBodyPlace: (team: ITeamResultsFromFixtures, leagueParams: ILeagueConfig | undefined) => {
		if (!leagueParams) {
			return {}
		}

		const basicSx = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '25px',
			height: '20px',
			borderRadius: '7px',
			backgroundColor: leaguesPlacesColors.default,
			color: '#fff',
			cursor: 'default',
			border: team.leaguePosition === 1 ? '2px solid' : 'none',
			borderColor: team.leaguePosition === 1 ? leaguesPlacesColors.champion : 'none'
		}

		if (leagueParams.placesData.uefaChampLeagueGS.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorUefaChampLeagueGS }
		}

		if (leagueParams.placesData.uefaChampLeagueQ.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorUefaChampLeagueQ }
		}

		if (leagueParams.placesData.uefaEuropaLeagueGS.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorUefaEuropaLeagueGS }
		}

		if (leagueParams.placesData.uefaEuropaLeagueQ.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorUefaEuropaLeagueQ }
		}

		if (leagueParams.placesData.uefaConfLeagueGS.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorUefaConfLeagueGS }
		}

		if (leagueParams.placesData.uefaConfLeagueQ.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorUefaConfLeagueQ }
		}

		if (leagueParams.placesData.relegationPlayOff.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorUelegationPlayOff }
		}

		if (leagueParams.placesData.relegationLeague.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorUelegationLeague }
		}

		return basicSx
	},

	infoTableBodyTeamNameCellBox: {
		display: 'flex',
		flexDirection: 'row',
		'&:hover': {
			textDecoration: 'underline'
		}
	},

	infoTableBodyTeamNameCellBoxText: {
		ml: '10px',
		width: '140px',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	},

	dataTableContainer: {
		width: {
			xs: 465,
			md: 805
		},
		overflowX: 'auto'
	},

	dataTableHeaderCell: (isSortable: boolean) => ({
		py: '3px',
		display: {
			xs: !isSortable ? 'none' : 'table-cell',
			md: 'table-cell'
		}
	}),

	dataTableHeaderCellContainer: (textAlign: string, isSortable: boolean) => ({
		display: 'flex',
		justifyContent: textAlign,
		width: isSortable ? '58px' : '170px'
	}),

	dataTableHeaderCellBox: {
		display: 'flex',
		alignItems: 'center'
	},

	dataTableDataDesktopCell: {
		display: {
			xs: 'none',
			md: 'table-cell'
		}
	},

	dataTableDataDesktopCellBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	dataTableDataDesktopCellTooltipBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	dataTableLastMatchesDataBox: (result: "W" | "D" | "L" | null | undefined) => ({
		color: '#fff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		bgcolor:
			result === 'W'
				? tableDataColors.colorWin
				: result === 'D'
				? tableDataColors.colorDraw
				: result === 'L'
				? tableDataColors.colorLose
				: 'tranparent',
		borderRadius: '50%',
		width: '20px',
		height: '20px',
		cursor: 'default',
		fontWeight: '700',
		':hover': {
			cursor: 'pointer'
		}
	})
}
