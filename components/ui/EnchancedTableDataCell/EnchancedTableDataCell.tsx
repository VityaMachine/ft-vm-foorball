'use client'

import { useContext } from 'react'
import { Box, Divider, List, ListItem, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import Image from 'next/image'

import { red, green, amber, orange, lightBlue } from '@mui/material/colors'

import WarningIcon from '@mui/icons-material/Warning'

import { LanguageContext } from '@/context/LanguageContext'

import placeholderImg from '@/images/placeholder.jpg'

const TooltipTitleComponent = ({
	team,
	sortType,
	toolTipvalue,
	field
}: {
	team: ITeamResultsFromFixtures
	sortType: 'W' | 'D' | 'L' | 'all'
	toolTipvalue: keyof ITeamBasicFixtureData
	field: keyof ITeamCalculatedResults
}) => {
	const { language } = useContext(LanguageContext)

	const resultArray =
		sortType === 'all'
			? team.fixtures.filter(item => item.status === 'FT')
			: team.fixtures.filter(item => item.status === 'FT').filter(item => item.result === sortType)

	const textDataCreator = (field: keyof ITeamCalculatedResults, team: ITeamResultsFromFixtures) => {
		const totalLeagueGames = team.fixtures.length
		const { games, win, draw, lose, goalsFor, goalsAgainst, goalsDiff, points } = team.results

		switch (field) {
			case 'games':
				return language === 'ua' ? `Матчів: ${games} із ${totalLeagueGames}` : `Games: ${games} of ${totalLeagueGames}`
				break
			case 'win':
				return language === 'ua' ? `Виграно: ${win} із ${games}` : `Win: ${win} of ${games}`
				break
			case 'draw':
				return language === 'ua' ? `В нічию: ${draw} із ${games}` : `Draw: ${draw} of ${games}`
				break
			case 'lose':
				return language === 'ua' ? `Програно: ${lose} із ${games}` : `Lose: ${lose} of ${games}`
				break

			case 'goalsFor':
				return language === 'ua' ? `Забито голів: ${goalsFor}` : `Scored goals: ${goalsFor}`
				break

			case 'goalsAgainst':
				return language === 'ua' ? `Пропущено голів: ${goalsAgainst}` : `Conceded goals: ${goalsAgainst}`
				break

			case 'goalsDiff':
				return language === 'ua' ? `Різниця голів: ${goalsDiff}` : `Goals difference: ${goalsDiff}`
				break

			case 'points':
				return language === 'ua' ? `Очки: ${points}` : `Points: ${points}`
				break

			default:
				return language === 'ua' ? 'Помилка' : 'Error'
		}
	}

	const textData = textDataCreator(field, team)

	return (
		<>
			{resultArray.length > 0 ? (
				<Box>
					{/* team data*/}
					<Box
						sx={{
							// pb: '8px',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							pb: '3px'
						}}
					>
						<Box>
							<Image
								src={team.teamLogo ? team.teamLogo : placeholderImg.src}
								width={45}
								height={45}
								alt={team.teamName ? team.teamName : placeholderImg.src}
							/>
						</Box>
						<Box
							sx={{
								pl: '5px'
							}}
						>
							<Typography
								sx={{
									fontSize: '16px'
								}}
							>
								{team.teamName}
							</Typography>
							<Typography
								sx={{
									fontSize: '12px'
								}}
							>
								{textData}
							</Typography>
						</Box>
					</Box>

					{/* corrections */}
					{team.corrections && (
						<Box
							sx={{
								bgcolor: red[600],
								my: '3px'
							}}
						>
							<List disablePadding>
								{team.corrections
									.filter(item => item.field === toolTipvalue)
									.map(item => (
										<ListItem
											disablePadding
											sx={
												{
													// mt: '5px'
												}
											}
											key={item.comment?.en}
										>
											<Typography
												sx={{
													maxWidth: '230px',
													px: '5px',
													py: '2px'
												}}
												variant="caption"
											>
												{' '}
												<WarningIcon sx={{ fill: amber[700] }} />
												{language === 'ua' ? item.comment?.ua : item.comment?.en}
											</Typography>
										</ListItem>
									))}
							</List>
						</Box>
					)}

					<Divider />
					{/* results data */}
					<Table>
						<TableBody>
							{resultArray.map(item => (
								<TableRow key={item.fixtureId}>
									<TableCell padding="none" sx={{ py: '3px' }}>
										<Typography
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												width: '18px',
												height: '18px',
												// color: "#fff",
												borderRadius: '50%',
												fontSize: '12px',
												bgcolor: item.isHomeGame ? lightBlue[700] : amber[800],
												cursor: 'default',
											

											}}
										>
											{item.isHomeGame ? (language === 'ua' ? 'Д' : 'H') : language === 'ua' ? 'Г' : 'A'}
										</Typography>
									</TableCell>
									<TableCell
										padding="none"
										sx={{
											px: '5px',
											color: '#fff',
											cursor: 'pointer',
											fontSize: '14px'
										}}
									>
										{item.opponentTeamName}
									</TableCell>
									<TableCell padding="none" sx={{ color: '#fff', pl: '10px' }}>
										<Typography
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: '14px',
												p: '2px',
												px: '5px',
												borderRadius: '5px',
												height: '20px',
												minWidth: '20px',
												bgcolor:
													toolTipvalue === 'finalScore' || toolTipvalue === 'points'
														? item.result === 'W'
															? green[900]
															: item.result === 'D'
															? orange[800]
															: item.result === 'L'
															? red[700]
															: 'transparent'
														: toolTipvalue === 'goalsFor' && item.goalsFor !== null
														? item.goalsFor === 0
															? amber[900]
															: item.goalsFor === 1
															? green[500]
															: item.goalsFor === 2
															? green[800]
															: item.goalsFor >= 3
															? green[900]
															: 'transparent'
														: toolTipvalue === 'goalsAgainst' && item.goalsAgainst !== null
														? item.goalsAgainst === 0
															? green[500]
															: item.goalsAgainst === 1
															? red[400]
															: item.goalsAgainst === 2
															? red[600]
															: item.goalsAgainst >= 3
															? red[900]
															: 'transparent'
														: toolTipvalue === 'goalsDiff' && item.goalsDiff !== null
														? item.goalsDiff <= -3
															? red[900]
															: item.goalsDiff === -2
															? red[600]
															: item.goalsDiff === -1
															? red[400]
															: item.goalsDiff === 0
															? amber[900]
															: item.goalsDiff === 1
															? green[500]
															: item.goalsDiff === 2
															? green[800]
															: item.goalsDiff >= 3
															? green[900]
															: 'transparent'
														: 'transparent'
											}}
										>
											{item[toolTipvalue]}
										</Typography>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			) : (
				<Typography>{language === 'ua' ? 'Відсутні дані' : 'No data'}</Typography>
			)}
		</>
	)
}

export default function EnchancedTableDataCell({
	team,
	field,
	toolTipvalue,

}: {
	team: ITeamResultsFromFixtures
	field: keyof ITeamCalculatedResults
	toolTipvalue: keyof ITeamBasicFixtureData,

}) {
	return (
		<TableCell
			sx={{
				cursor: 'default',
				width: '60px',
				px: 0,
				textAlign: 'center'
				// maxWidth: '60px'
			}}
			
		>
			<Tooltip
				// arrow
				placement="left-start"
				followCursor
				// leaveDelay={1000000}
				PopperProps={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 0]
							}
						}
					]
				}}
				title={
					field !== 'win' && field !== 'draw' && field !== 'lose' ? (
						<TooltipTitleComponent toolTipvalue={toolTipvalue} sortType="all" team={team} field={field} />
					) : field === 'win' ? (
						<TooltipTitleComponent toolTipvalue={toolTipvalue} sortType="W" team={team} field={field} />
					) : field === 'draw' ? (
						<TooltipTitleComponent toolTipvalue={toolTipvalue} sortType="D" team={team} field={field} />
					) : field === 'lose' ? (
						<TooltipTitleComponent toolTipvalue={toolTipvalue} sortType="L" team={team} field={field} />
					) : null
				}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						width: '58px'
					}}
				>
					<Typography variant="body2" align="left">
						{team.results[field]}
					</Typography>

					{team.corrections?.find(correction => correction.field === field) && (
						<Typography variant="body1" sx={{ color: 'red', fontSize: '14px' }}>
							(!)
						</Typography>
					)}
				</Box>
			</Tooltip>
		</TableCell>
	)
}
