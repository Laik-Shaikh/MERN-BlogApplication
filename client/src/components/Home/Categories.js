import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled, Tab } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data'
const StyledButton = styled(Button)`
margin: 20px;
width: 85%;
background: #6495ED;
color: #fff;
text-decoration: none;
`;

const StyledTable = styled(Table)`
border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    width: 100%;
`;


const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }} >
                <StyledButton variant='contained'>Create Blog</StyledButton>
            </Link>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{':hover':{ 
                                backgroundColor:"darkblue",
                                color: "white",
                                transition: "ease-in 0.5s",
                                cursor:"pointer"
                                }}}
                        >
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { categories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell sx={{':hover':{ 
                                backgroundColor:"darkblue",
                                color: "white",
                                transition: "ease-in 0.5s",
                                cursor:"pointer"
                                }}}>
                                <StyledLink to={`/?category=${category.title}`}>
                                        {category.title}
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;