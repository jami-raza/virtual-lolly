import React, {useRef, useState} from 'react';
import Lolly from '../Components/lolly'
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import {Formik,Form,Field,} from 'formik';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'

const Get_lolly = gql`
{
    lolly
}
`;
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
                    id
                }
        }
`;


export default function(){

    const [addLolly] = useMutation(Add_lolly);
    const [c1, setC1] = useState("#deaa43")
    const [c2, setC2] = useState("#e95946")
    const [c3, setC3] = useState("#d52358")
    const [sender, setSender] = useState("")
    const [msg, setMsg] = useState("")
    const [reci, setReci] = useState("")

    const senderField = useRef();
    const msgField = useRef();
    const reciField = useRef();

    const handleSubmit = () => {
        console.log(senderField.current.value)
        console.log(msgField.current.value)
        console.log(reciField.current.value)
        addLolly({
            variables:{
                c1,c2,c3,
                sender:senderField.current.value,
                msg:msgField.current.value,
                reci:reciField.current.value
            }
        })
        

    }
    const {error, loading, data} = useQuery(Get_lolly)
    return(
        <div>
            Start the lolly creation
            <Lolly Top={c1} Bottom={c2} Middle={c3}/>
            <div>
                <input type="color" value={c1} onChange={(e)=>{setC1(e.target.value)}}/>
                <input type="color" value={c2} onChange={(e)=>{setC2(e.target.value)}}/>
                <input type="color" value={c3} onChange={(e)=>{setC3(e.target.value)}}/>
            </div>
            <div>
                
                <input type="text" placeholder="To" ref={senderField}/>
                <input type="text" placeholder="Msg" ref={msgField}/>
                <input type="text" placeholder="From" ref={reciField}/>
                <button onClick={handleSubmit}>Create lolly</button>
                
            </div>
        </div>
    )
}