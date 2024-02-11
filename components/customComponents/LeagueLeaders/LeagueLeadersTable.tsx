'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'

import { tournamentsConfigs } from '@/configs/tournaments'
import { apiFootball } from '@/services/api-football.rapidapi'

import {
	leagueLeadersDataParser,
	tableRowsConfigCreator
} from '@/helpers/leagueLeadersHelpers'
import { basicLeadersTablesConfig } from '@/configs/leagueLeadersTables'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow
} from '@mui/material'
import SortingTableHead from '@/components/ui/SortingTable/SortingTableHead'

import { getComparator, stableSort } from '@/utils/sortingTableUtils'
import Image from 'next/image'
import Link from 'next/link'

export default function LeagueLeadersTable({
	statType
}: {
	statType: LeagueLeadersStatsTypes
}) {
	const [data, setData] = useState<null | PlayerLeadersTableData[]>(null)
	const [status, setStatus] = useState<ApiStatusType>('idle')
	const [error, setError] = useState<null | string>(null)

	const [order, setOrder] = useState<TableSortOrder>('desc')
	const [orderBy, setOrderBy] = useState<keyof PlayerLeadersTableData>(() =>
		statType === 'goals'
			? 'goals'
			: statType === 'assists'
			? 'assists'
			: statType === 'ycards'
			? 'yellowCards'
			: statType === 'rcards'
			? 'redCards'
			: 'rank'
	)

	const params = useParams()
	const leagueData = tournamentsConfigs.leagues.find(
		league => league.shortName === params.leagueName
	)

	useEffect(() => {
		const getData = async () => {
			const pathEnd =
				statType === 'goals'
					? 'scorers'
					: statType === 'assists'
					? 'assists'
					: statType === 'ycards'
					? 'yellowcards'
					: statType === 'rcards'
					? 'redcards'
					: null

			setStatus('pending')
			if (!leagueData || !pathEnd) {
				setStatus('rejected')
				setError('wrong url or stats param')
			}

			if (leagueData && pathEnd) {
				const reqConfig = {
					urlPath: `players/top${pathEnd}`,
					reqParams: {
						league: leagueData.id
					},
					currentSeason: true,
					timezone: false
				}

				const data = await apiFootball(reqConfig)

				if (
					Array.isArray(data.errors) &&
					data.errors.length === 0 &&
					data.response.length > 0
				) {
					const parsedData = leagueLeadersDataParser(data.response)

					setData(parsedData)
					setStatus('resolved')
				}
			}
		}

		getData()
	}, [leagueData, statType])

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof PlayerLeadersTableData
	) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const tableHeadConfigs = tableRowsConfigCreator(
		basicLeadersTablesConfig,
		statType
	)

	const sortedRows = data
		? stableSort(data, getComparator(order, orderBy))
		: data

	console.log(sortedRows)

	return (
		<Box>
			<TableContainer>
				<Table size="small" sx={{ minWidth: 750 }}>
					<SortingTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						headCells={tableHeadConfigs}
					/>
					<TableBody>
						{sortedRows &&
							sortedRows.map(item => (
								<TableRow key={item.id}>
									<TableCell align="center">{item.rank}</TableCell>
									<TableCell align="center" sx={{
										":hover": {
											borderBottom: '1px solid red'
										}
									}}>
										<Link href={`/team/${item.teamId}`}>
											<Image
												src={item.teamLogo}
												alt={item.teamName}
												width={20}
												height={20}
												className="w-[20px] h-[20px] object-contain"
											/>
										</Link>
									</TableCell>
									<TableCell align="left">{item.playerName}</TableCell>
									<TableCell
										sx={{
											pr: 0
										}}
										align="right"
									>
										{item.gamesPlayed}
									</TableCell>
									<TableCell
										sx={{
											pr: 0
										}}
										align="right"
									>
										{item.minutesPlayed}
									</TableCell>
									<TableCell
										sx={{
											pr: 0
										}}
										align="right"
									>
										{statType === 'goals'
											? `${item.goals} ${
													item.penaltiesGoals > 0
														? `(${item.penaltiesGoals})`
														: ''
											  } `
											: statType === 'assists'
											? item.assists
											: statType === 'ycards'
											? item.yellowCards
											: statType === 'rcards'
											? item.redCards
											: 0}
									</TableCell>
									<TableCell
										sx={{
											pr: 0
										}}
										align="right"
									>
										{statType === 'goals'
											? item.goalsPerGame.toFixed(1)
											: statType === 'assists'
											? item.assistPerGame.toFixed(1)
											: statType === 'ycards'
											? item.yellowPerGame.toFixed(1)
											: statType === 'rcards'
											? item.redPerGame.toFixed(1)
											: 0}
									</TableCell>
									<TableCell
										sx={{
											pr: 0
										}}
										align="right"
									>
										{statType === 'goals'
											? item.minForGoal.toFixed()
											: statType === 'assists'
											? item.minForAssist.toFixed()
											: statType === 'ycards'
											? item.minForYellow.toFixed()
											: statType === 'rcards'
											? item.minForRed.toFixed()
											: 0}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
