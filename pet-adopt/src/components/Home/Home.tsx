import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

const ScrollableContainer = styled.div`
  height: calc(100vh - 250px);
  overflow-y: auto;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #5a487c, #a8a4d0);
    border-radius: 10px;
    height: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #7a6da8, #d0cbf0);
  }
`;

const ContentContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <ScrollableContainer>
      <ContentContainer>
        <video
          style={{ width: "200px", height: "200px", marginBottom: "16px" }}
          autoPlay
          playsInline
          muted
          loop
          src="/video/Dog.webm"
        />
        <Paper style={{ width: "70%", maxWidth: "1200px" }} elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Pet Haven!
          </Typography>
          <Typography variant="body1" paragraph>
            We, <strong>Avital Shafir</strong>, <strong>Linoy Peretz</strong>, and{" "}
            <strong>Ilay Mandil</strong>, are proud to present <strong>PetAdopt</strong>,
            a smart digital platform designed to revolutionize the pet adoption process.
          </Typography>

          <Typography variant="body1" paragraph>
            As co-founders of PetAdopt and students at{" "}
            <strong>The Academic College of Tel Aviv-Yafo</strong>, we are passionate
            about creating a meaningful impact by connecting adopters with their perfect
            furry companions while supporting animal shelters.
          </Typography>

          <Typography variant="body1" paragraph>
            Our platform offers:
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Personalized Pet Matching:</strong> Find pets that fit your lifestyle
            and preferences.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Community Support:</strong> Share and learn from other adopters
            through our vibrant forum.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Shelter Aid:</strong> Donate securely to help shelters provide for
            animals in need.
          </Typography>

          <Typography variant="body1" paragraph>
            Join us on this journey to make pet adoption smarter, more accessible, and
            more compassionate.
          </Typography>

          <Typography variant="body1" paragraph>
            Start your adoption journey with PetAdopt today!
          </Typography>
        </Paper>

        <Paper style={{ width: "70%", maxWidth: "1200px" }} elevation={3} sx={{ padding: 3 }}>
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
      </ContentContainer>
    </ScrollableContainer>
  );
};

export default Home;