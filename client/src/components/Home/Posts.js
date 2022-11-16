import { useEffect, useState } from "react";
 
import { Grid, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../services/api";

import Post from "./Post";


const Posts = () => {
    const [posts, getPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fecthData = async () => {
            let response = await API.getAllPosts({ category: category || '' });
            if(response.isTrue) {
                getPosts(response.data)
            }
        }
        fecthData();
    }, [category]);


    return(
        <>
            {
                posts?.length ? posts.map(post => (
                    <Grid key={post._id} item lg={3} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
        </>
    )
}

export default Posts;