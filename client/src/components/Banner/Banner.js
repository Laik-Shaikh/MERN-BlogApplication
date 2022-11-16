import { Box, styled, Typography } from "@mui/material";

const Image = styled(Box)`
  background: url(https://firebasestorage.googleapis.com/v0/b/my-image-bucket-b421d.appspot.com/o/MyOwnLogo%2Fblog-logo.png?alt=media&token=ad92fd0a-375d-4666-a572-8a526b3a6f73);
    center repeat-x #000;
  background-size: cover;
  width: 100%;
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  color: #ffffff;
  line-height: 1;
`;

const SubHeading = styled(Typography)`
  font-size: 40px;
  margin-top: 20px;
  background: #ffffff;
  border-radius: 10px;
`;

const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>Create Your Own Space</SubHeading>
    </Image>
  );
};

export default Banner;
