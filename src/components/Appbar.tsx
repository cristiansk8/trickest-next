import React from "react";
import SigninButton from "./SigninButton";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";


const Appbar = () => {
  return (
    <>
      <Navbar shouldHideOnScroll>
        <NavbarBrand>
          <p className="font-bold text-inherit">SKATES-CO</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Top skates
            </Link>
          </NavbarItem>         
        </NavbarContent>
        <NavbarContent justify="end">    
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              <SigninButton />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Appbar;
