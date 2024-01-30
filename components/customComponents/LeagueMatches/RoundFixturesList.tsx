import { Box, List, ListItem, Typography, Tooltip, ListItemButton } from '@mui/material'

import Image from 'next/image'
import Link from 'next/link'
import ScoreTooltipBox from './ScoreTooltipBox'

import { red } from '@mui/material/colors'

export default function RoundFixturesList({
	round,
	language
}: {
	round: IFixturesByRounds
	language: LangStateType
}) {
	return (
		<List dense disablePadding>
			{round.roundMatches.map(fixture => (
				<ListItem disableGutters key={fixture.fixtureId}>
					<ListItemButton>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '100%'
						}}
					>
						{/* match date and time */}
						<Box
							sx={{
								display: 'flex',
								flexDirection: {
									xs: 'column',
									sm: 'row'
								},
								alignItems: 'center',
								gap: {
									xs: 0,
									sm: '10px',
								},
								minWidth: {
									xs: '55px',
									sm: '110px'
								}
								// overflow: 'hidden'
							}}
						>
							<Typography variant="caption" sx={{
								fontSize: {
									xs: '10px',
									sm: '12px'
								}
							}}>
								{fixture.date_text.slice(0, 10).split('-').reverse().join('.')}
							</Typography>

							<Typography variant="caption" sx={{
								fontSize: {
									xs: '10px',
									sm: '12px'
								}
							}}>
								{fixture.date_text.slice(11, 16)}
							</Typography>
						</Box>

						{/* details */}

						<Box
							sx={{
								width: 'calc(100% - 110px)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								minWidth: '270px',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									// minWidth: '415px',
									// overflow: 'hidden'
								}}
							>
								{/* home team logo and name */}
								<Link href={`/team/${fixture.homeTeamId}`}>
									<Box
										sx={{
											display: 'flex',
											minWidth: '180px',
											alignItems: 'center',
											justifyContent: 'flex-end',
											':hover': {
												textDecoration: 'underline'
											}
										}}
									>
										<Typography
											variant="subtitle2"
											sx={{
												mr: '5px',
												display: {
													xs: 'none',
													sm: 'block'
												}
											}}
										>
											{fixture.homeTeamNameData
												? language === 'ua'
													? fixture.homeTeamNameData.longName.ua
													: fixture.homeTeamNameData.longName.en
												: fixture.homeTeamNameOriginal}
										</Typography>

										<Typography
											variant="subtitle2"
											sx={{
												mr: '5px',
												display: {
													xs: 'block',
													sm: 'none'
												}
											}}
										>
											{fixture.homeTeamNameData
												? language === 'ua'
													? fixture.homeTeamNameData.shortName.ua
													: fixture.homeTeamNameData.shortName.en
												: fixture.homeTeamNameOriginal}
										</Typography>




										<Image
											src={fixture.homeTeamLogo}
											alt={fixture.homeTeamNameOriginal}
											width={25}
											height={25}
											className="w-[25px] h-[25px] object-contain"
										/>
									</Box>
								</Link>

								{/* score */}
								<Link href={`/fixture/${fixture.fixtureId}`}>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											mx: '15px',
											minWidth: '25px',
											color: fixture.online ? red[700] : 'none',
											':hover': {
												textDecoration: 'underline'
											}
										}}
									>
										<Tooltip
											placement="top"
											followCursor
											title={<ScoreTooltipBox fixture={fixture} lang={language} />}
										>
											<Box>
												{fixture.online
													? fixture.online.goalsHome
													: fixture.homeTeamGoalsFT}
												&nbsp;:&nbsp;
												{fixture.online
													? fixture.online.goalsAway
													: fixture.awayTeamGoalsFT}
											</Box>
										</Tooltip>
									</Box>
								</Link>

								{/* away team logo and name */}
								<Link href={`/team/${fixture.awayTeamId}`}>
									<Box
										sx={{
											display: 'flex',
											minWidth: '180px',
											alignItems: 'center',
											justifyContent: 'flex-start',
											':hover': {
												textDecoration: 'underline'
											}
										}}
									>
										<Image
											src={fixture.awayTeamLogo}
											alt={fixture.awayTeamNameOriginal}
											width={25}
											height={25}
											className="w-[25px] h-[25px] object-contain"
										/>

										<Typography
											variant="subtitle2"
											sx={{
												ml: '5px',
												display: {
													xs: 'none',
													sm: 'block'
												}
											}}
										>
											{fixture.awayTeamNameData
												? language === 'ua'
													? fixture.awayTeamNameData.longName.ua
													: fixture.awayTeamNameData.longName.en
												: fixture.awayTeamNameOriginal}
										</Typography>

										<Typography
											variant="subtitle2"
											sx={{
												ml: '5px',
												display: {
													xs: 'block',
													sm: 'none'
												}
											}}
										>
											{fixture.awayTeamNameData
												? language === 'ua'
													? fixture.awayTeamNameData.shortName.ua
													: fixture.awayTeamNameData.shortName.en
												: fixture.awayTeamNameOriginal}
										</Typography>
									</Box>
								</Link>
							</Box>
						</Box>
					</Box>
					</ListItemButton>

				</ListItem>
			))}
		</List>
	)
}
