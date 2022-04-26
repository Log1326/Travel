import React from 'react';
import useStyles from './styles'
import GoogleMapReact from 'google-map-react'
import {Paper, Rating, Typography, useMediaQuery} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {_img, _key} from "../../utils";
import mapStyles from "../../MapStyles";


const Map = ({setBounds,weatherData, setCoordinates, coordinates, places, setChildClicked}) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery(`(max-width:600px)`)
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{_key}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{disableDefaultUI:true,zoomControl:true,styles:mapStyles}}
                onChange={e => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) =>
                    <div className={classes.markerContainer} lat={+place.latitude} lng={+place.longitude} key={i}>
                        {isDesktop ? <LocationOnIcon color='primary' fontSize='large'/>
                            :
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant='subtitle2' gutterBottom>
                                    {place.name}
                                </Typography>
                                <img className={classes.paper}
                                     src={place.photo ? place.photo.images.small.url : _img} alt={place.name}/>
                                <Rating size='small' value={+place.rating} readOnly/>
                            </Paper>}
                    </div>
                )}
                {weatherData?.list?.map((data,i) =>
                <div key={i} lat={data.coords.lat} lng={data.coords.lng}>
                    <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icons}.png`} alt=''/>
                </div>
                )}
            </GoogleMapReact>
        </div>
    );
};

export default Map;