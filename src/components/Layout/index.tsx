import { Box } from '@mui/material';
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Container from '../Container';
import MintNFTDlgContainer from 'src/components/TransactionDialogs/MintNFT';

const Layout: React.FC = ({ children }): JSX.Element => {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    paddingY: 3,
                    position: 'fixed',
                    top: 0,
                    background: '#FFFFFF',
                    zIndex: 20,
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                <Container>
                    <Header />
                </Container>
            </Box>
            <Box paddingTop={{ xs: 4, md: 12 }} paddingBottom={{ xs: 12, md: 4 }}>
                <Container>{children}</Container>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    background: 'white',
                    zIndex: 20,
                    display: { sm: 'none' },
                }}
            >
                <Container>
                    <Footer />
                </Container>
            </Box>
            <MintNFTDlgContainer />
        </>
    );
};

export default Layout;
