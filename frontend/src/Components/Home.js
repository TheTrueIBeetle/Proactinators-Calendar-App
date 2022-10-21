import React, { useState, useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
// import Logo from "./worldimage.png"
import {
    AppBar,
    Toolbar,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    TextField,

} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import theme from "../theme";
import "../App.css";

//const bcrypt = require('bcrypt');
//import bcrypt from 'bcrypt';



const Home = () => {

    const initialState = {
        handleUsername: "",
        handlePassword: "",
        contactServer: false,
    };

    const GRAPHURL = "http://localhost:5000/graphql";

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const handleUsernameFunction = (event) => { setState(state.handleUsername = event.target.value); }
    const handlePasswordFunction = (event) => { setState(state.handlePassword = event.target.value); }

    const navigate = useNavigate();

    const registerPage = () => {
        navigate("/register")
    }


    const handleLoginButton = async () => {

        try {
            setState({
                contactServer: true,
            });

            let response = await fetch(GRAPHURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: `query {userlogin(username: "${state.handleUsername}", password: "${state.handlePassword}")
                    {msg}}`,
                }),
            });

            let json = await response.json();
            console.log(json);
            if (json.data.userlogin.msg) {
                alert("Successfully logged in");
            }
            else {
                alert("Login Failed");
            }

        } catch (error) {
            console.log(error);
        }

    }

    const emptyorundefined =
        state.handleUsername === "" || state.handleUsername == undefined ||
        state.handlePassword === "" || state.handlePassword == undefined


    return (
        <ThemeProvider theme={theme}>

            <Card style={{ textAlign: 'center' }}>


                {/* add our own logo maybe ?  */}
                {/* <img src={Logo} alt="Logo" style={{width:"50%",marginTop:70, marginLeft:100,marginBottom:-50}}/> */}
                <CardHeader
                    title="ProActinators"
                    style={{ marginTop: 30 }}
                />

                <CardHeader
                    title="Login here"
                    style={{ marginTop: 50 }}
                />

                <Card style={{ boxShadow: "none" }} >
                    <TextField
                        style={{ marginTop: 20 }}
                        label="Enter username"
                        onChange={handleUsernameFunction}
                    />
                </Card>
                <Card style={{ boxShadow: "none" }} >
                    <TextField
                        style={{ marginTop: 20, marginBottom: 20 }}
                        label="Enter password"
                        onChange={handlePasswordFunction}
                    />
                </Card>


                <Button
                    disabled={emptyorundefined}
                    color="secondary" variant="contained" onClick={handleLoginButton}>
                    Login
                </Button>

                <CardHeader
                    title="Not registered?"
                    style={{ marginTop: 60 }}
                />

                <Button style={{ marginBottom: 30 }} color="secondary" variant="contained" onClick={registerPage}>
                    Register here
                </Button>



            </Card>
        </ThemeProvider>
    );
};
export default Home;
