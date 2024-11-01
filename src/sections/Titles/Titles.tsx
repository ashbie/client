import React, { useState, useEffect } from 'react';
import { server } from '../../lib/api';
import { TitleObject, TitlesArray, TokenObject, Options, deletedTitleObject, OptionsAndTitles } from './types';
// (state) use useState hook to keep track of the data from the server

interface Props {
    title: string;
}

const loginOptions: Options = {
    endpoint: '/api/v1/auth/login',
    method: 'POST',
    body: JSON.stringify({
        /* username: "player2",
        email: "player2@gmail.com", */
        username: "test",
        email: "test@gmail.com",
        password: "1234"
    })
};
const player2TokenTwo = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTRlYTZmYjQtZGVjOC00ZDQxLWI3MjMtOTFjYTY0OGI3NTdiIiwiaWF0IjoxNzMwMzgyNzU1LCJleHAiOjE3MzAzODYzNTV9.wNIlFuPZTIIpvg9yTXnu8qmapSseCa-uyAwLXi-zSeM';
const player2Token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTRlYTZmYjQtZGVjOC00ZDQxLWI3MjMtOTFjYTY0OGI3NTdiIiwiaWF0IjoxNzMwMzkwMzgyLCJleHAiOjE3MzAzOTM5ODJ9.Wv3n-TiCaKuLzyzdZU4xnqRsj1w68G2TLwxylDcaVXY';
// apparently, the above tokens are all user test's tokens; even though I logged in using player2's details 
const queryTitlesOptions: Options = {
    endpoint: '/api/v1/title',
    method: 'GET',
    authorization: ''
};

export const Titles = (props: Props) => {
    //const data  = useLoginThenFetch<OptionsAndTitles>(loginOptions, queryTitlesOptions, newTitleOptions.authorization);
    const [ titlesArrayData, setTitlesArrayData ] = useState<TitlesArray | null>(null);
   //  const [ tokenObjectData, settokenObjectData ] = useState<TokenObject | null>(null);
    const [ newTitleOptions, setNewTitleOptions ] = useState<Options>(queryTitlesOptions);
    const [ deletedTitlesArrayState, setDeletedTitlesArrayState ] = useState<deletedTitleObject[]>([]);
    //run on component mount
    useEffect(() => {
        fetchLogin();
    }, [])
    // run when dependency changes
    useEffect(() => {
        fetchTitles();
    }, [newTitleOptions.authorization])

    const fetchTitles = async () => {
        //Remove fetchLogin when proper logging-in has been implemented //await fetchLogin();

        //  const res = await server.fetch<TitleObject[]>(queryTitlesOptions); 
        const res = await server.fetch<TitlesArray>(newTitleOptions);
        /* console.log("\nTitles:");
        console.log(res);
        if(res[0]) {
            console.log("\n" + res[0].title + "\n" + res[0].uuid + "\n" + res[0].createdAt + "\n" + res[0].deletedAt + "\n");
        } */
       setTitlesArrayData(res);
    }
    const fetchLogin = async () => {
        console.log("TitleOptions before login:");
        console.log(newTitleOptions);
        const res = await server.fetch<TokenObject>(loginOptions);
        console.log(res);
        //newOptions.authorization = res.token;
        setNewTitleOptions({
            endpoint: '/api/v1/title',
            method: 'GET',
            authorization: res.token
        })
        /* console.log(res.token); */
        /* settokenObjectData(res); */
        /* if(tokenObjectData) { queryTitlesOptions.authorization = tokenObjectData.token; } */
        /* queryTitlesOptions.authorization = tokenObjectData ? tokenObjectData.token: ''; */
        console.log("TitleOptions after login:");
        console.log(newTitleOptions);
        //fetchTitles();
    }


    const deletedTitle = (uuid: string) => {
        // Filter out the title from titlesArrayData
        const updatedTitles = titlesArrayData?.filter((title) => title.uuid !== uuid) || [];

        // Find the title to delete
        const deletedTitle = titlesArrayData?.find((title) => title.uuid === uuid);

        // Update the states
        setTitlesArrayData(updatedTitles);
        if (deletedTitle) {
            setDeletedTitlesArrayState([...deletedTitlesArrayState, deletedTitle]);
        }
    };

    const titlesList = titlesArrayData && Array.isArray(titlesArrayData) ?
        (
            <ul>
                {
                    titlesArrayData.map((title) => {
                        return (
                            <li key={title.uuid}>
                                {title.title}
                                <button onClick={() => deletedTitle(title.uuid)}>Delete</button>
                            </li>
                        );
                    })
                }
            </ul>
        ) : null
    ;

    return <div>
        <h2>{props.title}</h2>
        {titlesList}
        <button onClick={fetchLogin}> Perform login </button>
        <button onClick={fetchTitles}> Get/Query Titles</button>
    </div>;
}
/* export const Titles2 = ({ title }: Props) => {
    return <h2>{title}</h2>;
} */