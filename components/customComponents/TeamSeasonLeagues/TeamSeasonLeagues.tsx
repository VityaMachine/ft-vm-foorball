import { useState, useEffect, useContext } from 'react'

import { LanguageContext } from '@/context/LanguageContext'

import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'
import { teamLeaguesParser } from '@/helpers/teamHelpers'

import { Box, FormControl, InputLabel, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'

export default function TeamSeasonLeagues({
	teamId,
	selectedSeason,
	selectedTournamentId,
	onTournamentChange
}: {
	teamId: number
	selectedSeason: number
	selectedTournamentId: number | ''
	onTournamentChange: (newTournamentId: number, tournamentType: TournamentType) => void
}) {
	const [teamTournaments, setTeamTournaments] = useState<null | ITeamTournamentParams[]>(null)
	const [teamTournamentsStatus, setTeamTournamentsStatus] = useState<ApiStatusType>('idle')

	const { language } = useContext(LanguageContext)

	useEffect(() => {
		const getTournaments = async () => {
			setTeamTournamentsStatus('pending')

			const reqParams = {
				urlPath: 'leagues',
				currentSeason: false,
				reqParams: {
					team: teamId,
					season: selectedSeason
				}
			}

			const tournamentsRespData = await apiFootball(reqParams)
			const tournamentsOk = checkRespErrors(tournamentsRespData.errors, tournamentsRespData.response)

			if (tournamentsOk) {
				const data = teamLeaguesParser(tournamentsRespData.response)

				setTeamTournaments(data)

				setTeamTournamentsStatus('resolved')
			} else {
				setTeamTournamentsStatus('rejected')
			}
		}

		getTournaments()
	}, [selectedSeason, teamId])

	const handleTournamentChange = (e: SelectChangeEvent) => {
		const tournamentId = Number(e.target.value)
		const tournamentType = teamTournaments?.find(item => item.tournamentId === tournamentId)
			?.tournamentType as TournamentType

		onTournamentChange(tournamentId, tournamentType)
	}

	// console.log(teamTournaments)

	return (
		<Box
			sx={{
				minWidth: '300px'
			}}
		>
			{(teamTournamentsStatus === 'idle' || teamTournamentsStatus === 'pending') && <LoadingSpinner />}

			{teamTournamentsStatus === 'rejected' && (
				<LoadingError
					messageUa="Помилка завантаження даних про турніри"
					messageEn="Error team tournaments data loading"
				/>
			)}

			{teamTournamentsStatus === 'resolved' && teamTournaments && (
				<FormControl fullWidth error={selectedTournamentId === ''}>
					<InputLabel>{language === 'ua' ? 'Виберіть турнір' : 'Select the tournament'}</InputLabel>

					<Select
						label={language === 'ua' ? 'Виберіть турнір' : 'Select the tournament'}
						value={selectedTournamentId.toString()}
						onChange={handleTournamentChange}
					>
						{teamTournaments.map(item => (
							<MenuItem value={item.tournamentId} key={item.tournamentId}>
								{item.tournamentName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		</Box>
	)
}
