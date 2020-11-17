import React, {useRef, useState} from 'react';
import Lolly from '../Components/lolly'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import shortid from 'shortid';
import {navigate} from 'gatsby';
import Grid from '@material-ui/core/Grid';

const Add_lolly = gql`
    mutation addLolly($c1:String!,
        $c2:String!,
        $c3:String!,
        $sender:String!,
        $msg:String!,
        $reci:String!,
        $link:String!
        ){
            addLolly(c1:$c1,c2:$c2,c3:$c3,sender:$sender,
                msg:$msg,reci:$reci,link:$link) {
                    msg
                    link
                }
        }
`;


export default function  () {

    const [addLolly] = useMutation(Add_lolly);
    const [c1, setC1] = useState("#deaa43")
    const [c2, setC2] = useState("#e95946")
    const [c3, setC3] = useState("#d52358")


    const senderField = useRef();
    const msgField = useRef();
    const reciField = useRef();
    const id = shortid.generate();
        
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
                link: id
            }
        })
        console.log('result from server', result.data);
        navigate(`../Components/dynamicpages/lollyCard`)

    }
    
    return(
        <div>
            <Grid>
            Start the lolly creation
            <Lolly Top={c1} Bottom={c2} Middle={c3}/>
            <div>
                <input type="color" value={c1} onChange={(e)=>{setC1(e.target.value)}}/>
                <input type="color" value={c2} onChange={(e)=>{setC2(e.target.value)}}/>
                <input type="color" value={c3} onChange={(e)=>{setC3(e.target.value)}}/>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder="To" ref={senderField}/>
                <input type="text" placeholder="Msg" ref={msgField}/>
                <input type="text" placeholder="From" ref={reciField}/>
                
                <button type="submit">Freeze</button>
                </form>
            </div>
            </Grid>
        </div>
    )
}