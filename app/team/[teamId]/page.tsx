'use client'

import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import { useParams } from 'next/navigation'

import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'

import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'
import TeamDetails from '@/components/customComponents/TeamDetails/TeamDetails'

export default function TeamPage() {
	const [teamData, setTeamData] = useState<ITeamGeneralData | null>(null)
	const [teamDataStatus, setTeamDataStatus] = useState<ApiStatusType>('idle')

	const params = useParams()
	const teamId = params.teamId as string

	useEffect(() => {
		const getTeamGeneralInfo = async () => {
			setTeamDataStatus('pending')

			const generalInfoParams = teamId
				? { urlPath: 'teams', reqParams: { id: teamId }, currentSeason: false }
				: null

			if (generalInfoParams) {
				const generalData = await apiFootball(generalInfoParams)

				const generalOk = checkRespErrors(generalData.errors, generalData.response)

				if (generalOk) {
					setTeamData(generalData.response[0])
				}
				setTeamDataStatus('resolved')
			}
		}

		getTeamGeneralInfo()
	}, [teamId])

	return (
		<Box>
			{/* preparing */}
			{(teamDataStatus === 'idle' || teamDataStatus === 'pending') && <LoadingSpinner />}

			{/* error */}
			{teamDataStatus === 'rejected' && (
				<LoadingError messageUa="Невизначена помилка" messageEn="Unexpected error" />
			)}

			{/* done */}
			{teamDataStatus === 'resolved' && teamData && <TeamDetails teamData={teamData} />}
		</Box>
	)
}
