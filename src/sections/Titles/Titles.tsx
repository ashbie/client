import React from 'react';
import { server } from '../../lib/api';
import { TitlesArray, TokenObject } from './types';
// (state) use useState hook to keep track of the data from the server

interface Props {
    title: string;
}

const loginOptions = {
    endpoint: '/api/v1/auth/login',
    method: 'POST',
    body: JSON.stringify({
        username: "player2",
        email: "player2@gmail.com",
        password: "1234"
    })
};
const player2TokenTwo = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTRlYTZmYjQtZGVjOC00ZDQxLWI3MjMtOTFjYTY0OGI3NTdiIiwiaWF0IjoxNzMwMzgyNzU1LCJleHAiOjE3MzAzODYzNTV9.wNIlFuPZTIIpvg9yTXnu8qmapSseCa-uyAwLXi-zSeM';
const player2Token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTRlYTZmYjQtZGVjOC00ZDQxLWI3MjMtOTFjYTY0OGI3NTdiIiwiaWF0IjoxNzMwMzkwMzgyLCJleHAiOjE3MzAzOTM5ODJ9.Wv3n-TiCaKuLzyzdZU4xnqRsj1w68G2TLwxylDcaVXY';
// apparently, the above tokens are all user test's tokens; even though I logged in using player2's details 
const queryTitlesOptions = {
    endpoint: '/api/v1/title',
    method: 'GET',
    authorization: player2Token
};
export const Titles = (props: Props) => {
    const fetchTitles = async () => {
        const res = await server.fetch<TitlesArray>(queryTitlesOptions);
        console.log(res);
        console.log("\n" + res[0].title + "\n" + res[0].uuid + "\n" + res[0].createdAt + "\n" + res[0].deletedAt + "\n");
    }
    const fetchLogin = async () => {
        const res = await server.fetch<TokenObject>(loginOptions);
        console.log(res);
        console.log(res.token);
    }
    return <div>
        <h2>{props.title}</h2>
        <button onClick={fetchLogin}> Perform login </button>
        <button onClick={fetchTitles}> Get/Query Titles</button>
    </div>;
}
/* export const Titles2 = ({ title }: Props) => {
    return <h2>{title}</h2>;
} */