import { Card, CardContent, CardMedia, Typography } from "@mui/material"


interface PetCardProps {
  name: string
  age: number
  type: string
  imageUrl: string
}

const PetCard = ({ name, age, type, imageUrl }: PetCardProps) => {

  return (
    <Card sx={{ maxWidth: 500, height: 250, boxShadow: 3, margin: 1 }}>
      <CardMedia
        component="img"
        height="180"
        width="50"
        image={"http://localhost:8080/" + imageUrl}
        alt={type}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {age} years old
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PetCard