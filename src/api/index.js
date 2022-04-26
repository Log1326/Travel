import axios from "axios";


export const getPlacesData = async (type,sw, ne) => {
    try {

        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': '706aa53483msh2508c3d007cf607p15044djsnb2fef4830553'
            }
        })
        return data;
    } catch (e) {
        console.log(e)
    }
}

export const getWeather = async (lat,lng) => {
    try {
        const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{
            params: {lat: lat, lon: lng},
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': '706aa53483msh2508c3d007cf607p15044djsnb2fef4830553'
            }
        })
        return data;
    }catch (e) {
        
    }
}