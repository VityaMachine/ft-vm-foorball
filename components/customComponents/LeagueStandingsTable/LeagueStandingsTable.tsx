'use client'

import { useContext, useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import {
	Box,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Tooltip,
	Typography,
	TableBody,
	IconButton
} from '@mui/material'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { styled } from '@mui/material/styles'

import { LanguageContext } from '@/context/LanguageContext'
import { CustomThemeContext } from '@/context/CustomThemeContext'

import EnchancedTableDataCell from '@/components/ui/EnchancedTableDataCell/EnchancedTableDataCell'

import { sortTableDataHandler } from '@/helpers/leagueStandingsHelpers'

import { standingsTableRows } from '@/configs/standingTableConfigs'
import { tournamentsConfigs } from '@/configs/tournaments'
import { leaguesPlacesColors, tableDataColors } from '@/constants/colors'

import { red, amber, lightBlue } from '@mui/material/colors'

const StyledTableHead = styled(TableHead)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#374551' : '#1565C0'
}))

import { styles } from './styles'
import { modifiersHandler } from './LeagueStandingsTable.popperModifiers'

export default function LeagueStandingsTable({ leagueData }: { leagueData: ITeamResultsFromFixtures[] | null }) {
	const [sortField, setSortField] = useState<keyof ISortingResultsData>('position')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

	const [hoveredTeamRow, setHoveredTeamRow] = useState<null | number>(null)
	const [hoveredOpponentTeam, setHoveredOpponentTeam] = useState<null | number>(null)

	// const [stikyTableHeader, setStikyTableHeader] = useState<boolean>(false)
	// const [stickyHeadScrollData, setStickyHeadScrollData] = useState<number>(0)
	const params = useParams()
	const leagueParams: ILeagueConfig | undefined = tournamentsConfigs.leagues.find(
		league => league.shortName === params.leagueName
	)

	const { language } = useContext(LanguageContext)
	// const { isDarkMode } = useContext(CustomThemeContext)

	// table sticky header
	// useEffect(() => {
	// 	const sizePosCheckHandler = () => {
	// 		const headRowInfo = document.querySelector('.table-head-info')
	// 		const firstRowInfo = document.querySelector('.data-table-row-info')

	// 		// const tableDataHead = document.querySelector('.table-head-data')
	// 		// const tableDataBody = document.querySelector('.table-body-data')

	// 		if (firstRowInfo) {
	// 			if (window.innerWidth >= 900 && firstRowInfo.getBoundingClientRect().y <= 123) {
	// 				setStikyTableHeader(true)
	// 			} else if (window.innerWidth >= 900 && firstRowInfo.getBoundingClientRect().y > 123) {
	// 				setStikyTableHeader(false)
	// 			}

	// 			if (window.innerWidth < 900 && firstRowInfo.getBoundingClientRect().y <= 88) {
	// 				setStikyTableHeader(true)
	// 			} else if (window.innerWidth < 900 && firstRowInfo.getBoundingClientRect().y > 88) {
	// 				setStikyTableHeader(false)
	// 			}
	// 		}
	// 	}

	// 	window.addEventListener('scroll', sizePosCheckHandler)

	// 	return () => {
	// 		window.removeEventListener('scroll', sizePosCheckHandler)
	// 	}
	// }, [])

	const sortTableHandler = (sortRow: keyof ISortingResultsData) => {
		if (sortRow === sortField) {
			setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'))
		}
		if (sortRow !== sortField) {
			setSortField(sortRow)
			setSortDirection(() => {
				return ['position', 'teamName'].includes(sortRow) ? 'asc' : 'desc'
			})
		}
	}

	const visibleData = leagueData ? sortTableDataHandler(leagueData, sortField, sortDirection) : []

	const infoRows = standingsTableRows.filter(item => item.type === 'info')
	const dataRows = standingsTableRows.filter(item => item.type === 'data')

	const isTooltippedPlace = (team: ITeamResultsFromFixtures, leagueParams: ILeagueConfig | undefined) => {
		if (!leagueParams) {
			return false
		}
		if (
			team.leaguePosition === 1 ||
			leagueParams.placesData.uefaChampLeagueGS.includes(team.leaguePosition) ||
			leagueParams.placesData.uefaChampLeagueQ.includes(team.leaguePosition) ||
			leagueParams.placesData.uefaEuropaLeagueGS.includes(team.leaguePosition) ||
			leagueParams.placesData.uefaEuropaLeagueQ.includes(team.leaguePosition) ||
			leagueParams.placesData.uefaConfLeagueGS.includes(team.leaguePosition) ||
			leagueParams.placesData.uefaConfLeagueQ.includes(team.leaguePosition) ||
			leagueParams.placesData.relegationPlayOff.includes(team.leaguePosition) ||
			leagueParams.placesData.relegationLeague.includes(team.leaguePosition)
		) {
			return true
		}

		return false
	}

	const placeTooltipTextHandler = (team: ITeamResultsFromFixtures, leagueParams: ILeagueConfig | undefined) => {
		if (!leagueParams) {
			return
		}

		const {
			uefaChampLeagueGS,
			uefaChampLeagueQ,
			uefaEuropaLeagueGS,
			uefaEuropaLeagueQ,
			uefaConfLeagueGS,
			uefaConfLeagueQ,
			relegationPlayOff,
			relegationLeague
		} = leagueParams.placesData

		if (uefaChampLeagueGS.includes(team.leaguePosition)) {
			return language === 'ua' ? 'Ліга Чемпіонів УЄФА (Груповий етап)' : 'UEFA Champions League (Group stage)'
		}

		if (uefaChampLeagueQ.includes(team.leaguePosition)) {
			return language === 'ua' ? 'Ліга Чемпіонів УЄФА (Кваліфікація)' : 'UEFA Champions League (Qualifying round)'
		}

		if (uefaEuropaLeagueGS.includes(team.leaguePosition)) {
			return language === 'ua' ? 'Ліга Європи УЄФА (Груповий етап)' : 'UEFA Europa League (Group stage)'
		}

		if (uefaEuropaLeagueQ.includes(team.leaguePosition)) {
			return language === 'ua' ? 'Ліга Європи УЄФА (Кваліфікація)' : 'UEFA Europa League (Qualifying round)'
		}

		if (uefaConfLeagueGS.includes(team.leaguePosition)) {
			return language === 'ua' ? 'Ліга Конференцій УЄФА (Груповий етап)' : 'UEFA Europa Conference League (Group stage)'
		}

		if (uefaConfLeagueQ.includes(team.leaguePosition)) {
			return language === 'ua'
				? 'Ліга Конференцій УЄФА (Кваліфікація)'
				: 'UEFA Europa Conference League (Qualifying round)'
		}

		if (uefaConfLeagueQ.includes(team.leaguePosition)) {
			return language === 'ua'
				? 'Ліга Конференцій УЄФА (Кваліфікація)'
				: 'UEFA Europa Conference League (Qualifying round)'
		}

		if (relegationPlayOff.includes(team.leaguePosition)) {
			return language === 'ua' ? 'Пониження (Раунд плей-офф)' : 'Relegation (Play-off)'
		}

		if (relegationLeague.includes(team.leaguePosition)) {
			return language === 'ua' ? 'Пониження' : 'Relegation'
		}
	}

	// console.log(isDarkMode)

	// const stikyTableHeaderSX = () =>
	// 	stikyTableHeader
	// 		? {
	// 				position: 'fixed',
	// 				top: {
	// 					xs: '56px',
	// 					md: '90px'
	// 				},
	// 				zIndex: 999
	// 		  }
	// 		: {}

	// const stickyTableFirstRowSX = () =>
	// 	stikyTableHeader
	// 		? {
	// 				position: stikyTableHeader && 'relative',
	// 				top: stikyTableHeader && 35
	// 		  }
	// 		: {}

	// const scrolledTableDataHead = (scrollLeft: number) =>
	// 	stikyTableHeader && scrollLeft > 0
	// 		? {
	// 				position: 'relative',
	// 				left: -scrollLeft
	// 		  }
	// 		: {}

	return (
		<Box sx={styles.mainContainer}>
			{/* desktop and tablet */}
			<Box sx={styles.desktopTabletContainer}>
				{/* info */}
				<TableContainer sx={styles.infoTableContainer}>
					<Table size="small">
						<StyledTableHead
						// sx={() => stikyTableHeaderSX()}
						>
							<TableRow
							// className="table-head-info"
							>
								{infoRows.map(row => (
									<TableCell key={row.id} padding="none" sx={{ py: '3px' }}>
										<Tooltip
											placement={row.tooltipPos}
											title={
												<Typography sx={{ cursor: 'default' }}>
													{language === 'ua' ? row.content.ua.textLong : row.content.en.textLong}
												</Typography>
											}
											PopperProps={{ ...modifiersHandler(0, -10) }}
										>
											<Box sx={styles.infoTableHeadRowContainer(row.textAlign)}>
												<Box sx={styles.infoTableHeadRowTextBox}>
													<Typography variant="h6" sx={styles.tableHeadRowText}>
														{language === 'ua' ? row.content.ua.textShort : row.content.en.textShort}
													</Typography>
													{row.isSortable && (
														<IconButton
															size="small"
															sx={styles.tableHeadRowSortIconBtn(sortField, row.fieldName)}
															onClick={() => sortTableHandler(row.fieldName)}
														>
															{sortField === row.fieldName ? (
																(sortDirection === 'asc' && (
																	<KeyboardArrowDownIcon sx={styles.tableHeadRowSortIcon} />
																)) ||
																(sortDirection === 'desc' && <KeyboardArrowUpIcon sx={styles.tableHeadRowSortIcon} />)
															) : (
																<KeyboardArrowDownIcon sx={styles.tableHeadRowSortIcon} />
															)}
														</IconButton>
													)}
												</Box>
											</Box>
										</Tooltip>
									</TableCell>
								))}
							</TableRow>
						</StyledTableHead>

						<TableBody
						// sx={stickyTableFirstRowSX}
						>
							{visibleData.map(
								(team, idx) =>
									team && (
										<TableRow
											sx={{
												...styles.tableBodyRow,
												bgcolor:
													hoveredTeamRow &&
													hoveredOpponentTeam &&
													(hoveredOpponentTeam === team.teamId || hoveredTeamRow === team.teamId
														? 'rgba(150, 190, 240, 0.4)'
														: 'transparent')
											}}
											key={team.teamId}
											// selected={hoveredTeamRow && hoveredOpponentTeam && hoveredTeamRow === team.teamId || hoveredOpponentTeam === team.teamId ? true : false}

											// hover={true}
											// selected
											// className={idx === 0 ? 'data-table-row-info' : ''}
										>
											<TableCell width={69}>
												{isTooltippedPlace(team, leagueParams) ? (
													<Tooltip
														placement="right-start"
														followCursor
														PopperProps={{ ...modifiersHandler(-25, 0) }}
														title={
															<Box sx={styles.infoTableBodyTooltipBox}>
																{team.leaguePosition === 1 && (
																	<Typography variant="caption">
																		{language === 'ua' ? 'Чемпіонська позиція' : 'Champion position'}
																	</Typography>
																)}
																{placeTooltipTextHandler(team, leagueParams)}
															</Box>
														}
													>
														<Box sx={styles.infoTableBodyPlace(team, leagueParams)}>{team.leaguePosition}</Box>
													</Tooltip>
												) : (
													<Box sx={styles.infoTableBodyPlace(team, leagueParams)}>{team.leaguePosition}</Box>
												)}
											</TableCell>

											<TableCell padding="none" width={185}>
												<Link href={`/teams/${team.teamId}`}>
													<Box sx={styles.infoTableBodyTeamNameCellBox}>
														<Box>
															<Image
																src={team.teamLogo ? team.teamLogo : ''}
																width={25}
																height={25}
																alt={team.teamName ? team.teamName : ''}
															/>
														</Box>
														<Typography sx={styles.infoTableBodyTeamNameCellBoxText}>{team.teamName}</Typography>
													</Box>
												</Link>
											</TableCell>
										</TableRow>
									)
							)}
						</TableBody>
					</Table>
				</TableContainer>

				{/* data */}
				<TableContainer
					sx={styles.dataTableContainer}
					// onScroll={e => {
					// 	setStickyHeadScrollData(e.target.scrollLeft)
					// }}
				>
					<Table size="small">
						<StyledTableHead
						// sx={() => stikyTableHeaderSX()}
						>
							<TableRow
							// className="table-head-data"
							// sx={() => scrolledTableDataHead(stickyHeadScrollData)}
							>
								{dataRows.map(row => (
									<TableCell key={row.id} padding="none" sx={styles.dataTableHeaderCell(row.isSortable)}>
										<Tooltip
											placement={row.tooltipPos}
											title={
												<Typography>{language === 'ua' ? row.content.ua.textLong : row.content.en.textLong}</Typography>
											}
											PopperProps={{ ...modifiersHandler(0, -10) }}
										>
											<Box sx={styles.dataTableHeaderCellContainer(row.textAlign, row.isSortable)}>
												<Box sx={styles.dataTableHeaderCellBox}>
													<Typography variant="h6" sx={styles.tableHeadRowText}>
														{language === 'ua' ? row.content.ua.textShort : row.content.en.textShort}
													</Typography>
													{row.isSortable && (
														<IconButton
															size="small"
															sx={styles.tableHeadRowSortIconBtn(sortField, row.fieldName)}
															onClick={() => sortTableHandler(row.fieldName)}
														>
															{sortField === row.fieldName ? (
																(sortDirection === 'asc' && (
																	<KeyboardArrowDownIcon sx={styles.tableHeadRowSortIcon} />
																)) ||
																(sortDirection === 'desc' && <KeyboardArrowUpIcon sx={styles.tableHeadRowSortIcon} />)
															) : (
																<KeyboardArrowDownIcon
																	sx={{
																		width: '12px',
																		height: '12px',
																		fill: '#fff'
																	}}
																/>
															)}
														</IconButton>
													)}
												</Box>
											</Box>
										</Tooltip>
									</TableCell>
								))}
							</TableRow>
						</StyledTableHead>
						<TableBody
						// sx={stickyTableFirstRowSX} className="table-body-data"
						>
							{visibleData.map(
								(team, idx) =>
									team && (
										<TableRow
											sx={{
												...styles.tableBodyRow,
												bgcolor:
													hoveredTeamRow &&
													hoveredOpponentTeam &&
													(hoveredTeamRow === team.teamId || hoveredOpponentTeam === team.teamId
														? 'rgba(150, 190, 240, 0.4)'
														: 'transparent')
												// ...stickyTableFirstRowSX()
											}}
											// selected={hoveredTeamRow && hoveredOpponentTeam && hoveredTeamRow === team.teamId || hoveredOpponentTeam === team.teamId ? true : false}
											key={team.teamId}
											onMouseOver={() => setHoveredTeamRow(team.teamId ? team.teamId : null)}
											onMouseLeave={() => setHoveredTeamRow(null)}
										>
											<EnchancedTableDataCell team={team} field="games" toolTipvalue="finalScore" />

											<EnchancedTableDataCell team={team} field="win" toolTipvalue="finalScore" />

											<EnchancedTableDataCell team={team} field="draw" toolTipvalue="finalScore" />

											<EnchancedTableDataCell team={team} field="lose" toolTipvalue="finalScore" />

											<EnchancedTableDataCell team={team} field="goalsFor" toolTipvalue="goalsFor" />

											<EnchancedTableDataCell team={team} field="goalsAgainst" toolTipvalue="goalsAgainst" />

											<EnchancedTableDataCell team={team} field="goalsDiff" toolTipvalue="goalsDiff" />

											<EnchancedTableDataCell team={team} field="points" toolTipvalue="points" />

											<TableCell
												sx={styles.dataTableDataDesktopCell}
											>
												<Box
													sx={styles.dataTableDataDesktopCellBox}
												>
													{team.prev5.map(item => (
														<Tooltip
															key={item.fixtureId}
															title={
																<Box sx={styles.dataTableDataDesktopCellTooltipBox}>
																	<Typography variant="caption">
																		{item.date.toISOString().split('T')[0].split('-').reverse().join('.')}
																	</Typography>

																	<Typography variant="body2">
																		{item.isHomeGame ? team.teamName : item.opponentTeamName} -{' '}
																		{!item.isHomeGame ? team.teamName : item.opponentTeamName}
																	</Typography>
																	<Typography variant="body2" sx={{ fontWeight: '700' }}>
																		{item.finalScore}
																	</Typography>
																</Box>
															}
															placement="top"
															followCursor
															// leaveDelay={1000000}
														>
															<Link href={`/fixtures/${item.fixtureId}`}>
																<Box
																	onMouseOver={() => setHoveredOpponentTeam(item.opponentId)}
																	onMouseLeave={() => {
																		setHoveredOpponentTeam(null)
																	}}
																	sx={styles.dataTableLastMatchesDataBox(item.result)}
																>
																	{language === 'ua'
																		? item.result === 'W'
																			? 'В'
																			: item.result === 'D'
																			? 'Н'
																			: 'П'
																		: item.result}
																</Box>
															</Link>
														</Tooltip>
													))}
												</Box>
											</TableCell>

											<TableCell
												sx={{
													display: {
														xs: 'none',
														md: 'table-cell'
													}
												}}
											>
												<Box
													sx={{
														display: 'flex',
														justifyContent: 'space-between'
													}}
												>
													{team.next5.map(item => (
														<Tooltip
															key={item.fixtureId}
															title={
																<Box
																	sx={{
																		display: 'flex',
																		flexDirection: 'column',
																		alignItems: 'center'
																	}}
																>
																	<Typography variant="caption">
																		{item.date.toISOString().split('T')[0].split('-').reverse().join('.')}
																	</Typography>

																	<Typography variant="body2">
																		{item.isHomeGame ? team.teamName : item.opponentTeamName} -{' '}
																		{!item.isHomeGame ? team.teamName : item.opponentTeamName}
																	</Typography>
																	<Typography variant="body2" sx={{ fontWeight: '700' }}>
																		{item.finalScore}
																	</Typography>
																</Box>
															}
															placement="top"
															followCursor
															// leaveDelay={1000000}
														>
															<Link href={`/fixtures/${item.fixtureId}`}>
																<Box
																	onMouseOver={() => setHoveredOpponentTeam(item.opponentId)}
																	onMouseLeave={() => {
																		setHoveredOpponentTeam(null)
																	}}
																	sx={{
																		color: '#fff',
																		display: 'flex',
																		justifyContent: 'center',
																		alignItems: 'center',
																		// borderRadius: '50%',
																		cursor: 'pointer',
																		borderBottom: `3px solid ${
																			item.isHomeGame ? tableDataColors.colorHome : tableDataColors.colorAway
																		}`
																	}}
																>
																	<Image
																		src={item.opponentTeamLogo}
																		alt={item.opponentTeamName}
																		width={23}
																		height={23}
																	/>
																</Box>
															</Link>
														</Tooltip>
													))}
												</Box>
											</TableCell>
										</TableRow>
									)
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			{/* new table */}
		</Box>
	)
}
