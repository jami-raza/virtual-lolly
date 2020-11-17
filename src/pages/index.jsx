import React from 'react'
import Lolly from '../Components/lolly';
import {navigate} from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


export default function (){
    return(
        <div>
            <Grid container spacing={5} style={{display:"flex"}}>
                <Grid item xs={12} sm={6} md={4}>
                    <Lolly 
                    Top="#5ADF49"
                    Middle="#5211A2"
                    Bottom="#D00B0B"
                    />

                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Lolly 
                    Top="#5ADG56"
                    Middle="#5211A2"
                    Bottom="#D00B0B"
                    />

                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Lolly 
                    Top="#5ADG56"
                    Middle="#5211A2"
                    Bottom="#D00B0B"
                    />

                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Lolly 
                    Top="#5ADG56"
                    Middle="#5211A2"
                    Bottom="#D00B0B"
                    />

                </Grid>
                

            </Grid>
            <Button onClick={()=>{navigate(`/createNewLolly`)}} 
            variant="contained" color="secondary"
            >
                Create Lolly
            </Button>
        </div>
    )
}