import React from 'react';
import useStyles from './styles'
import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {_img} from "../../utils";

const PlaceDetails = ({place,refProp,selected}) => {
    const classes = useStyles()

    if (selected) refProp?.current?.scrollIntoView({behavior:'smooth',block:'start'})

    return (
        <Card elevation={6}>
            <CardMedia
                style={{height: 350}}
                image={place.photo ? place.photo.images.large.url : _img}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    {/*<Typography variant='subtitle1'>price</Typography>*/}
                    <Rating size='small' value={+place.rating} readOnly/>
                    <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>
                {place?.awards?.map(award =>
                    <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
                        <img key={`_id_number_${award.id}`} src={award.images.small} alt={award.display_name}/>
                        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                    </Box>
                )}
                {place?.cuisine?.map(({name}) => (
                    <Chip key={`_id_${name}`} size='small' label={name} className={classes.chip}/>
                ))}
                {place?.address &&
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon/> {place.address}
                    </Typography>}
                {place?.phone &&
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                        <LocalPhoneIcon/> {place.phone}
                    </Typography>}
                <CardActions>
                    <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_black')}>
                        Trip Advisor
                    </Button>
                    <Button size='small' color='primary' onClick={() => window.open(place.website, '_black')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default PlaceDetails;