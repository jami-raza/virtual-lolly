import React from 'react'
import Lolly from '../Components/lolly';
import {navigate} from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Layout from '../Components/Layout';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
      justifyContent:"center",
      alignItems:"center",
      color:'#dadadb',
      fontaFamily:"open-sans,Helvetica,sans-serif",
      lineHeight:"1.8px",
      minHeight:"100vh",
      textAlign:'center',
      backgroundColor:'#21212b',
      margin:"10px",
      padding:"10px",

    },
    lolly:{
        width:"150px",
        height:"50px"
    },
    button:{
        marginTop:"1em",
        boxShadow:"0 0 6px #fa73d9",
        border:"2px solid #fa73d9",
        backgroundColor:"transparent",
        fontSize:".9em",
        color:"#fa73d9",
        padding:"1em 2em",
        borderRadius:"4em",
        cursor:"pointer",
        '&:hover':{
            backgroundColor:"#fa73d9",
            color:"#fff",
        }
    },
    h1:{
        marginTop:"40px",
        fontWeight:"bolder",
        color:"#fff",
        borderBottomStyle:"none",
        textShadow:"#fa73d9 0 0 8px"
    },
    header:{
        textAlign:"center",
        marginTop:"40px",
        fontWeight:"bolder",
        color:"#fff",
        borderBottomStyle:"none",
        textShadow:"#fa73d9 0 0 8px",
        
    },
    
    
}));
export default function LollyHome(){
    const classes = useStyles()
    return(
            <Layout>
            <Grid container spacing={1} style={{justifyContent:"center"}}className={classes.root}>
            
                <Grid item xs={12} sm={6} md={3}>
                    <Lolly 
                    Top="#5ADF49"
                    Middle="#5211A2"
                    Bottom="#AF4E41"
                    
                    />

                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Lolly 
                    Top="#8C14A3"
                    Middle="#501D63"
                    Bottom="#E48FEA"
                    
                    />

                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <Lolly 
                    Top="#5E1A03"
                    Middle="#492C18"
                    Bottom="#C87A5F"
                    />

                </Grid>
                
                <Grid xs={12} >
                <div >
            <Button onClick={()=>{navigate(`/createNewLolly`)}} 
            className={classes.button}
            
            >
                Create Lolly
            </Button>
            </div>
            </Grid>  

            </Grid>
            
        </Layout>
    )
}