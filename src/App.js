import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import ListComponent from "./components/List/ListComponent";
import Map from "./components/Map/Map";
import {CssBaseline, Grid} from '@mui/material'
import {getPlacesData, getWeather} from "./api";

const App = () => {
    const [places, setPlaces] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [childClicked, setChildClicked] = useState(null)
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})
    const [bounds, setBounds] = useState({sw: '', ne: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
    }, [])

    useEffect(() => {
        const filteredPlaces = places.filter(place => place.rating > rating)
        setFilteredPlaces(filteredPlaces)
    }, [rating])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)

            getWeather(coordinates.lat, coordinates.lng)
                .then(data => setWeatherData(data))

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
                    setFilteredPlaces([])
                    setIsLoading(false)
                })
        }
    }, [bounds, type])
    return (
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{widows: '100%'}}>
                <Grid item xs={12} md={4}>
                    <ListComponent
                        setRating={setRating}
                        setType={setType}
                        type={type}
                        rating={rating}
                        isLoading={isLoading}
                        childClicked={childClicked}
                        places={filteredPlaces.length ? filteredPlaces : places}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        weatherData={weatherData}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;