import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const isActive = (path) => (match, location) => !console.log({match, location}) && !!(match || path === location.pathname);

export const NavLink = ({ to, children, ...rest }) => (
    <Link isActive={isActive(to)} to={to} {...rest}>{children}</Link>
)