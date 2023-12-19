import { styled } from '@mui/material/styles'
import { TableHead } from '@mui/material'

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#374551' : '#1565C0'
}))
