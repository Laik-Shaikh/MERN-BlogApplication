import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../services/api';

import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '25%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = "https://firebasestorage.googleapis.com/v0/b/my-image-bucket-b421d.appspot.com/o/Icons%2Fspeech-bubble.png?alt=media&token=9e5e8678-34ae-4084-8e8f-a04ce3fae661";

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toogle, setToogle] = useState(false);
    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if(response.isTrue){
                setComments(response.data);
            }
        }
        getData();
    }, [toogle, post]);

    const handleChange = (e) => {
        setComment({ ...comment,
        name: account.username,
        postId: post._id,
        comments: e.target.value
        });
    }

    const addComment = async () => {
        await API.newComment(comment);
        setComment(initialValue)
        setToogle(prevState => !prevState);
    }

    return(
        <Box>
            <Container>
                <Image src={url} alt="comments" />
                <StyledTextArea
                    minRows={5}
                    placeholder="Add a comment"
                    onChange={(e) => handleChange(e)}
                />
                <Button
                    variant='contained'
                    color='primary'
                    size='medium'
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >
                    Post
                </Button>
            </Container>

            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToogles={setToogle} />       // setToogles is pass as prop not setToogle
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;