import React from 'react';
import {useQueryParam} from 'gatsby-query-params';
import Lolly from '../Components/lolly';
import { gql, useQuery } from '@apollo/client';

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
    console.log(location)
    const id = useQueryParam("id","123")
    console.log("id", id)
    const {error, loading, data} = useQuery(get_Lolly,{
        variables:{ link: id }
    })
    console.log(data)
    return(
        <div>
            {loading && <p>Loading</p>}
            {error && <p>Error</p>}
            {data && data.getlollyBypath && 
            <div>
            <h1> Your lolly</h1>
            <div>
               <Lolly Top={data.getlollyBypath.c1} Middle={data.getlollyBypath.c2} Bottom={data.getlollyBypath.c3}/> 
               
            </div>
            <h2>Share lolly</h2>
            <div>{location.origin}/lolly/${data.getlollyBypath.link}</div>
            <div>
            <p>{data.getlollyBypath.sender}</p>
            <p>{data.getlollyBypath.msg}</p>
            <p>{data.getlollyBypath.reci}</p>
            </div>
            </div>}
        </div>
    )
}