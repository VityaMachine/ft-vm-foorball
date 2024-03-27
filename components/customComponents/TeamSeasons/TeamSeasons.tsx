import { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react'

import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'
import { Box, FormControl, Typography } from '@mui/material'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { LanguageContext } from '@/context/LanguageContext'

export default function TeamSeasons({
	teamId,
	selectedSeason,
	onSeasonChange
}: {
	teamId: number
	selectedSeason: number
	onSeasonChange: (newSeason: number) => void
}) {
	const [teamSeasons, setTeamSeasons] = useState<null | number[]>(null)
	const [teamSeasonsStatus, setTeamSeasonsStatus] = useState<ApiStatusType>('idle')

	const { language } = useContext(LanguageContext)

	useEffect(() => {
		const getTeamSeasons = async () => {
			setTeamSeasonsStatus('pending')

			const seasonsParams = { urlPath: 'teams/seasons', reqParams: { team: teamId }, currentSeason: false }
			const seasonsData = await apiFootball(seasonsParams)

			const seasonsOk = checkRespErrors(seasonsData.errors, seasonsData.response)

			if (seasonsOk) {
				setTeamSeasons(seasonsData.response.reverse())
				setTeamSeasonsStatus('resolved')
			}

			if (!seasonsOk) {
				setTeamSeasonsStatus('rejected')
			}
		}

		getTeamSeasons()
	}, [teamId])

	const handleSeasonChange = (e: SelectChangeEvent) => {
		onSeasonChange(Number(e.target.value))
	}

	return (
		<Box
			sx={{
				minWidth: '150px'
				// mt: '16px'
			}}
		>
			{(teamSeasonsStatus === 'idle' || teamSeasonsStatus === 'pending') && <LoadingSpinner />}

			{teamSeasonsStatus === 'rejected' && (
				<LoadingError
					messageUa="Помилка завантаження даних про сезони"
					messageEn="Error team seasons data loading"
				/>
			)}

			{teamSeasonsStatus === 'resolved' && teamSeasons && (
				<FormControl fullWidth>
					<InputLabel>{language === 'ua' ? 'Виберіть сезон' : 'Select the season'}</InputLabel>
					<Select
						value={selectedSeason.toString()}
						label={language === 'ua' ? 'Виберіть сезон' : 'Select the season'}
						onChange={handleSeasonChange}
					>
						{teamSeasons.map(item => (
							<MenuItem key={item} value={item}>
								{item}-20{Number(item.toString().slice(2, 4)) + 1}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		</Box>
	)
}
