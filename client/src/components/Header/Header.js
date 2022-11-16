import { useState } from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { Link, useNavigate  } from 'react-router-dom'
import { API } from "../../services/api";

const Component = styled(AppBar)`
    background: black;
    color: #fff;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #fff;
        text-decoration: none;
    }
    & >a:hover {
        color: grey
    }
`

const Header = () => {
    const token = sessionStorage.getItem('accessToken').split(" ")[1];
    const navigate = useNavigate();

    const logout = async () =>{
        let response = await API.userLogout(token)
        if(response){
            sessionStorage.clear()
            navigate('/login');
        } else {
            console.log("error");
        }
    };


    return(
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link onClick={() => logout()}>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;