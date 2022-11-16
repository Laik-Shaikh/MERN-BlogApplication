import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, styled, Button, TextField } from '@mui/material';

import { API } from '../../services/api';
import { DataContext } from "../../context/DataProvider";


// styled Component
const Component = styled(Box)`
    width:400px;
    margin: auto;
    box-shadow: 5px 1px  2px rgb(0 0 0/ 0.6)
`;

const Image = styled('img')({
    width: "70%",
    display: "flex",
    margin: 'auto',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 25px 35px;
    overflow: auto;
    & > div, & > button, & > p {
        margin-top: 20px
    }
`;

const LoginButton = styled(Button)`
    color: #fff;
    text-transform: none;
    border-radius: 2px;
    background: #FB641B;
    height: 48px
`;

const Text = styled(Typography)`
    text-align: center;
    color: #878787;
    font-size: 16px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`
const Error = styled(Typography)`
    font: 10px;
    color: #ff6;
    margin-top: 10px;
    font-weight: 600px
`





//---------

const initialSignupValues = {
    name: "",
    username: "",
    password: "",
}

const  initialLogininValues = {
    username: "",
    password: ""
}

const Login = ({ isUserAuthenticated }) => {
    const imageURL = 'https://firebasestorage.googleapis.com/v0/b/my-image-bucket-b421d.appspot.com/o/MyOwnLogo%2Fblog-logo.png?alt=media&token=ad92fd0a-375d-4666-a572-8a526b3a6f73';
    const navigate = useNavigate();

    const [account, toggleAccount] = useState('login');
    const [signupValues, setSignupValues] = useState(initialSignupValues);
    const [loginValues, setLoginValues] = useState(initialLogininValues);
    const [error, showError] = useState('');

    const { setAccount } = useContext(DataContext)
    

    const handleToggle = () => {
        account === 'login'? toggleAccount('signup'): toggleAccount('login')
    };

    const handleSignupChanges = (e) => {
        setSignupValues({ ...signupValues, [e.target.name] : e.target.value});
    }
    const handleLoginChanges = (e) => {
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        let response = await API.userSignup(signupValues);
        if(response.isTrue) {
            showError('');
            setSignupValues(initialSignupValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const loginUser = async () => {
        let response = await API.userLogin(loginValues);
        if(response.isTrue) {
            showError("");

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLoginValues(initialLogininValues);
            navigate('/');
        } else {
            alert("Something went wrong! please try again later");
        }
    }
    
    // console.log(signupValues)
    return(
        <Component>
           <Box>
            <Image src={imageURL} alt="blog-logo" />
                { account === 'login'? 
                    <Wrapper>
                        <TextField required label="Enter Your Username" variant="standard" name="username" onChange={(e) => handleLoginChanges(e)} />
                        <TextField required type="password" label="Enter Password" variant="standard" name="password" onChange={(e) => handleLoginChanges(e)} />
                        {error && <Error>{error}</Error>}
                        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text>OR</Text>
                        <SignupButton onClick={handleToggle} >Create an Account</SignupButton>
                    </Wrapper>
                    : 
                    <Wrapper>
                        <TextField required type='text' label="Enter Your Name" name="name" onChange={(e) => handleSignupChanges(e)} variant="standard" />
                        <TextField required type='text' label="Enter Your Username" name="username" onChange={(e) => handleSignupChanges(e)} variant="standard" />
                        <TextField required type='password' label="Enter Password" name="password" onChange={(e) => handleSignupChanges(e)} variant="standard" />
                        
                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>
                        <Text>OR</Text>
                        <LoginButton variant="contained" onClick={handleToggle} >Already have an Account</LoginButton>
                    </Wrapper>
                }
                

                
           </Box>
        </Component>
    );
}

export default Login;