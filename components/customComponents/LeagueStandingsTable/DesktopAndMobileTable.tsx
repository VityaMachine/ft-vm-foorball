import { useContext, useState } from 'react'
import { useParams } from 'next/navigation'

import Link from 'next/link'
import Image from 'next/image'

import {
	Box,
	TableContainer,
	Table,
	TableRow,
	TableCell,
	Tooltip,
	Typography,
	TableBody,
	IconButton
} from '@mui/material'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import EnchancedTableDataCell from '@/components/ui/EnchancedTableDataCell/EnchancedTableDataCell'

import { styles } from './styles'

import { LanguageContext } from '@/context/LanguageContext'

import { modifiersHandler } from './LeagueStandingsTable.popperModifiers'

import { standingsTableRows } from '@/configs/standingTableConfigs'
import { tournamentsConfigs } from '@/configs/tournaments'

import { sortTableDataHandler } from '@/helpers/leagueStandingsHelpers'

import { StyledTableHead } from './StyledTableHead'

export default function DesktopAndMobileTable({ leagueData }: { leagueData: ITeamResultsFromFixtures[] | null }) {
	const [sortField, setSortField] = useState<keyof ISortingResultsData>('position')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

	const [hoveredTeamRow, setHoveredTeamRow] = useState<null | number>(null)
	const [hoveredOpponentTeam, setHoveredOpponentTeam] = useState<null | number>(null)

	const { language } = useContext(LanguageContext)

	const params = useParams()
	const leagueParams: ILeagueConfig | undefined = tournamentsConfigs.leagues.find(
		league => league.shortName === params.leagueName
	)

	const infoRows = standingsTableRows.filter(item => item.type === 'info')
	const dataRows = standingsTableRows.filter(item => item.type === 'data')

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

	return (
		<>
			{/* position and teamName */}
			<TableContainer sx={styles.infoTableContainer}>
				<Table size="small">
					<StyledTableHead>
						<TableRow>
							{infoRows.map(row => (
								<TableCell key={row.id} padding="none" sx={{ py: '3px' }}>
									<Tooltip
										placement={row.tooltipPos}
										title={
											<Typography sx={{ cursor: 'default' }}>
												{language === 'ua' ? row.content.ua.textLong : row.content.en.textLong}
											</Typography>
										}
										PopperProps={{ ...modifiersHandler(0, -5) }}
										followCursor
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
															(sortDirection === 'asc' && <KeyboardArrowDownIcon sx={styles.tableHeadRowSortIcon} />) ||
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

					<TableBody>
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
															alt={team.teamNameOriginal ? team.teamNameOriginal : ''}
														/>
													</Box>
													<Typography sx={styles.infoTableBodyTeamNameCellBoxText}>{team.teamNameOriginal}</Typography>
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
			<TableContainer sx={styles.dataTableContainer}>
				<Table size="small">
					<StyledTableHead>
						<TableRow>
							{dataRows.map(row => (
								<TableCell key={row.id} padding="none" sx={styles.dataTableHeaderCell(row.isSortable)}>
									<Tooltip
										placement={row.tooltipPos}
										title={
											<Typography>{language === 'ua' ? row.content.ua.textLong : row.content.en.textLong}</Typography>
										}
										PopperProps={{ ...modifiersHandler(0, -5) }}
										followCursor
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
															(sortDirection === 'asc' && <KeyboardArrowDownIcon sx={styles.tableHeadRowSortIcon} />) ||
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
					<TableBody>
						{visibleData.map(
							team =>
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
										}}
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

										<TableCell sx={styles.dataTableDataDesktopCell}>
											<Box sx={styles.dataTableDataDesktopCellBox}>
												{team.prev5.map(item => (
													<Tooltip
														key={item.fixtureId}
														title={
															<Box sx={styles.dataTableDataDesktopCellTooltipBox}>
																<Typography variant="caption">
																	{item.date.toISOString().split('T')[0].split('-').reverse().join('.')}
																</Typography>

																<Typography variant="body2">
																	{item.isHomeGame ? team.teamNameOriginal : item.opponentTeamNameOriginal} -{' '}
																	{!item.isHomeGame ? team.teamNameOriginal : item.opponentTeamNameOriginal}
																</Typography>
																<Typography variant="body2" sx={{ fontWeight: '700' }}>
																	{item.finalScore}
																</Typography>
															</Box>
														}
														placement="top"
														followCursor
													>
														<Link 																onMouseOver={() => setHoveredOpponentTeam(item.opponentId)}
																onMouseLeave={() => {
																	setHoveredOpponentTeam(null)
																}} href={`/fixtures/${item.fixtureId}`} className="flex justify-center items-center">
															<Box
																onMouseOver={() => setHoveredOpponentTeam(item.opponentId)}
																onMouseLeave={() => {
																	setHoveredOpponentTeam(null)
																}}
																sx={{...styles.dataTableLastMatchesDataBox(item.result),
																// transform: `scale(1, 0.5)`,
																// position: 'relative',
																// top: item.result === 'W' ? "-3px" : item.result === 'L' ? "4px" : 0

																}}
															>
																{/* <Typography
																	sx={{
																		position: 'relative',
																		top: '1px'
																	}}
																>
																	<strong>
																		{language === 'ua'
																			? item.result === 'W'
																				? 'В'
																				: item.result === 'D'
																				? 'Н'
																				: 'П'
																			: item.result}
																	</strong>
																</Typography> */}
															</Box>
														</Link>
													</Tooltip>
												))}
											</Box>
										</TableCell>

										<TableCell sx={styles.dataTableDataDesktopCell}>
											<Box sx={styles.dataTableDataDesktopCellBox}>
												{team.next5.map(item => (
													<Tooltip
														key={item.fixtureId}
														title={
															<Box sx={styles.dataTableDataDesktopCellTooltipBox}>
																<Typography variant="caption">
																	{new Date() > item.date ? (language === 'ua' ? "Перенесено" : "Postponed") : item.date.toISOString().split('T')[0].split('-').reverse().join('.')}
																</Typography>
																{/* <Typography variant="caption">
																	{item.date.getHours()<10 ? `0${item.date.getHours()}` : item.date.getHours()}:{item.date.getMinutes()<10 ? `0${item.date.getMinutes()}` : item.date.getMinutes()}
																</Typography> */}

																<Typography variant="body2">
																	{item.isHomeGame ? team.teamNameOriginal : item.opponentTeamNameOriginal} -{' '}
																	{!item.isHomeGame ? team.teamNameOriginal : item.opponentTeamNameOriginal}
																</Typography>
															</Box>
														}
														placement="top"
														followCursor
													>
														<Link href={`/fixtures/${item.fixtureId}`}>
															<Box
																onMouseOver={() => setHoveredOpponentTeam(item.opponentId)}
																onMouseLeave={() => {
																	setHoveredOpponentTeam(null)
																}}
																sx={styles.dataTableNextMatchesImgBox(item.isHomeGame)}
															>
																<Image src={item.opponentTeamLogo} alt={item.opponentTeamNameOriginal} width={23} height={23} />
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
		</>
	)
}
