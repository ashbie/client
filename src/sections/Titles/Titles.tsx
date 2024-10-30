import React from 'react';

interface Props {
    title: string;
}
export const Titles = (props: Props) => {
    return <h2>{props.title}</h2>;
}
/* export const Titles2 = ({ title }: Props) => {
    return <h2>{title}</h2>;
} */