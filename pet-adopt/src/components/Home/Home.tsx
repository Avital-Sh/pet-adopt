import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();


  return <Box sx={{ padding: 4 }}>
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Pet Haven!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Pet Haven is your go-to platform for connecting loving homes with adorable pets in need of adoption.
        Whether you're managing a pet adoption association or looking to adopt a new furry friend, we've got you covered.
      </Typography>
    </Paper>

    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Find Your New Best Friend
      </Typography>
      <Typography variant="body1" gutterBottom>
        As a visitor, you can:
      </Typography>
      <ul>
        <li>Browse through pets available for adoption.</li>
        <li>Apply to adopt a pet you fall in love with.</li>
        <li>Connect with local pet adoption associations.</li>
      </ul>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 2 }}
        onClick={() => navigate('/pets')}
      >
        Browse Pets
      </Button>
    </Paper>

  </Box>
}
export default Home; 