import { Typography, Box, Divider } from "@mui/material"
const Home = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", p: 5 }}>
            <Typography variant="h6">Welcome to the admin portal</Typography>
            <Divider sx-={{ mt: 2 }} />
        </Box>
    );
}

export default Home;