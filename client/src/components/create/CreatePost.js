import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../services/api';
import { DataContext } from '../../context/DataProvider';


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: "10px",
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: 1px solid #000;
    padding: 10px;
    &:focus-visible {
        outline: none;
    }
`;


const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}


const CreatePost = () => {
    const navigate = useNavigate();  // navigate between pages after successfully posting.
    const location = useLocation();  // gets value from search bar(query param)

    const [file, setFile] = useState('');
    const [post, setPost] = useState(initialPost);
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80";

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file])

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name] : e.target.value })
    };

    const savePost = async () => {
        await API.createPost(post)   //(post) is the body in axios;
        navigate('/');
    }
    

    return (
        <Container>
            <Image src={url} alt="Uploaded-image" />

            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <Add sx={{':hover': { cursor:"pointer", color:"blue", transition: "ease-in 0.5s" }}} fontSize='large' color='action' />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField name='title' placeholder='Enter Title' onChange={(e) => handleChange(e)}/>
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <Textarea
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />

        </Container>
    );
}

export default CreatePost;