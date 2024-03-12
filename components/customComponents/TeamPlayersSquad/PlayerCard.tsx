import { Card, CardActionArea, CardContent, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import Image from 'next/image'

import Link from 'next/link'

export default function PlayerCard({ player, lang }: { player: ITeamSquadPlayer; lang: LangStateType }) {
	const theme = useTheme()

	return (
		<Card
			sx={{
				minWidth: '182px',
				maxWidth: '182px'
			}}
		>
			<Link href={`/player/${player.id}`}>
				<CardActionArea
					sx={{
						border: `1px solid ${theme.palette.divider}`,
						height: '250px'
					}}
				>
					<CardContent>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column'
							}}
						>
							<Image src={player.photo} alt={player.name} width={150} height={150} />
						</Box>
						<Box
							sx={{
								mt: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                height: '50px'
							}}
						>
							<Typography
								noWrap={false}
								sx={{
									fontWeight: 700
								}}
							>
								{player.name}
							</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	)
}
