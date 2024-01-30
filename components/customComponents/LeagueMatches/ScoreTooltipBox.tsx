import { Box, Typography } from '@mui/material'
import { red } from '@mui/material/colors'

export default function ScoreTooltipBox({
	fixture,
	lang
}: {
	fixture: IFixtureConvertedData
	lang: LangStateType
}) {
	const maybeAddLeadingZero = (number: number): string =>
		[String(number).length === 1 ? '0' : '', number].join('')

	const today = new Date()
	const matchDate = new Date(fixture.dateTime)

	const dateDiff = Math.abs(matchDate.getTime() - today.getTime()) / 1000

	const days = Math.floor(dateDiff / 86400)
	const deltaMinusDaysInSeconds = dateDiff - days * 86400

	const hours = Math.floor(deltaMinusDaysInSeconds / 3600) % 24
	const deltaMinusHoursInSeconds = deltaMinusDaysInSeconds - hours * 3600

	const minutes = Math.floor(deltaMinusHoursInSeconds / 60) % 60
	const twoDigitMinutes = maybeAddLeadingZero(minutes)

	if (fixture.statusShort === 'FT') {
		return (
			<Box>
				{/* status */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Статус' : 'Status'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">
						{lang === 'ua' ? 'Матч завершено' : 'Full Time'}
					</Typography>
				</Box>

				{/* city */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Місто' : 'City'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.city}</Typography>
				</Box>

				{/* stadium */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Стадіон' : 'Stadium'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.stadiumName}</Typography>
				</Box>

				{/* referee */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Арбітр' : 'Referee'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.referee}</Typography>
				</Box>

				{/* 1st half */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? '1-й тайм' : '1st half'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">
						{fixture.homeTeamGoalsHT}:{fixture.awayTeamGoalsHT}
					</Typography>
				</Box>

				{/* 2nd half */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? '2-й тайм' : '2nd half'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">
						{fixture.homeTeamGoalsFT}:{fixture.awayTeamGoalsFT}
					</Typography>
				</Box>
			</Box>
		)
	}

	if (
		fixture.statusShort === 'NS' ||
		fixture.statusShort === 'CANC' ||
		fixture.statusShort === 'TBD' ||
		fixture.statusShort === 'PST'
	) {
		return (
			<Box>
				{' '}
				{/* status */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Статус' : 'Status'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">
						{lang === 'ua' ? 'Матч не розпочався' : 'Not started'}
					</Typography>
				</Box>
				{/* time to start */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Початок через' : 'Start in'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">
						{lang === 'ua'
							? `${days}д ${hours}г ${twoDigitMinutes}хв`
							: `${days}d ${hours}h ${twoDigitMinutes}min`}
					</Typography>
				</Box>
				{/* city */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Місто' : 'City'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.city}</Typography>
				</Box>
				{/* stadium */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Стадіон' : 'Stadium'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.stadiumName}</Typography>
				</Box>
			</Box>
		)
	}

	if (
		fixture.statusShort === '1H' ||
		fixture.statusShort === '2H' ||
		fixture.statusShort === 'HT'
	) {
		return (
			<Box>
				{/* live logo */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Box
						sx={{
							px: '6px',
							py: '2px',
							color: '#fff',
							bgcolor: red[800],
							fontSize: '12px',
							fontWeight: 700,
							borderRadius: '4px',
							width: '40px'
						}}
					>
						LIVE
					</Box>
				</Box>

				{/* status */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Статус' : 'Status'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">
						{lang === 'ua'
							? fixture.statusShort === '1H'
								? 'Перший тайм'
								: fixture.statusShort === '2H'
								? 'Другий тайм'
								: 'Перерва'
							: fixture.statusShort === '1H'
							? 'First half'
							: fixture.statusShort === '2H'
							? 'Second half'
							: 'Half-time'}
					</Typography>
				</Box>

				{/* city */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Місто' : 'City'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.city}</Typography>
				</Box>

				{/* stadium */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Стадіон' : 'Stadium'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.stadiumName}</Typography>
				</Box>

				{/* referee */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Арбітр' : 'Referee'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.referee}</Typography>
				</Box>

				{/* game minute */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Хвилина гри' : 'Time'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">{fixture.online?.elapsedTime}</Typography>
				</Box>

				{/* online score */}
				<Box>
					<Typography
						variant="caption"
						sx={{
							fontWeight: 700
						}}
					>
						{lang === 'ua' ? 'Рахунок' : 'Score'}:
					</Typography>
					&nbsp;
					<Typography variant="caption">
						{fixture.online?.goalsHome}:{fixture.online?.goalsAway}
					</Typography>
				</Box>
			</Box>
		)
	}
}
