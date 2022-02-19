import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom"
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <Grid container spacing={3}
              style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px"
              }}>
            <Paper
                elevation={1}
                style={{
                    padding: "15px",
                    margin: "30px",
                    display: "flex",
                    flexDirection: "column",

                }}>
                <h1>404: PAGE NOT FOUND</h1>
                <Button
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                    variant="contained"
                    color={'success'}
                    onClick={() => navigate("/")}>
                    HOME PAGE
                </Button>
            </Paper>
        </Grid>
    );
};

export default Page404;
