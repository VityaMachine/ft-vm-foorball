import { Box, CircularProgress } from '@mui/material'
export default function LoadingSpinner() {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			
			}}
		>
			<CircularProgress color="primary" size={50} thickness={5} />
		</Box>
	)
}
