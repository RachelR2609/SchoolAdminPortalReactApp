import { Typography, Box, Divider } from "@mui/material"
const Teachers = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", p: 5 }}>
            <Typography variant="h6">Teachers</Typography>
            <Divider sx-={{ mt: 2 }} />
        </Box>
    );
}

export default Teachers;