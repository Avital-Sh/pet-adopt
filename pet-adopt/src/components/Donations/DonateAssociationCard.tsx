import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import AssociationImage from './petAdoptionAssociation.png';

interface Props {
  name: string
  description: string
}

export default function DonateAssociationCard({ description, name }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={AssociationImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <form action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="hosted_button_id" value="SLLSJ8WZ4NNVN" />
          <input type="image" src="https://www.paypalobjects.com/en_US/IL/i/btn/btn_donateCC_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          <img alt="" src="https://www.paypal.com/en_IL/i/scr/pixel.gif" width="1" height="1" />
        </form>

      </CardActions>
    </Card>
  );
}