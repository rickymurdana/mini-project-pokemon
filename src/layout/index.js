import React from 'react';
import Nav from './Nav';
import Card from './Card';

const Layout = (props) => (
    <div>
        {props.children}
    </div>
);


export { Layout, Nav, Card };