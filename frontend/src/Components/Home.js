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



const Home = () => {

    const initialState = {
        handleUsername: "",
        handlePassword: "",
        holdPasswordData: "",
        isClicked: false,
    };

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const handleUsernameFunction = (event) => { setState(state.handleUsername = event.target.value); }
    const handlePasswordFunction = (event) => { setState(state.handlePassword = event.target.value, state.holdPasswordData = event.target.value); }

    const handleToggleShowPassword = (event) => {
        if (state.isClicked === false) setState(state.isClicked = true)
        else setState(state.isClicked = false)
    }

    const navigate = useNavigate();
    const registerPage = () => {
        navigate("/register")
    }

    // TODO for backend developer : link up login button to backend

    const handleLoginButton = async () => {
        // try {
        //     let query = JSON.stringify({
        //         query: `mutation {addproject(teamName: "${state.teamName}", projectName: "${state.projectName}", projectStartDate: "${state.projectStartDate}", hoursEquivanlentToStoryPoint: ${state.numHoursForStoryPoint}, totalEstNumberOfStoryPoints: ${state.numEstimatedStoryPoints}, totalEstCostForDevelopment: ${state.estimatedCostForDevelopment}, sprintNumber: ${state.sprintNumber})
        //                 { teamName, projectName, projectStartDate, hoursEquivanlentToStoryPoint, totalEstNumberOfStoryPoints, totalEstCostForDevelopment, sprintNumber }}`,
        //     });

        //     await fetch('http://localhost:5000/graphql', {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json; charset=utf-8",
        //         },
        //         body: query,
        //     });
        //     console.log(`save all textfield data mutation complete`);

        // } catch (error) {
        //     console.log(`error adding all textfield data mutation: ${error}`);
        // }
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
                        style={{ marginTop: 20, width: '15%' }}
                        label="Enter username"
                        onChange={handleUsernameFunction}
                    />
                </Card>

                <Card style={{ boxShadow: "none" }} >
                    {state.isClicked &&
                        <TextField
                            value={state.holdPasswordData}
                            style={{ marginTop: 20, width: '15%' }}
                            label="Enter password"
                            onChange={handlePasswordFunction}
                        />
                    }
                    {!state.isClicked &&
                        <TextField
                            value={state.holdPasswordData}
                            type="password"
                            style={{ marginTop: 20, width: '15%' }}
                            label="Enter password"
                            onChange={handlePasswordFunction}
                        />
                    }
                    <Card>
                        <Button
                            style={{ fontSize: 10 }}
                            color="primary" onClick={handleToggleShowPassword}>
                            Show Password
                        </Button>
                    </Card>

                </Card>


                <Button
                    style={{ marginTop: 30 }}
                    disabled={emptyorundefined}
                    color="secondary" variant="contained" onClick={handleLoginButton}>
                    Login
                </Button>

                <CardHeader
                    title="Not registered?"
                    style={{ marginTop: 30 }}
                />

                <Button style={{ marginBottom: 30 }} color="secondary" variant="contained" onClick={registerPage}>
                    Register here
                </Button>



            </Card>
        </ThemeProvider>
    );
};
export default Home;
