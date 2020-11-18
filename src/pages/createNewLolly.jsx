import React, {useRef, useState, useEffect} from 'react';
import Lolly from '../Components/lolly'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {navigate} from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Layout from '../Components/Layout';
import { makeStyles, createStyles, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles( 
  createStyles({
    root: {
      
      justifyContent:"center",
      display:"flex",
      flexDirection:"row",
      alignItems:"center",

    },
    form:{
        padding:"1em 2em 1em 2em",
        marginBottom:"1.5em",
        backgroundColor:"#00000033",
        boxShadow:"0 0 10px #00000033",
        texAlign:"left",
        fontStyle:"italic",
        fontSize:"1.1em",
    },
    input:{
        fontSize:".9em",
        width:"100%",
        padding:".4em .2em .4em .2em",
        margin:"0 -0.2em 0 -0.2em",
        border:"1px solid #fa73d9",
        color:"#fff",
        backgroundColor:"#222",
        boxShadow:"0 0 6px #fa73d9",
        marginBottom:"1em",
        textAlign:"start"
    },
    label:{
        textAlign:"start",
        fontFamily:"sens-serif",
        fontSize:".8em",
        display:"block",
        color:"#bbb",
        marginBottom:"2em",
        fontStyle:"normal",
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
    flavours:{
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        marginTop:"0",
        marginBottom:"3em",
    },
    colorPicker:{
    appearance:"square-button",
    height:" 60px",
    width:"60px",
    marginTop: "-10px",
    marginLeft:" -10px",
    cursor:"pointer",
    marginBottom:".9em",
    borderWidth:"1px",
    borderStyle:"solid",
    borderImage:"initial",
    borderColor:" -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))",
    backgroundColor: "#bbb",
    display: "inline-block",
    }
}))

const Add_lolly = gql`
    mutation addLolly($c1:String!,
        $c2:String!,
        $c3:String!,
        $sender:String!,
        $msg:String!,
        $reci:String!,
        
        ){
            addLolly(c1:$c1,c2:$c2,c3:$c3,sender:$sender,
                msg:$msg,reci:$reci) {
                    c1
                    c2
                    c3
                    sender
                    reci
                    msg
                    link
                }
        }
`;


export default function  () {
    const classes = useStyles()
    const [addLolly, { data }] = useMutation(Add_lolly);
    const [c1, setC1] = useState("#deaa43")
    const [c2, setC2] = useState("#e95946")
    const [c3, setC3] = useState("#d52358")


    const senderField = useRef();
    const msgField = useRef();
    const reciField = useRef();
    
        
    const handleSubmit = async () => {
        console.log(senderField.current.value)
        console.log(msgField.current.value)
        console.log(reciField.current.value)
        const result = await addLolly
        ({
            variables:{
                c1,c2,c3,
                sender:senderField.current.value,
                msg:msgField.current.value,
                reci:reciField.current.value,
                
            }
        })
        console.log('result from server', result.data);
        navigate(`/lollyCard?id=${result.data.addLolly.link}`)

    }
    useEffect(() => {
        async function runHook(){
            const response = await fetch("https://api.netlify.com/build_hooks/5fb3de89297e312637d9c693",{
                method: "POST"
            });
        }
        runHook()
    },[data])
    
    return(
        <Layout>
            <Grid container spacing={3} className={classes.root}>
            <Grid item xs={6}>
            <Box display="flex" flexDirection="row" >
            <Box p={5} m={5}>
            <Lolly Top={c1} Bottom={c3} Middle={c2}/>
            </Box>
            <Box className={classes.flavours}>
                <input type="color" className={classes.colorPicker} value={c1} onChange={(e)=>{setC1(e.target.value)}}/>
                <input type="color" className={classes.colorPicker} value={c2} onChange={(e)=>{setC2(e.target.value)}}/>
                <input type="color" className={classes.colorPicker} value={c3} onChange={(e)=>{setC3(e.target.value)}}/>
            </Box>
            </Box>
            </Grid>
            <Grid item xs={6}>
            <div className={classes.form}>
                <label htmlFor="to" className={classes.label}>To</label>
                <input as={TextField} name="to" type="text" className={classes.input} placeholder="A lolly for" ref={senderField}/>
                <label htmlFor="message" className={classes.label}>Say Something Nice</label>
                <TextareaAutosize name="message" type="text"  className={classes.input}  ref={msgField} rowsMin={10}/>
                <label htmlFor="from" className={classes.label}>From</label>
                <input as={TextField} name="from" type="text" className={classes.input} placeholder="from your friend" ref={reciField}/>
                
               
                
            </div>
            <button className={classes.button} onClick={handleSubmit}>Freeze this lolly & get a link</button>
            </Grid>
            </Grid>
        </Layout>
    )
}