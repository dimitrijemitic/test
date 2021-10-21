import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";

import { Button, Container, Nav, Navbar, NavbarBrand, NavbarText, NavItem, Row, } from 'reactstrap';

import LoginService from "../api/LoginService";
import UserContext from "../contexts/userContext";

export default function Dashboard() {
    const history = useHistory();

    const handleChangeRoute = (route) => history.push(route);

    // use context here
    const { user } = useContext(UserContext);

    const handleLogOut = () => {
        LoginService.logOutUser();
        handleChangeRoute('/');
    }

    return (
        <DefaultNavbar
            user={user}
            handleLogout={handleLogOut}
        />
    )
}


const DefaultNavbar = (props) => {

    const { user, handleLogout } = props;

    return (
        <Row>
            <Container fluid>
                <Navbar color="light" light expand="md" className="px-4 justify-content-between">
                    <NavbarBrand>Bootstrap 🤬🤬🤬</NavbarBrand>
                    <Nav navbar className="align-middle">
                        <NavbarText style={{ marginRight: '5px', fontWeight: 'bold' }}>
                            {user?.firstName}
                        </NavbarText>
                        <NavbarText style={{ marginRight: '15px', fontWeight: 'bold' }}>
                            {user?.lastName}
                        </NavbarText>
                        <NavItem className="float-end">
                            <Button color="danger" onClick={() => handleLogout()}>
                                Log out
                            </Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </Container>
        </Row>
    );
}
