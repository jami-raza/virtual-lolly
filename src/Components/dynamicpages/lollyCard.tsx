import React from 'react';
import   gql  from 'graphql-tag';
import Lolly from '../lolly'
import {useQuery} from '@apollo/client';
 const query = gql`
{
        lolly {
            link
            c1
            c2
            c3
            sender
            msg
            reci
        }
      
    }
`
export default function lollyCard () {
    const {error, loading, data} = useQuery(query)
    if (loading) {
        return <div>loading</div>
    }
    if (error) {
        return <div>
            Error
        </div>
    }
    return(
        <div>
            <h1> Your lolly</h1>
            <div>
               <Lolly Top={data.lolly.c1} Middle={data.lolly.c2} Bottom={data.lolly.c3}/> 
               
            </div>
            <div><h2>Share lolly</h2>{`http://localhost/lolly/${data.lolly.link}`}</div>
            <div>
            <p>{data.lolly.sender}</p>
            <p>{data.lolly.msg}</p>
            <p>{data.lolly.reci}</p>
            </div>
        </div>
    )
}