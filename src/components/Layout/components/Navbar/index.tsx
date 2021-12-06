import React from 'react';
import { TypeNavbarItem } from 'src/types/layout-types';
import NavbarItem from './components/NavbarItem';
import { Box } from '@mui/material';
import { Home24Filled, AppFolder24Filled, Box24Filled, Person24Filled } from '@fluentui/react-icons';

const navbarItemList: Array<TypeNavbarItem> = [
    {
        icon: Home24Filled,
        title: "Home",
        url: "/"
    },
    {
        icon: AppFolder24Filled,
        title: "Explore",
        url: "/explore"
    },
    {
        icon: Box24Filled,
        title: "Blind Box",
        url: "/blind-box"
    },
    {
        icon: Person24Filled,
        title: "Profile",
        url: "/profile"
    }
];

const Navbar: React.FC = (): JSX.Element => {
    return <Box sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
    }}>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: '35px',
            paddingRight: '35px',
            paddingBottom: '30px',
        }}>
            {navbarItemList.map((item, index) => <NavbarItem key={`navbaritem-${index}`} data={item} />)}
        </Box>
    </Box>
};

export default Navbar;
