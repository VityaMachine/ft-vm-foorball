import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function GoalsData({ lang, goalsData }: { lang: LangStateType; goalsData: ITeamGoalsStat }) {
	return (
		<Box>
			<TableContainer>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
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
							<TableCell align="left">{lang === 'ua' ? 'В середньому' : 'Avarage'}</TableCell>
							<TableCell align="center">{goalsData.average.home}</TableCell>
							<TableCell align="center">{goalsData.average.away}</TableCell>
							<TableCell align="center">{goalsData.average.total}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">{lang === 'ua' ? 'В середньому' : 'Avarage'}</TableCell>
							<TableCell align="center">{goalsData.average.home}</TableCell>
							<TableCell align="center">{goalsData.average.away}</TableCell>
							<TableCell align="center">{goalsData.average.total}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">{lang === 'ua' ? 'Всього' : 'Total'}</TableCell>
							<TableCell align="center">{goalsData.total.home}</TableCell>
							<TableCell align="center">{goalsData.total.away}</TableCell>
							<TableCell align="center">{goalsData.total.total}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
