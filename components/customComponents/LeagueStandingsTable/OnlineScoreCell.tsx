import { Tooltip, Box, Typography } from '@mui/material'
import { tableDataColors } from '@/constants/colors'
import { red } from '@mui/material/colors'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

export default function OnlineScoreCell({
	team,
	language,
	setOpponentHover
}: {
	team: ITeamResultsFromFixtures
	language: LangStateType
	setOpponentHover: Dispatch<SetStateAction<number | null>>
}) {
	const onlineFixture = team.fixtures.find(item => item.online)

	

	return (
		<Box>
			{team.fixtures.some(item => item.online) ? (
				<Tooltip
					followCursor
					placement="top"
					title={
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Box
								sx={{
									bgcolor: red[800],
									borderRadius: '5px',
									mt: '3px'
								}}
							>
								<Typography
									sx={{
										color: '#fff',
										px: '5px',
										fontSize: '14px'
									}}
								>
									LIVE
								</Typography>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center'
								}}
							>
								<Typography
									sx={{
										fontSize: '12px'
									}}
								>
									{onlineFixture?.status}
								</Typography>
								<Typography
									sx={{
										fontSize: '12px'
									}}
								>
									({onlineFixture?.online?.elapsedTime}&apos;)
								</Typography>
							</Box>

							<Box>
								<Typography
									sx={{
										fontSize: '14px'
									}}
								>
									{onlineFixture?.isHomeGame
										? team.teamNameData
											? language === 'ua'
												? team.teamNameData.longName.ua
												: team.teamNameData.longName.en
											: team.teamNameOriginal
										: onlineFixture?.opponentTeamNameData
										? language === 'ua'
											? onlineFixture.opponentTeamNameData.longName.ua
											: onlineFixture.opponentTeamNameData.longName.en
										: onlineFixture?.opponentTeamNameOriginal}
									&nbsp;-&nbsp;
									{onlineFixture?.isHomeGame
										? onlineFixture?.opponentTeamNameData
											? language === 'ua'
												? onlineFixture.opponentTeamNameData.longName.ua
												: onlineFixture.opponentTeamNameData.longName.en
											: onlineFixture?.opponentTeamNameOriginal
										: team.teamNameData
										? language === 'ua'
											? team.teamNameData.longName.ua
											: team.teamNameData.longName.en
										: team.teamNameOriginal}
								</Typography>
							</Box>

							<Box>
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: '14px'
									}}
								>
									{onlineFixture?.online?.goalsHome}-{onlineFixture?.online?.goalsAway}
								</Typography>
							</Box>
						</Box>
					}
				>
					<Link href={`/fixtures/${onlineFixture?.fixtureId}`} 
					  onMouseOver={()=>{
						if(onlineFixture) {
							setOpponentHover(onlineFixture?.opponentId)
						}
					  }}
					  onMouseLeave={()=>setOpponentHover(null)}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								whiteSpace: 'nowrap',
								bgcolor:
									onlineFixture?.online?.onlineResult === 'W'
										? tableDataColors.colorWin
										: onlineFixture?.online?.onlineResult === 'D'
										? tableDataColors.colorDraw
										: tableDataColors.colorLose,
								color: onlineFixture?.online?.onlineResult === 'D' ? '#2b2b2b' : '#FFF',
								py: '1px',
								borderRadius: '5px',
								fontSize: '14px',
								width: '30px',
								fontWeight: 700
							}}
						>
							{onlineFixture?.online?.goalsHome}-{onlineFixture?.online?.goalsAway}
						</Box>
					</Link>
				</Tooltip>
			) : (
				<Box></Box>
			)}
		</Box>
	)
}
