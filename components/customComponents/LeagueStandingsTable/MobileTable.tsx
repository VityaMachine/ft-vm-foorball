import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
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
	return (
		<TableContainer>
			<Table size="small">
				<StyledTableHead>
					<TableRow>
						<TableCell
							sx={styles.mobileHeadCell}
						>
							#
						</TableCell>
						<TableCell
							sx={styles.mobileHeadCell}

						>
							{language === 'ua' ? "Ком" : "Team"}
						</TableCell>
						<TableCell
							sx={styles.mobileHeadCell}

						>
							M
						</TableCell>
						<TableCell
							sx={styles.mobileHeadCell}

						>
							{language === 'ua' ? "В/Н/П" : 'W/D/L'}
						</TableCell>
						<TableCell
							sx={styles.mobileHeadCell}

						>
							{language === 'ua' ? "ГЗ/ГП" : "GS/GA"}
						</TableCell>
						<TableCell
							sx={styles.mobileHeadCell}

						>
							{language === 'ua' ? "О" : "P"}
						</TableCell>
					</TableRow>
				</StyledTableHead>

				<TableBody>
					{leagueData.map(teamItem => (
						<TableRow key={teamItem.teamId}>
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
											/>
										</Box>
										<Typography
											sx={{
												ml: '10px'
											}}
										>
											{teamItem.teamNameData
												? language === 'ua'
													? teamItem.teamNameData.shortName.ua
													: teamItem.teamNameData.shortName.en
												: shortTeamNameFromOriginalHandler(teamItem.teamNameOriginal)}
										</Typography>
									</Box>
								</Link>
							</TableCell>

							<TableCell>{teamItem.results.games}</TableCell>
							<TableCell>
								{teamItem.results.win}/{teamItem.results.draw}/{teamItem.results.lose}
							</TableCell>

							<TableCell>
								{teamItem.results.goalsFor}/{teamItem.results.goalsAgainst}
							</TableCell>
							<TableCell>{teamItem.results.points}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
