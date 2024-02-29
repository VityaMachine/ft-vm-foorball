import { leaguesPlacesColors, tableDataColors } from '@/constants/colors'

export const styles = {
	mainContainer: {
		display: 'flex',
		// mt: '35px',
		flexDirection: 'column'
		// overflow: 'auto'
	},

	desktopTabletContainer: {
		display: {
			xs: 'none',
			md: 'flex'
		},
		width: '100%',
		justifyContent: 'center',
		flexDirection: 'column'
	},

	infoTableContainer: {
		width: 265,
		minWidth: 265,
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
		cursor: 'default',
		textUnderlineOffset: '4px', 
		textDecoration: 'underline', 
		":hover": {
			textDecoration: 'none'
		}
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
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorRelegationPlayOff }
		}

		if (leagueParams.placesData.relegationLeague.includes(team.leaguePosition)) {
			return { ...basicSx, backgroundColor: leaguesPlacesColors.colorRelegationLeague }
		}

		return basicSx
	},

	infoTableBodyTeamNameCellBox: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'&:hover': {
			textDecoration: 'underline'
		}
	},

	infoTableBodyTeamNameCellBoxText: {
		ml: '10px',
		width: '160px',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	},

	dataTableContainer: {
		width: {
			xs: 523,
			md: 870
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
		justifyContent: 'space-between'
	},

	dataTableDataDesktopCellTooltipBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	dataTableLastMatchesDataBox: (result: 'W' | 'D' | 'L' | null | undefined) => ({
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
		// borderRadius: '5px',
		width: '20px',
		height: '20px',
		cursor: 'pointer'
	}),

	dataTableNextMatchesImgBox: (isHomeGame: boolean) => ({
		color: '#fff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		borderBottom: `3px solid ${isHomeGame ? tableDataColors.colorHome : tableDataColors.colorAway}`
		// width: '23px',
		// height: "23px"
	}),

	// Mobile

	mobileContainer: {
		display: {
			xs: 'flex',
			md: 'none'
		}
	},

	mobileHeadCell: {
		fontWeight: 700,
		color: '#fff',
		whiteSpace: 'nowrap'
	},

	mobileTableLegendBox: {
		px: '24px',
		mt: '16px'
	},

	mobileLegendTitle: {
		fontWeight: 700,
		fontSize: '16px'
	},

	mobileLegendRow: {
		display: 'flex',
	},

	mobileLegendRowTitle: {
		fontWeight: 700
	},

	// Descr component
	descrBox: (color: 'CLGS' | 'CLQ' | 'UELGS' | 'UELQ' | 'CELGS' | 'CELQ' | 'RP' | 'R') => ({
		minWidth: '20px',
		minHeight: '20px',
		maxWidth: '20px',
		maxHeight: '20px',
		borderRadius: '5px',
		bgcolor:
			color === 'CLGS'
				? leaguesPlacesColors.colorUefaChampLeagueGS
				: color === 'CLQ'
				? leaguesPlacesColors.colorUefaChampLeagueQ
				: color === 'UELGS'
				? leaguesPlacesColors.colorUefaEuropaLeagueGS
				: color === 'UELQ'
				? leaguesPlacesColors.colorUefaEuropaLeagueQ
				: color === 'CELGS'
				? leaguesPlacesColors.colorUefaConfLeagueGS
				: color === 'CELQ'
				? leaguesPlacesColors.colorUefaConfLeagueQ
				: color === 'RP'
				? leaguesPlacesColors.colorRelegationPlayOff
				: color === 'R'
				? leaguesPlacesColors.colorRelegationLeague
				: 'transparent'
	})
}
