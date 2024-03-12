import { Box } from "@mui/material";

export default function TabPanel({ children, index, value, }: { children?: React.ReactNode; index: number; value: number }) {
	return (
		<Box sx={{ py: 2 }} hidden={value !== index}>
			{value === index && children}
		</Box>
	)
}