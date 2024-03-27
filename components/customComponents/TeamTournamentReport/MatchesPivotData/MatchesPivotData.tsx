import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

export default function MatchesPivotData({
	lang,
	fixtures
}: {
	lang: LangStateType
	fixtures: ITeamFixturesGeneralData
}) {
	return (
		<Box
			sx={{
				mt: '16px'
			}}
		>
			<TableContainer>
				<Table
					size="small"
					sx={{
						width: '360px'
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									fontWeight: 700
								}}
								align="left"
							>
								{lang === 'ua' ? 'Сторона/Результат' : 'Side/Result'}
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 700
								}}
								align="center"
							>
								{lang === 'ua' ? 'Дома' : 'Home'}
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 700
								}}
								align="center"
							>
								{lang === 'ua' ? 'Гості' : 'Away'}
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 700
								}}
								align="center"
							>
								{lang === 'ua' ? 'Всі' : 'Total'}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell align="left">{lang === 'ua' ? 'Виграші' : 'Wins'}</TableCell>
							<TableCell align="center">{fixtures.wins.home}</TableCell>
							<TableCell align="center">{fixtures.wins.away}</TableCell>
							<TableCell align="center">{fixtures.wins.total}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">{lang === 'ua' ? 'Нічиї' : 'Draws'}</TableCell>
							<TableCell align="center">{fixtures.draws.home}</TableCell>
							<TableCell align="center">{fixtures.draws.away}</TableCell>
							<TableCell align="center">{fixtures.draws.total}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">{lang === 'ua' ? 'Поразки' : 'Loses'}</TableCell>
							<TableCell align="center">{fixtures.loses.home}</TableCell>
							<TableCell align="center">{fixtures.loses.away}</TableCell>
							<TableCell align="center">{fixtures.loses.total}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								sx={{
									fontWeight: 700
								}}
								align="left"
							>
								{lang === 'ua' ? 'Всього' : 'Total'}
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 700
								}}
								align="center"
							>
								{fixtures.played.home}
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 700
								}}
								align="center"
							>
								{fixtures.played.away}
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 700
								}}
								align="center"
							>
								{fixtures.played.total}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
