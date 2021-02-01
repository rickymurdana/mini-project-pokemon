import React from 'react';
import { NavLink } from "react-router-dom";

function Nav() {
    const navs = [
        {
            path: '/',
            name: 'List Pokemon'
        },
        {
            path: '/mypokemon',
            name: 'My Pokemon'
        }
    ]

    return (
        <nav className='bg-gray-600 text-gray-300 p-4'>
            <ul className='flex space-x-10 justify-end'>
                {navs.map((navItem, index) => (
                    <li key={index}>
                        <NavLink exact to={navItem.path} activeClassName='text-gray-100'>
                            {navItem.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav;