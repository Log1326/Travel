import React, {createRef, useEffect, useState} from 'react';
import useStyles from './styles'
import {CircularProgress, FormControl, Grid, MenuItem, Select, Typography} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import InputLabel from '@mui/material/InputLabel'

const ListComponent = ({places, childClicked, isLoading,rating,type,setType,setRating}) => {
    const classes = useStyles()

    const [elRefs, setElRefs] = useState([])

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())
        setElRefs(refs)
    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>

            {isLoading ? <div className={classes.loading}>
                    <CircularProgress size='5rem'/>
                </div>
                :
                <>
                    <FormControl className={classes.formControl} style={{marginBottom: 25, marginTop: 20}}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            label={'Type'}
                            value={type}
                            onChange={e => setType(e.target.value)}
                            style={{width: 100}}
                        >
                            <MenuItem value='restaurants'>Restaurants</MenuItem>
                            <MenuItem value='hotels'>Hotels</MenuItem>
                            <MenuItem value='attractions'>Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} style={{marginLeft: 20, marginTop: 20}}>
                        <InputLabel>Rating</InputLabel>
                        <Select
                            label={'Rating'}
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            style={{width: 100}}
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) =>
                            <Grid ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={+childClicked === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        )}
                    </Grid>
                </>
            }
        </div>
    );
};

export default ListComponent;