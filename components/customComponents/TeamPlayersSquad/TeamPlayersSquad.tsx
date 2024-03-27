import { useState, useEffect } from 'react'

import { Box, Typography } from '@mui/material'

import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'
import PlayerCard from './PlayerCard'

export default function TeamPlayersSquad({ teamId, lang }: { teamId: number; lang: LangStateType }) {
	const [teamSquad, setTeamSquad] = useState<null | ITeamSquadPlayer[]>(null)
	const [teamSquadStatus, setTeamSquadStatus] = useState<ApiStatusType>('idle')

	useEffect(() => {
		const getTeamSquad = async () => {
			setTeamSquadStatus('pending')
			const reqParams = {
				urlPath: 'players/squads',
				currentSeason: false,
				reqParams: {
					team: teamId
				}
			}

			const squadRespData = await apiFootball(reqParams)
			const squadOk = checkRespErrors(squadRespData.errors, squadRespData.response)

			if (squadOk) {
				const squadData = squadRespData.response[0].players as ITeamSquadPlayer[]

				setTeamSquad(squadData)
				setTeamSquadStatus('resolved')
			}

			if (!squadOk) {
				setTeamSquadStatus('rejected')
			}
		}

		getTeamSquad()
	}, [teamId])

	return (
		<Box>
			<Typography variant="h5">{lang === 'ua' ? 'Склад команди' : 'Players squad'}</Typography>

			{teamSquadStatus === 'resolved' && teamSquad && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '16px'
					}}
				>
					{/* goalkeepers */}
					<Box>
						<Typography
							sx={{
								mb: '8px'
							}}
							variant="h6"
						>
							{lang === 'ua' ? 'Голкіпери' : 'Goalkeepers'}:
						</Typography>
						<Box
							sx={{
								display: 'flex',
								gap: '16px',
								flexWrap: 'wrap'
							}}
						>
							{teamSquad
								.filter(item => item.position === 'Goalkeeper')
								.map(item => (
									<PlayerCard lang={lang} player={item} key={item.id} />
								))}
						</Box>
					</Box>

					{/* defenders */}
					<Box>
						<Typography
							sx={{
								mb: '8px'
							}}
							variant="h6"
						>
							{lang === 'ua' ? 'Захисники' : 'Defenders'}:
						</Typography>
						<Box
							sx={{
								display: 'flex',
								gap: '16px',
								flexWrap: 'wrap'
							}}
						>
							{teamSquad
								.filter(item => item.position === 'Defender')
								.map(item => (
									<PlayerCard lang={lang} player={item} key={item.id} />
								))}
						</Box>
					</Box>

					{/* midfielders */}
					<Box>
						<Typography
							sx={{
								mb: '8px'
							}}
							variant="h6"
						>
							{lang === 'ua' ? 'Півзахисники' : 'Midfielders'}:
						</Typography>
						<Box
							sx={{
								display: 'flex',
								gap: '16px',
								flexWrap: 'wrap'
							}}
						>
							{teamSquad
								.filter(item => item.position === 'Midfielder')
								.map(item => (
									<PlayerCard lang={lang} player={item} key={item.id} />
								))}
						</Box>
					</Box>

					{/* attakers */}
					<Box>
						<Typography
							sx={{
								mb: '8px'
							}}
							variant="h6"
						>
							{lang === 'ua' ? 'Форварди' : 'Attackers'}:
						</Typography>
						<Box
							sx={{
								display: 'flex',
								gap: '16px',
								flexWrap: 'wrap'
							}}
						>
							{teamSquad
								.filter(item => item.position === 'Attacker')
								.map(item => (
									<PlayerCard lang={lang} player={item} key={item.id} />
								))}
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	)
}
