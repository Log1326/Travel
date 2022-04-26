import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import {Suspense} from "react";

const root = ReactDOM.createRoot(document.getElementById('root'))
const theme = createTheme()
root.render(
    <ThemeProvider theme={theme}>
        <Suspense fallback={<h1>loading...</h1>}>
            <App/>
        </Suspense>
    </ThemeProvider>
);

//https://www.youtube.com/watch?v=GDa8kZLNhJ4&t=23s
// https://rapidapi.com/apidojo/api/travel-advisor?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=DevRel&utm_campaign=DevRel
//https://rapidapi.com/community/api/open-weather-map?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=DevRel&utm_campaign=DevRel