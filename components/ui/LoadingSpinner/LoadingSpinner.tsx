import { Box, CircularProgress } from '@mui/material'
export default function LoadingSpinner({mx, my}: {mx?: number, my?: number}) {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				my: my ? `${my}px` : 0,
				mx: mx ? `${mx}px` : 0

			}}
		>
			<CircularProgress color="primary" size={50} thickness={5} />
		</Box>
	)
}
