import { Box } from '@mui/material'
import WinsDrawsLosesChart from './WinsDrawsLosesChart/WinsDrawsLosesChart'

export default function MatchesSlide({
	mathcesData,
	tournamentType
}: {
	mathcesData: ITeamFixturesGeneralData
	tournamentType: TournamentType
}) {
	console.log(mathcesData)

	return (
		<Box>
			{tournamentType === 'League' ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between'
					}}
				>
					<WinsDrawsLosesChart mathcesData={mathcesData} side="total" />
					<WinsDrawsLosesChart mathcesData={mathcesData} side="home" />
					<WinsDrawsLosesChart mathcesData={mathcesData} side="away" />
				</Box>
			) : (
				<Box>cup</Box>
			)}
		</Box>
	)
}
