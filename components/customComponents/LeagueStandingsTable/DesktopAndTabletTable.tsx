import { useState } from 'react'

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

import { modifiersHandler } from './LeagueStandingsTable.popperModifiers'

import { standingsTableRows } from '@/configs/standingTableConfigs'

import { sortTableDataHandler, isTooltippedPlace } from '@/helpers/leagueStandingsHelpers'

import { StyledTableHead } from './StyledTableHead'

import OnlineScoreCell from './OnlineScoreCell'

export default function DesktopAndTabletTable({
	leagueData,
	language,
	leagueParams
}: {
	leagueData: ITeamResultsFromFixtures[] | null
	language: LangStateType
	leagueParams: ILeagueConfig | undefined
}) {
	const [sortField, setSortField] = useState<keyof ISortingResultsData>('position')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

	const [hoveredTeamRow, setHoveredTeamRow] = useState<null | number>(null)
	const [hoveredOpponentTeam, setHoveredOpponentTeam] = useState<null | number>(null)

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
											<Link href={`/team/${team.teamId}`}>
												<Box sx={styles.infoTableBodyTeamNameCellBox}>
													<Box>
														<Image
															src={team.teamLogo}
															width={25}
															height={25}
															alt={team.teamNameOriginal}
															className="w-[25px] h-[25px] object-contain"
														/>
													</Box>
													<Typography sx={styles.infoTableBodyTeamNameCellBoxText}>
														{team.teamNameData
															? language === 'ua'
																? team.teamNameData.longName.ua
																: team.teamNameData.longName.en
															: team.teamNameOriginal}
													</Typography>
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
							<TableCell
								sx={{
									display: {
										xs: 'none',
										md: 'table-cell'
									}
								}}
							></TableCell>
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
										<TableCell
											sx={{
												display: {
													xs: 'none',
													md: 'table-cell'
												}
											}}
										>
											<OnlineScoreCell team={team} language={language} setOpponentHover={setHoveredOpponentTeam} />
										</TableCell>

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
																	{item.isHomeGame
																		? team.teamNameData
																			? language === 'ua'
																				? team.teamNameData.longName.ua
																				: team.teamNameData.longName.en
																			: team.teamNameOriginal
																		: item.opponentTeamNameData
																		? language === 'ua'
																			? item.opponentTeamNameData.longName.ua
																			: item.opponentTeamNameData.longName.en
																		: item.opponentTeamNameOriginal}{' '}
																	-{' '}
																	{!item.isHomeGame
																		? team.teamNameData
																			? language === 'ua'
																				? team.teamNameData.longName.ua
																				: team.teamNameData.longName.en
																			: team.teamNameOriginal
																		: item.opponentTeamNameData
																		? language === 'ua'
																			? item.opponentTeamNameData.longName.ua
																			: item.opponentTeamNameData.longName.en
																		: item.opponentTeamNameOriginal}
																</Typography>
																<Typography variant="body2" sx={{ fontWeight: '700' }}>
																	{item.finalScore}
																</Typography>
															</Box>
														}
														placement="top"
														followCursor
													>
														<Link
															onMouseOver={() => setHoveredOpponentTeam(item.opponentId)}
															onMouseLeave={() => {
																setHoveredOpponentTeam(null)
															}}
															href={`/fixture/${item.fixtureId}`}
															className="flex justify-center items-center"
														>
															<Box
																sx={{
																	...styles.dataTableLastMatchesDataBox(item.result)
																}}
															></Box>
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
																	{new Date() > item.date
																		? language === 'ua'
																			? 'Перенесено'
																			: 'Postponed'
																		: item.date.toISOString().split('T')[0].split('-').reverse().join('.')}
																</Typography>

																<Typography variant="body2">
																	{item.isHomeGame
																		? team.teamNameData
																			? language === 'ua'
																				? team.teamNameData.longName.ua
																				: team.teamNameData.longName.en
																			: team.teamNameOriginal
																		: item.opponentTeamNameData
																		? language === 'ua'
																			? item.opponentTeamNameData.longName.ua
																			: item.opponentTeamNameData.longName.en
																		: item.opponentTeamNameOriginal}{' '}
																	-{' '}
																	{!item.isHomeGame
																		? team.teamNameData
																			? language === 'ua'
																				? team.teamNameData.longName.ua
																				: team.teamNameData.longName.en
																			: team.teamNameOriginal
																		: item.opponentTeamNameData
																		? language === 'ua'
																			? item.opponentTeamNameData.longName.ua
																			: item.opponentTeamNameData.longName.en
																		: item.opponentTeamNameOriginal}
																</Typography>
															</Box>
														}
														placement="top"
														followCursor
													>
														<Link
															href={`/fixture/${item.fixtureId}`}
															onMouseOver={() => setHoveredOpponentTeam(item.opponentId)}
															onMouseLeave={() => {
																setHoveredOpponentTeam(null)
															}}
														>
															<Box sx={styles.dataTableNextMatchesImgBox(item.isHomeGame)}>
																<Image
																	src={item.opponentTeamLogo}
																	alt={item.opponentTeamNameOriginal}
																	// objectFit="contain"
																	width={23}
																	height={23}
																	className="w-[23px] h-[23px] object-contain"
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
		</>
	)
}
