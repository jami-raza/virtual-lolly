import React from 'react';
import {useQueryParam} from 'gatsby-query-params';
import Lolly from '../Components/lolly';
import { gql, useQuery } from '@apollo/client';
import Layout from '../Components/Layout';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Link} from 'gatsby';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop:"1em",
      marginBottom:"1em",
      display:"block",
      marginBlockStart:"1em",
      marginBlockEnd:"1em",
      marginInlineStart:"0px",
      marginInlineEnd:"0px",
     

    },
    pre:{
        color:"#fa73d9",
        marginTop:".5em",
        padding:".5em 1em .5em 1em",
        border:"1px solid #000",
        backgroundColor:"#000",
    },
    info:{
    marginTop:"2em",
    padding:"1em 2em",
    marginBottom:" 1.5em",
    backgroundColor:"rgba(0,0,0,.2)",
    boxShadow:"0 0 10px rgba(0,0,0,.6)",
    textAlign:"left",
    fontStyle:"italic",
    fontSize:"1.1em",
    },
    reciptent:{
        padding:"2em 2em 2em 2em",
    fontFamily:"Yellowtail,cursive",
    fontSize:"1.6em",
    fontStyle:"normal",
    textShadow:"#000 0 0 10px",
    },
    link:{
        textDecoration:"none",
        color:"#fa73d9"
    },
    endBlock:{
        fontSize:".8em",
        color:"#ffffff99",
    }
}))

export const get_Lolly = gql`
 query MyQuery($link: String!){
    
            getlollyBypath(link: $link){
                c1
                c2
                c3
                sender
                msg
                reci
                link
            }  
        
      
    }
`
export default function lollyCard ({ location }) {
    const classes = useStyles();
    console.log(location)
    const id = useQueryParam("id","123")
    console.log("id", id)
    const {error, loading, data} = useQuery(get_Lolly,{
        variables:{ link: id }
    })
    console.log(data)
    return(
        <Layout>
            {loading && <p>Loading</p>}
            {error && <p>Error</p>}
            {data && data.getlollyBypath && 
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
            <div>
               <Lolly Top={data.getlollyBypath.c1} Middle={data.getlollyBypath.c2} Bottom={data.getlollyBypath.c3}/> 
               
            </div>
            </Grid>
            <Grid item xs={12} sm={8}>
            <p className={classes.title}>Your lolly is freezing. Share it with this link:</p>
            <div className={classes.pre}>{location.origin}/lolly/${data.getlollyBypath.link}</div>
            <br/>
            <div className={classes.info}>
            <p className={classes.reciptent}>{data.getlollyBypath.sender}</p>
            <p>{data.getlollyBypath.msg}</p>
            <p className={classes.reciptent}>___{data.getlollyBypath.reci}</p>
            </div>
            <div >
            <p className={classes.endBlock}>{data.getlollyBypath.msg}made this virtual lollipop for you. You can <Link className={classes.link} to="/createNewLolly">make your own</Link> to send to a friend who deserve some sugary treat which won't rot their teeth...</p>
            </div>
            </Grid>
            
            </Grid>}
        </Layout>
    )
}