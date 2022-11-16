import { Box, styled, Typography } from '@mui/material';
import Banner from '../Banner/Banner'




const NameText = styled(Typography)`
    margin-top: 25px;
`;

const Account = () => {
    return(
        <Box>
            <Banner />
            <Box>
                <NameText variant='h3'>Hey! &#10; My Name is Laik Shaikh</NameText>
                <Typography sx={{
                    marginTop: "10px",
                    fontSize: '1.6rem',

                }}>I am a Computer Engineer Student at Mumbai University</Typography>
                
            </Box>
        </Box>
    );
}

export default Account;