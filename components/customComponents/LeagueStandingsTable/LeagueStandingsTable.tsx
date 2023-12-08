'use client'

import { useContext } from 'react'
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
	List,
	ListItem
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { LanguageContext } from '@/context/LanguageContext'
import { standingsTableRows } from '@/configs/standingTableConfigs'
import Link from 'next/link'
import Image from 'next/image'

const StyledTableHead = styled(TableHead)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#374551' : '#1565C0'
}))

export default function LeagueStandingsTable({ leagueData }: { leagueData: ITeamResultsFromFixtures[] | null }) {
	const { language } = useContext(LanguageContext)

	console.log(leagueData)

	if (leagueData) {
		return (
			<Box
				sx={{
					mt: '35px'
				}}
			>
				<TableContainer
					sx={{
						width: 900
					}}
				>
					<Table size="small">
						<StyledTableHead>
							<TableRow
							// sx={{
							// 	display: 'flex'
							// }}
							>
								{standingsTableRows.map(row => (
									<Tooltip
										key={row.id}
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
														offset: [0, -10]
													}
												}
											]
										}}
									>
										<TableCell
											sx={{
												'&:first-child': {
													pl: '5px'
												},
												'&:last-child': {},
												py: '3px'
											}}
											padding="none"
											align={row.textAlign}
										>
											<Typography
												variant="h6"
												sx={{
													fontWeight: '700',
													fontSize: '14px',
													color: '#fff',
													width: '50px',
													cursor: 'default'
												}}
											>
												{language === 'ua' ? row.content.ua.textShort : row.content.en.textShort}
											</Typography>
										</TableCell>
									</Tooltip>
								))}
							</TableRow>
						</StyledTableHead>
						<TableBody>
							{leagueData.map(team => (
								<TableRow key={team.teamId}>
									{/* position */}
									<TableCell>{team.leaguePosition}</TableCell>
									{/* team logo and name */}
									<TableCell padding="none">
										<Link href="#">
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'row'
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
												<Typography sx={{ ml: '10px' }}>{team.teamName}</Typography>
											</Box>
										</Link>
									</TableCell>
									{/* games */}
									<Tooltip
										placement="right-start"
										PopperProps={{
											modifiers: [
												{
													name: 'offset',
													options: {
														offset: [0, -50]
													}
												}
											]
										}}
										title={
											<Table>
												<TableBody>
													{team.fixtures
														.filter(item => item.status === 'FT')
														.map(item => (
															<TableRow
																key={item.fixtureId}
																sx={{
																	fontSize: '14px'
																}}
															>
																<TableCell padding="none" sx={{ color: '#fff', py: '2px' }}>
																	({item.isHomeGame ? 'H' : 'A'}) {item.opponentTeamName}
																</TableCell>
																<TableCell padding="none" sx={{ color: '#fff', pl: '10px' }}>
																	{item.finalScore}
																</TableCell>
															</TableRow>
														))}
												</TableBody>
											</Table>
										}
									>
										<TableCell>{team.results.games}</TableCell>
									</Tooltip>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		)
	}
}
