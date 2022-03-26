import React, { useState } from 'react';
import { Stack, Typography, Grid } from '@mui/material';
import { DialogTitleTypo, PageNumberTypo, DetailedInfoTitleTypo, DetailedInfoLabelTypo } from '../../styles';
import { PrimaryButton, SecondaryButton } from 'src/components/Buttons/styles';
import WarningTypo from '../../components/WarningTypo';
import { useSignInContext } from 'src/context/SignInContext';
import { useDialogContext } from 'src/context/DialogContext';
import { useSnackbar } from 'notistack';
import { essentialsConnector } from 'src/components/ConnectWallet/EssentialsConnectivity';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { isInAppBrowser } from 'src/services/wallet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { callContractMethod } from 'src/components/ContractMethod';
import { blankContractMethodParam } from 'src/constants/init-constants';

export interface ComponentProps {}

const ReviewBidDetails: React.FC<ComponentProps> = (): JSX.Element => {
    const [signInDlgState] = useSignInContext();
    const [dialogState, setDialogState] = useDialogContext();
    const { enqueueSnackbar } = useSnackbar();
    const [onProgress, setOnProgress] = useState<boolean>(false);
    const walletConnectProvider: WalletConnectProvider = isInAppBrowser()
        ? window.elastos.getWeb3Provider()
        : essentialsConnector.getWalletConnectProvider();
    const { library } = useWeb3React<Web3Provider>();
    const walletConnectWeb3 = new Web3(
        signInDlgState.loginType === '1' ? (walletConnectProvider as any) : (library?.provider as any),
    );

    const handlePlaceBid = () => {
        if (dialogState.placeBidTxFee > signInDlgState.walletBalance) {
            enqueueSnackbar('Insufficient balance!', {
                variant: 'error',
                anchorOrigin: { horizontal: 'right', vertical: 'top' },
            });
            return;
        }
        setOnProgress(true);
        setDialogState({
            ...dialogState,
            waitingConfirmDlgOpened: true,
            waitingConfirmDlgTimer: setTimeout(() => {
                setDialogState({
                    ...dialogState,
                    errorMessageDlgOpened: true,
                    waitingConfirmDlgOpened: false,
                });
            }, 120000),
        });
        callContractMethod(walletConnectWeb3, {
            ...blankContractMethodParam,
            contractType: 2,
            method: 'bidForOrder',
            price: BigInt(dialogState.placeBidAmount * 1e18).toString(),
            orderId: dialogState.placeBidOrderId,
            _price: BigInt(dialogState.placeBidAmount * 1e18).toString(),
            didUri: signInDlgState.didUri,
        })
            .then((txHash: string) => {
                enqueueSnackbar('Place bid succeed!', {
                    variant: 'success',
                    anchorOrigin: { horizontal: 'right', vertical: 'top' },
                });
                setDialogState({
                    ...dialogState,
                    placeBidDlgOpened: true,
                    placeBidDlgStep: 2,
                    placeBidTxHash: txHash,
                    waitingConfirmDlgOpened: false,
                });
            })
            .catch((error) => {
                enqueueSnackbar(`Place bid error: ${error}!`, {
                    variant: 'error',
                    anchorOrigin: { horizontal: 'right', vertical: 'top' },
                });
                setDialogState({
                    ...dialogState,
                    placeBidDlgOpened: false,
                    waitingConfirmDlgOpened: false,
                    errorMessageDlgOpened: true,
                });
            })
            .finally(() => {
                setOnProgress(false);
            });
    };

    return (
        <Stack spacing={5} width={340}>
            <Stack alignItems="center">
                <PageNumberTypo>2 of 2</PageNumberTypo>
                <DialogTitleTypo>Review Bid Details</DialogTitleTypo>
            </Stack>
            <Stack alignItems="center" paddingX={6} paddingY={4} borderRadius={4} sx={{ background: '#F0F1F2' }}>
                <Grid container rowSpacing={0.5}>
                    <Grid item xs={6}>
                        <DetailedInfoTitleTypo>Item</DetailedInfoTitleTypo>
                    </Grid>
                    <Grid item xs={6}>
                        <DetailedInfoLabelTypo>{dialogState.placeBidName}</DetailedInfoLabelTypo>
                    </Grid>
                    <Grid item xs={6}>
                        <DetailedInfoTitleTypo>Bid Amount</DetailedInfoTitleTypo>
                    </Grid>
                    <Grid item xs={6}>
                        <DetailedInfoLabelTypo>{dialogState.placeBidAmount} ELA</DetailedInfoLabelTypo>
                    </Grid>
                    {/* <Grid item xs={6}>
                        <DetailedInfoTitleTypo>Expires in</DetailedInfoTitleTypo>
                    </Grid>
                    <Grid item xs={6}>
                        <DetailedInfoLabelTypo>{dialogState.placeBidExpire.value}</DetailedInfoLabelTypo>
                    </Grid> */}
                    <Grid item xs={6}>
                        <DetailedInfoTitleTypo>Tx Fees</DetailedInfoTitleTypo>
                    </Grid>
                    <Grid item xs={6}>
                        <DetailedInfoLabelTypo>{dialogState.placeBidTxFee} ELA</DetailedInfoLabelTypo>
                    </Grid>
                    <Grid item xs={6}>
                        <DetailedInfoTitleTypo>Total</DetailedInfoTitleTypo>
                    </Grid>
                    <Grid item xs={6}>
                        <DetailedInfoLabelTypo sx={{ fontWeight: 700 }}>
                            {dialogState.placeBidAmount + dialogState.placeBidTxFee} ELA
                        </DetailedInfoLabelTypo>
                    </Grid>
                </Grid>
            </Stack>
            <Stack alignItems="center" spacing={1}>
                <Typography fontSize={14} fontWeight={600}>
                    Available: {signInDlgState.walletBalance} ELA
                </Typography>
                <Stack direction="row" width="100%" spacing={2}>
                    <SecondaryButton
                        fullWidth
                        onClick={() => {
                            setDialogState({
                                ...dialogState,
                                placeBidDlgOpened: true,
                                placeBidDlgStep: 0,
                                placeBidAmount: 0,
                                // placeBidExpire: { label: '', value: '' },
                                placeBidTxHash: '',
                            });
                        }}
                    >
                        Back
                    </SecondaryButton>
                    <PrimaryButton fullWidth disabled={onProgress} onClick={handlePlaceBid}>
                        Confirm
                    </PrimaryButton>
                </Stack>
                <WarningTypo width={240}>
                    In case of payment problems, please contact the official customer service
                </WarningTypo>
            </Stack>
        </Stack>
    );
};

export default ReviewBidDetails;
