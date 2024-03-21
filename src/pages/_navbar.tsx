import React, { useState } from 'react';
import {
    Button,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';


function NavbarCustom() {
    return (
        <div>
            <Navbar className={'bg-light'}>
                <NavbarBrand href="/"><img src={'/logo-solar.svg'} width={'30px'} height={'30px'} alt={'logo'} /> </NavbarBrand>
                 <w3m-button/>
            </Navbar>
        </div>
    );
}

export default NavbarCustom;