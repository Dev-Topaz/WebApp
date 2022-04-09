import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductPageHeader from 'src/components/ProductPageHeader';
import { Stack, Grid, Box, Skeleton, Typography } from '@mui/material';
import ProductImageContainer from 'src/components/ProductImageContainer';
import ProductSnippets from 'src/components/ProductSnippets';
import ProductBadge from 'src/components/ProductBadge';
import ELAPrice from 'src/components/ELAPrice';
import ProductTransHistory from 'src/components/ProductTransHistory';
import ProjectDescription from 'src/components/SingleNFTMoreInfo/ProjectDescription';
import AboutAuthor from 'src/components/SingleNFTMoreInfo/AboutAuthor';
import ChainDetails from 'src/components/SingleNFTMoreInfo/ChainDetails';
import NFTTransactionTable from 'src/components/NFTTransactionTable';
import PriceHistoryView from 'src/components/PriceHistoryView';
import { getMintCategory } from 'src/services/common';
import { enumBadgeType, TypeProduct, TypeNFTTransaction, TypeNFTHisotry } from 'src/types/product-types';
import { getNFTLatestTxs, getELA2USD, getMyFavouritesList, getMyNFTItem } from 'src/services/fetch';
import { useSignInContext } from 'src/context/SignInContext';
import Container from 'src/components/Container';
import { blankNFTItem } from 'src/constants/init-constants';

const MyNFTSold: React.FC = (): JSX.Element => {
    const params = useParams();
    const navigate = useNavigate();
    const [signInDlgState] = useSignInContext();
    const [productDetail, setProductDetail] = useState<TypeProduct>(blankNFTItem);
    const [prodTransHistory, setProdTransHistory] = useState<Array<TypeNFTHisotry>>([]);
    const [transactionsList, setTransactionsList] = useState<Array<TypeNFTTransaction>>([]);

    useEffect(() => {
        let unmounted = false;
        const fetchMyNFTItem = async () => {
            const ELA2USD = await getELA2USD();
            const likeList = await getMyFavouritesList(signInDlgState.isLoggedIn, signInDlgState.userDid);
            const _MyNFTItem = await getMyNFTItem(params.id, ELA2USD, likeList);
            if (!unmounted) {
                setProductDetail(_MyNFTItem);
            }
        };
        if (signInDlgState.isLoggedIn) fetchMyNFTItem().catch(console.error);
        else navigate('/');
        return () => {
            unmounted = true;
        };
    }, [signInDlgState.isLoggedIn, signInDlgState.userDid, params.id]);

    useEffect(() => {
        let unmounted = false;
        const fetchLatestTxs = async () => {
            const _NFTTxs = await getNFTLatestTxs(params.id, signInDlgState.walletAccounts[0], 1, 1000);
            if (!unmounted) {
                setTransactionsList(_NFTTxs.txs.slice(0, 5));
                setProdTransHistory(_NFTTxs.history);
            }
        };
        fetchLatestTxs().catch(console.error);
        return () => {
            unmounted = true;
        };
    }, [params.id, signInDlgState.walletAccounts]);

    const updateProductLikes = (type: string) => {
        let prodDetail: TypeProduct = { ...productDetail };
        if (type === 'inc') {
            prodDetail.likes += 1;
        } else if (type === 'dec') {
            prodDetail.likes -= 1;
        }
        setProductDetail(prodDetail);
    };

    useEffect(() => {
        let unmounted = false;
        const updateProductViews = (tokenId: string) => {
            if (signInDlgState.isLoggedIn && tokenId) {
                const reqUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1/incTokenViews`;
                const reqBody = {
                    token: signInDlgState.token,
                    tokenId: tokenId,
                    did: signInDlgState.userDid,
                };
                fetch(reqUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.code === 200) {
                            if (!unmounted) {
                                setProductDetail((prevState: TypeProduct) => {
                                    const prodDetail: TypeProduct = { ...prevState };
                                    prodDetail.views += 1;
                                    return prodDetail;
                                });
                            }
                        } else {
                            console.log(data);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        };
        updateProductViews(productDetail.tokenId);
        return () => {
            unmounted = true;
        };
    }, [productDetail.tokenId, signInDlgState.isLoggedIn, signInDlgState.token, signInDlgState.userDid]);

    return (
        <Container sx={{ paddingTop: { xs: 4, sm: 0 } }}>
            <ProductPageHeader />
            <Grid container marginTop={5} columnSpacing={5} rowGap={1}>
                <Grid item xs={12} md={6}>
                    {productDetail.tokenId === '' ? (
                        <Box
                            position="relative"
                            borderRadius={4}
                            overflow="hidden"
                            sx={{ width: '100%', paddingTop: '75%' }}
                        >
                            <Box position="absolute" sx={{ inset: 0 }}>
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width="100%"
                                    height="100%"
                                    sx={{ bgcolor: '#E8F4FF' }}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <ProductImageContainer product={productDetail} updateLikes={updateProductLikes} />
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    {productDetail.tokenId === '' ? (
                        <>
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width="100%"
                                height={45}
                                sx={{ borderRadius: 2, bgcolor: '#E8F4FF' }}
                            />
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width="100%"
                                height={45}
                                sx={{ borderRadius: 2, bgcolor: '#E8F4FF', marginTop: 2 }}
                            />
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width="100%"
                                height={56}
                                sx={{ borderRadius: 2, bgcolor: '#E8F4FF', marginTop: 3 }}
                            />
                        </>
                    ) : (
                        <>
                            <Typography fontSize={56} fontWeight={700} lineHeight={1}>
                                {productDetail.name}
                            </Typography>
                            <ProductSnippets
                                nickname={productDetail.author}
                                likes={productDetail.likes}
                                views={productDetail.views}
                                sx={{ marginTop: 1 }}
                            />
                            <Stack direction="row" alignItems="center" spacing={1} marginTop={3}>
                                <ProductBadge badgeType={enumBadgeType.Sold} />
                                <ProductBadge badgeType={getMintCategory(productDetail.category)} />
                            </Stack>
                            <ELAPrice
                                price_ela={productDetail.price_ela}
                                price_usd={productDetail.price_usd}
                                marginTop={3}
                            />
                        </>
                    )}
                </Grid>
            </Grid>
            {productDetail.tokenId === '' ? (
                <Box position="relative" marginTop={5} sx={{ width: '100%', paddingTop: '75%' }}>
                    <Box position="absolute" sx={{ inset: 0 }}>
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width="100%"
                            height="100%"
                            sx={{ borderRadius: 4, bgcolor: '#E8F4FF' }}
                        />
                    </Box>
                </Box>
            ) : (
                <Grid container marginTop={5} columnSpacing={10} rowGap={5}>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={5}>
                            <ProductTransHistory historyList={prodTransHistory} />
                            <ProjectDescription description={productDetail.description} />
                            <Box>
                                <Grid container columnSpacing={10} rowGap={5}>
                                    <Grid item xs={12} sm={6} md={12}>
                                        <AboutAuthor
                                            name={productDetail.author}
                                            description={productDetail.authorDescription}
                                            img={productDetail.authorImg}
                                            address={productDetail.authorAddress}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={12}>
                                        <ChainDetails
                                            tokenId={productDetail.tokenIdHex}
                                            ownerName={productDetail.holderName}
                                            ownerAddress={productDetail.holder}
                                            royalties={productDetail.royalties}
                                            createTime={productDetail.createTime}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={10}>
                            <NFTTransactionTable transactionsList={transactionsList} />
                            <PriceHistoryView createdTime={productDetail.timestamp ? productDetail.timestamp : 1640962800} creator={productDetail.author} />
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default MyNFTSold;
