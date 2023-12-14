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

import EnchancedTableDataCell from '@/components/ui/EnchancedTableDataCell/EnchancedTableDataCell'

import { sortTableDataHandler } from '@/helpers/leagueStandingsHelpers'

import { standingsTableRows } from '@/configs/standingTableConfigs'
import { tournamentsConfigs } from '@/configs/tournaments'
import { leaguesPlacesColors } from '@/constants/colors'

const StyledTableHead = styled(TableHead)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#374551' : '#1565C0'
}))

export default function LeagueStandingsTable({ leagueData }: { leagueData: ITeamResultsFromFixtures[] | null }) {
	const [sortField, setSortField] = useState<keyof ISortingResultsData>('position')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
	// const [stikyTableHeader, setStikyTableHeader] = useState<boolean>(false)
	// const [stickyHeadScrollData, setStickyHeadScrollData] = useState<number>(0)
	const params = useParams()
	const leagueParams: ILeagueConfig | undefined = tournamentsConfigs.leagues.find(
		league => league.shortName === params.leagueName
	)

	const { language } = useContext(LanguageContext)

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

	const placeBgColorHandler = (team: ITeamResultsFromFixtures, leagueParams: ILeagueConfig | undefined) => {
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
	}

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

	console.log(leagueData);
	

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
		<Box
			sx={{
				display: 'flex',
				mt: '35px'
			}}
		>
			{/* desktop and tablet */}
			<Box
				sx={{
					display: {
						xs: 'none',
						sm: 'flex'
					},
					width: '100%',
					justifyContent: 'center'
				}}
			>
				{/* info */}
				<TableContainer
					sx={{
						width: 250,
						minWidth: 250,
						overflow: 'hidden'
					}}
				>
					<Table
						size="small"
						sx={{
							position: 'relative'
						}}
					>
						<StyledTableHead
							// sx={() => stikyTableHeaderSX()}
							sx={{
								position: 'sticky',
								top: 0
							}}
						>
							<TableRow
								className="table-head-info"
								sx={{
									position: 'relative',
									zIndex: 99,
									overflow: 'hidden'
								}}
							>
								{infoRows.map(row => (
									<TableCell key={row.id} padding="none" sx={{ py: '3px' }}>
										<Tooltip
											placement={row.tooltipPos}
											title={
												<Typography
													sx={{
														cursor: 'default'
													}}
												>
													{language === 'ua' ? row.content.ua.textLong : row.content.en.textLong}
												</Typography>
											}
											PopperProps={{
												modifiers: [
													{
														name: 'offset',
														options: {
															offset: [0, -6]
														}
													}
												]
											}}
										>
											<Box
												sx={{
													display: 'flex',
													justifyContent: row.textAlign,
													'&:first-child': {
														pl: '5px'
													},
													width: row.fieldName === 'position' ? 69 : row.fieldName === 'teamName' ? 185 : 0
												}}
											>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center'
													}}
												>
													<Typography
														variant="h6"
														sx={{
															fontWeight: '700',
															fontSize: '16px',
															color: '#fff',
															pr: '8px',
															cursor: 'default'
														}}
													>
														{language === 'ua' ? row.content.ua.textShort : row.content.en.textShort}
													</Typography>
													{row.isSortable && (
														<IconButton
															size="small"
															sx={{
																bgcolor: sortField === row.fieldName ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'
															}}
															onClick={() => sortTableHandler(row.fieldName)}
														>
															{sortField === row.fieldName ? (
																(sortDirection === 'asc' && (
																	<KeyboardArrowDownIcon
																		sx={{
																			width: '12px',
																			height: '12px',
																			fill: '#fff'
																		}}
																	/>
																)) ||
																(sortDirection === 'desc' && (
																	<KeyboardArrowUpIcon
																		sx={{
																			width: '12px',
																			height: '12px',
																			fill: '#fff'
																		}}
																	/>
																))
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
						// sx={stickyTableFirstRowSX}
						>
							{visibleData.map(
								(team, idx) =>
									team && (
										<TableRow
											sx={{
												position: 'relative',
												height: '35px',
												zIndex: 0
											}}
											key={team.teamId}
											className={idx === 0 ? 'data-table-row-info' : ''}
										>
											<TableCell width={69}>
												{isTooltippedPlace(team, leagueParams) ? (
													<Tooltip
														placement="right-start"
														followCursor
														PopperProps={{
															modifiers: [
																{
																	name: 'offset',
																	options: {
																		offset: [-25, 0]
																	}
																}
															]
														}}
														title={
															<Box
																sx={{
																	display: 'flex',
																	flexDirection: 'column',
																	maxWidth: '250px',
																	fontSize: '12px'
																}}
															>
																{team.leaguePosition === 1 && (
																	<Typography variant="caption">
																		{language === 'ua' ? 'Чемпіонська позиція' : 'Champion position'}
																	</Typography>
																)}
																{placeTooltipTextHandler(team, leagueParams)}
															</Box>
														}
													>
														<Box sx={() => placeBgColorHandler(team, leagueParams)}>{team.leaguePosition}</Box>
													</Tooltip>
												) : (
													<Box sx={() => placeBgColorHandler(team, leagueParams)}>{team.leaguePosition}</Box>
												)}
											</TableCell>

											<TableCell padding="none" width={185}>
												<Link href={`/teams/${team.teamId}`}>
													<Box
														sx={{
															display: 'flex',
															// flexWrap: 'nowrap',
															flexDirection: 'row',
															'&:hover': {
																textDecoration: 'underline'
															}
														}}
													>
														<Box>
															<Image
																src={team.teamLogo ? team.teamLogo : ''}
																width={25}
																height={25}
																alt={team.teamName ? team.teamName : ''}
															/>
														</Box>
														<Typography
															sx={{
																ml: '10px',
																width: '140px',
																whiteSpace: 'nowrap',
																overflow: 'hidden'
															}}
														>
															{team.teamName}
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
				<TableContainer
					sx={{
						width: {
							xs: 465,
							md: 705
						},
						overflowX: 'auto'
					}}
					// onScroll={e => {
					// 	setStickyHeadScrollData(e.target.scrollLeft)
					// }}
				>
					<Table
						size="small"
						sx={{
							overflow: 'hidden'
						}}
					>
						<StyledTableHead
						// sx={() => stikyTableHeaderSX()}
						>
							<TableRow
								className="table-head-data"
								// sx={() => scrolledTableDataHead(stickyHeadScrollData)}
							>
								{dataRows.map(row => (
									<TableCell
										key={row.id}
										width={60}
										padding="none"
										sx={{
											py: '3px',
											display: {
												xs: !row.isSortable ? 'none' : 'table-cell',
												md: 'table-cell'
											}
										}}
									>
										<Tooltip
											placement={row.tooltipPos}
											title={
												<Typography
													sx={{
														cursor: 'default'
													}}
												>
													{language === 'ua' ? row.content.ua.textLong : row.content.en.textLong}
												</Typography>
											}
											PopperProps={{
												modifiers: [
													{
														name: 'offset',
														options: {
															offset: [0, -6]
														}
													}
												]
											}}
										>
											<Box
												sx={{
													display: 'flex',
													justifyContent: row.textAlign,
													// '&:first-child': {
													// 	pl: '5px'
													// },
													width: row.isSortable ? '58px' : '120px'
												}}
											>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center'
													}}
												>
													<Typography
														variant="h6"
														sx={{
															fontWeight: '700',
															fontSize: '16px',
															color: '#fff',
															pr: '8px',
															cursor: 'default'
														}}
													>
														{language === 'ua' ? row.content.ua.textShort : row.content.en.textShort}
													</Typography>
													{row.isSortable && (
														<IconButton
															size="small"
															sx={{
																bgcolor: sortField === row.fieldName ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'
															}}
															onClick={() => sortTableHandler(row.fieldName)}
														>
															{sortField === row.fieldName ? (
																(sortDirection === 'asc' && (
																	<KeyboardArrowDownIcon
																		sx={{
																			width: '12px',
																			height: '12px',
																			fill: '#fff'
																		}}
																	/>
																)) ||
																(sortDirection === 'desc' && (
																	<KeyboardArrowUpIcon
																		sx={{
																			width: '12px',
																			height: '12px',
																			fill: '#fff'
																		}}
																	/>
																))
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
												height: '35px'
												// ...stickyTableFirstRowSX()
											}}
											key={team.teamId}
										>
											<EnchancedTableDataCell team={team} field="games" toolTipvalue="finalScore" />

											<EnchancedTableDataCell team={team} field="win" toolTipvalue="finalScore" />

											<EnchancedTableDataCell team={team} field="draw" toolTipvalue="finalScore" />

											<EnchancedTableDataCell team={team} field="lose" toolTipvalue="finalScore" />

											<EnchancedTableDataCell team={team} field="goalsFor" toolTipvalue="goalsFor" />

											<EnchancedTableDataCell team={team} field="goalsAgainst" toolTipvalue="goalsAgainst" />

											<EnchancedTableDataCell team={team} field="goalsDiff" toolTipvalue="goalsDiff" />

											<EnchancedTableDataCell team={team} field="points" toolTipvalue="points" />
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
