import React,{ReactNode} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
}))

type Props = {
    children:ReactNode,
  }

export default function Layout({children}:Props){
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <h1 className={classes.h1}>Virtual Lollipop</h1>
            <p className={classes.header}>because we all know someone
                who deserves some sugar.</p>
                {children}
        </div>
    )
}