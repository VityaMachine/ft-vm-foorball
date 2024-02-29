import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, List, ListItem } from '@mui/material'

import { red, green, yellow, amber } from '@mui/material/colors'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { StyledTableHead } from './StyledTableHead'

import { isTooltippedPlace, shortTeamNameFromOriginalHandler } from '@/helpers/leagueStandingsHelpers'

import { styles } from './styles'

export default function MobileTable({
	leagueData,
	language,
	leagueParams
}: {
	leagueData: ITeamResultsFromFixtures[]
	language: LangStateType
	leagueParams: ILeagueConfig | undefined
}) {
	const theme = useTheme()
	const mobileResolution = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<Box
			sx={{
				overflow: 'auto',
				width: '100%',
				minWidth: 375
			}}
		>
			<TableContainer>
				<Table size="small">
					<StyledTableHead>
						<TableRow>
							<TableCell sx={styles.mobileHeadCell}>#</TableCell>
							<TableCell sx={styles.mobileHeadCell}>{language === 'ua' ? 'Ком' : 'Team'}</TableCell>
							<TableCell sx={styles.mobileHeadCell}>M</TableCell>
							<TableCell sx={styles.mobileHeadCell}>{language === 'ua' ? 'В/Н/П' : 'W/D/L'}</TableCell>
							<TableCell sx={styles.mobileHeadCell}>{language === 'ua' ? 'ГЗ/ГП' : 'GS/GC'}</TableCell>
							<TableCell sx={styles.mobileHeadCell}>{language === 'ua' ? 'О' : 'P'}</TableCell>
						</TableRow>
					</StyledTableHead>

					<TableBody>
						{leagueData.map(teamItem => {
							const onlineRes = teamItem.fixtures.find(item => item.online)?.online?.onlineResult

							return (
								<TableRow
									key={teamItem.teamId}
									sx={{
										bgcolor: onlineRes
											? // onlineRes.online?.onlineResult
											  onlineRes === 'W'
												? green[300]
												: onlineRes === 'D'
												? amber[200]
												: onlineRes === 'L'
												? red[200]
												: 'none'
											: 'none'
									}}
								>
									<TableCell>
										{isTooltippedPlace(teamItem, leagueParams) ? (
											<Box sx={styles.infoTableBodyPlace(teamItem, leagueParams)}>{teamItem.leaguePosition}</Box>
										) : (
											<Box sx={styles.infoTableBodyPlace(teamItem, leagueParams)}>{teamItem.leaguePosition}</Box>
										)}
									</TableCell>

									<TableCell padding="none">
										<Link href={`/teams/${teamItem.teamId}`}>
											<Box sx={styles.infoTableBodyTeamNameCellBox}>
												<Box>
													<Image
														src={teamItem.teamLogo ? teamItem.teamLogo : ''}
														width={25}
														height={25}
														alt={teamItem.teamNameOriginal ? teamItem.teamNameOriginal : ''}
														className="w-[25px] h-[25px] object-contain"
													/>
												</Box>
												<Typography
													sx={{
														ml: '10px',
														color: onlineRes === 'D' ? '#000' : onlineRes === 'W' || onlineRes === 'L' ? '#fff' : 'none'
													}}
												>
													{mobileResolution
														? teamItem.teamNameData
															? language === 'ua'
																? teamItem.teamNameData.shortName.ua
																: teamItem.teamNameData.shortName.en
															: shortTeamNameFromOriginalHandler(teamItem.teamNameOriginal)
														: teamItem.teamNameData
														? language === 'ua'
															? teamItem.teamNameData.longName.ua
															: teamItem.teamNameData.longName.en
														: teamItem.teamNameOriginal}
												</Typography>
											</Box>
										</Link>
									</TableCell>

									<TableCell
										sx={{
											// color: onlineRes === 'D' ? '#000' : onlineRes === 'W' || onlineRes === 'L' ? '#fff' : 'none'
											color: onlineRes ? '#000' : 'none'
										}}
									>
										{teamItem.results.games}
									</TableCell>

									<TableCell
										sx={{
											// color: onlineRes === 'D' ? '#000' : onlineRes === 'W' || onlineRes === 'L' ? '#fff' : 'none'
											color: onlineRes ? '#000' : 'none'
										}}
									>
										{teamItem.results.win}/{teamItem.results.draw}/{teamItem.results.lose}
									</TableCell>

									<TableCell
										sx={{
											// color: onlineRes === 'D' ? '#000' : onlineRes === 'W' || onlineRes === 'L' ? '#fff' : 'none'
											color: onlineRes ? '#000' : 'none'
										}}
									>
										{teamItem.results.goalsFor}/{teamItem.results.goalsAgainst}
									</TableCell>

									<TableCell
										sx={{
											// color: onlineRes === 'D' ? '#000' : onlineRes === 'W' || onlineRes === 'L' ? '#fff' : 'none'
											color: onlineRes ? '#000' : 'none'
										}}

									>
										{teamItem.results.points}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>


			{/* Table description */}
			<Box sx={styles.mobileTableLegendBox}>
				<Typography sx={styles.mobileLegendTitle}>
					{language === 'ua' ? 'Деталі таблиці' : 'Table description'}:
				</Typography>

				<Box sx={styles.mobileLegendRow}>
					<Typography sx={styles.mobileLegendRowTitle}>#</Typography>
					<Typography>&nbsp;- {language === 'ua' ? 'Позиція в чемпіонаті' : 'League position'}</Typography>
				</Box>

				<Box sx={styles.mobileLegendRow}>
					<Typography sx={styles.mobileLegendRowTitle}>{language === 'ua' ? 'Ком' : 'Team'}</Typography>
					<Typography>&nbsp;- {language === 'ua' ? 'Логотип та назва клубу' : 'Team logo and team name'}</Typography>
				</Box>

				<Box sx={styles.mobileLegendRow}>
					<Typography sx={styles.mobileLegendRowTitle}>{language === 'ua' ? 'М' : 'M'}</Typography>
					<Typography>&nbsp;- {language === 'ua' ? 'Зіграні матчі' : 'Matches played'}</Typography>
				</Box>

				<Box sx={styles.mobileLegendRow}>
					<Typography sx={styles.mobileLegendRowTitle}>{language === 'ua' ? 'В/Н/П' : 'W/D/L'}</Typography>
					<Typography>&nbsp;- {language === 'ua' ? 'Виграші/Нічиї/Поразки' : 'Wins/Draw/Loses'}</Typography>
				</Box>

				<Box sx={styles.mobileLegendRow}>
					<Typography sx={styles.mobileLegendRowTitle}>{language === 'ua' ? 'ГЗ/ГП' : 'GS/GC'}</Typography>
					<Typography>
						&nbsp;- {language === 'ua' ? 'Голів забито/Голів пропущено' : 'Goals scored/Goals conceded '}
					</Typography>
				</Box>

				<Box sx={styles.mobileLegendRow}>
					<Typography sx={styles.mobileLegendRowTitle}>{language === 'ua' ? 'О' : 'P'}</Typography>
					<Typography>&nbsp;- {language === 'ua' ? 'Очки' : 'Points'}</Typography>
				</Box>
			</Box>


			{/* online rows descr */}
			<Box sx={styles.mobileTableLegendBox}>
				<Typography sx={styles.mobileLegendTitle}>
					{language === 'ua' ? 'Матчі онлайн' : 'Online matches'}:
				</Typography>

				<Box sx={styles.mobileLegendRow}>
					<Box sx={{
						height: '24px',
						minWidth: '125px',
						bgcolor: green[300],
						px: '8px',
						color: '#000',
						borderRadius: '4px'
					}}>{language === 'ua' ? 'Рядок таблиці' : 'Table row'}</Box>
					<Typography>&nbsp;- {language === 'ua' ? 'Команда на даний час виграє матч' : 'The team is currently winning the match'}</Typography>
				</Box>

				<Box sx={styles.mobileLegendRow}>
					<Box sx={{
						height: '24px',
						minWidth: '125px',
						bgcolor: amber[200],
						px: '8px',
						color: '#000',
						borderRadius: '4px'

					}}>{language === 'ua' ? 'Рядок таблиці' : 'Table row'}</Box>
					<Typography>&nbsp;- {language === 'ua' ? 'Команда на даний час грає матч в нічию' : 'The team is currently playing a draw'}</Typography>
				</Box>
				<Box sx={styles.mobileLegendRow}>
					<Box sx={{
						height: '24px',
						minWidth: '125px',
						bgcolor: red[200],
						px: '8px',
						color: '#000',
						borderRadius: '4px'
					}}>{language === 'ua' ? 'Рядок таблиці' : 'Table row'}</Box>
					<Typography>&nbsp;- {language === 'ua' ? 'Команда на даний час програє матч' : 'The team is currently loosing the match'}</Typography>
				</Box>

			</Box>
		</Box>
	)
}
