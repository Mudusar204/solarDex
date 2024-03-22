import React from 'react';
import {Navbar, NavbarBrand} from "reactstrap";
import Image from 'next/image'

function NavbarCustom() {

    return <div>
        <Navbar className={'bg-light'}>
            <NavbarBrand href="/">
                <Image src='/logo-solar.svg'
                     width='35'
                     height='35'
                     alt={'logo'}/>
            </NavbarBrand>
            <w3m-button/>
        </Navbar>
    </div>;
}

export default NavbarCustom;