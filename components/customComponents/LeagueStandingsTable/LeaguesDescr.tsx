import { Typography, Box } from '@mui/material'

import { styles } from './styles'

import { leaguesPlacesColors } from '@/constants/colors'
export default function LeaguesDescr({
	leagueParams,
	language
}: {
	leagueParams: ILeagueConfig
	language: LangStateType
}) {
	return (
		<>
			<Typography
				sx={{
					fontWeight: 700
				}}
			>
				{language === 'ua' ? 'Деталі позицій в лізі' : 'League places positions descriptions'}:
			</Typography>

			{
				<>
					{leagueParams.placesData.uefaChampLeagueGS.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								my: '5px'
							}}
						>
							<Box sx={styles.descrBox('CLGS')}></Box>
							&nbsp;-&nbsp;
							<Typography>
								{language === 'ua'
									? 'Кваліфікація до групового етапу Ліги Чемпіонів УЄФА'
									: 'Qualification for the group stage of the UEFA Champions League'}
							</Typography>
						</Box>
					)}

					{leagueParams.placesData.uefaChampLeagueQ.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								my: '5px'
							}}
						>
							<Box sx={styles.descrBox('CLQ')}></Box>
							&nbsp;-&nbsp;
							<Typography>
								{language === 'ua'
									? 'Кваліфікація до відбіркового етапу Ліги Чемпіонів УЄФА'
									: 'Qualification for the qualifying stage of the UEFA Champions League'}
							</Typography>
						</Box>
					)}

					{leagueParams.placesData.uefaEuropaLeagueGS.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								my: '5px'
							}}
						>
							<Box sx={styles.descrBox('UELGS')}></Box>
							&nbsp;-&nbsp;
							<Typography>
								{language === 'ua'
									? 'Кваліфікація до групового етапу Ліги Європи УЄФА'
									: 'Qualification for the group stage of the UEFA Europa League'}
							</Typography>
						</Box>
					)}

					{leagueParams.placesData.uefaEuropaLeagueQ.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								my: '5px'
							}}
						>
							<Box sx={styles.descrBox('UELQ')}></Box>
							&nbsp;-&nbsp;
							<Typography>
								{language === 'ua'
									? 'Кваліфікація до відбіркового етапу Ліги Європи УЄФА'
									: 'Qualification for the qualifying stage of the UEFA Europa League'}
							</Typography>
						</Box>
					)}

					{leagueParams.placesData.uefaConfLeagueGS.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								my: '5px'
							}}
						>
							<Box sx={styles.descrBox('CELGS')}></Box>
							&nbsp;-&nbsp;
							<Typography>
								{language === 'ua'
									? 'Кваліфікація до групового етапу Ліги Конференцій УЄФА'
									: 'Qualification for the group stage of the UEFA Europa Conference League'}
							</Typography>
						</Box>
					)}

					{leagueParams.placesData.uefaConfLeagueQ.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								my: '5px'
							}}
						>
							<Box sx={styles.descrBox('CELQ')}></Box>
							&nbsp;-&nbsp;
							<Typography>
								{language === 'ua'
									? 'Кваліфікація до відбіркового етапу Ліги Конференцій УЄФА'
									: 'Qualification for the qualifying stage of the UEFA Europa Conference League'}
							</Typography>
						</Box>
					)}

					{leagueParams.placesData.relegationPlayOff.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								my: '5px'
							}}
						>
							<Box sx={styles.descrBox('RP')}></Box>
							&nbsp;-&nbsp;
							<Typography>{language === 'ua' ? 'Пониження (Раунд плей-офф)' : 'Relegation (Playoff round)'}</Typography>
						</Box>
					)}

					{leagueParams.placesData.relegationLeague.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								my: '5px'
							}}
						>
							<Box sx={styles.descrBox('R')}></Box>
							&nbsp;-&nbsp;
							<Typography>{language === 'ua' ? 'Пониження' : 'Relegation'}</Typography>
						</Box>
					)}
				</>
			}
		</>
	)
}
