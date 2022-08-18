import React, { useState, useMemo, useEffect } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { AdminTableColumn, AdminUsersItemType } from 'src/types/admin-table-data-types';
import { blankAdminUserItem } from 'src/constants/init-constants';
import Table from 'src/components/Admin/Table';
import CustomTextField from 'src/components/TextField';
import { PrimaryButton } from 'src/components/Buttons/styles';
import { Icon } from '@iconify/react';
import ModalDialog from 'src/components/ModalDialog';
import Moderators from 'src/components/Admin/Dialogs/Users/Moderators';
import { reduceHexAddress } from 'src/services/common';
import { getAdminSearchParams, getAdminUserList } from 'src/services/fetch';
import { useSignInContext } from 'src/context/SignInContext';
import { useDialogContext } from 'src/context/DialogContext';

const AdminUserModerators: React.FC = (): JSX.Element => {
    const statusValues = [
        { label: 'User', bgcolor: '#E8F4FF', color: '#1890FF' },
        { label: 'Moderator', bgcolor: '#0B1054', color: '#FFFFFF' },
    ];

    const columns: AdminTableColumn[] = [
        {
            id: 'address',
            label: 'Address',
            cell: (props) => <Typography fontSize={16}>{reduceHexAddress(props.value, 7)}</Typography>,
            width: 80,
        },
        {
            id: 'username',
            label: 'Username',
            cell: (props) => (
                <Typography fontSize={16}>
                    {props.value.length > 10 ? reduceHexAddress(props.value, 4) : props.value}
                </Typography>
            ),
            width: 80,
        },
        {
            id: 'avatar',
            label: 'Avatar',
            cell: (props) => (
                <Box borderRadius="50%" width={50} height={50} overflow="hidden" alignSelf="center">
                    {props.value === '' ? (
                        <Icon icon="ph:user" fontSize={40} color="#1890FF" />
                    ) : (
                        <img src={props.value} width="100%" height="100%" style={{ objectFit: 'cover' }} alt="" />
                    )}
                </Box>
            ),
            width: 80,
        },
        {
            id: 'status',
            label: 'Status',
            cell: (props) => (
                <Typography
                    display="inline-block"
                    fontSize={14}
                    fontWeight={500}
                    paddingX={1}
                    paddingTop="2px"
                    paddingBottom="1px"
                    borderRadius={2}
                    color={statusValues[props.value].color}
                    sx={{ background: statusValues[props.value].bgcolor }}
                >
                    {statusValues[props.value].label}
                </Typography>
            ),
            width: 80,
        },
        {
            id: 'remarks',
            label: '',
        },
        {
            id: 'edits',
            label: '',
            cell: (props) => (
                <PrimaryButton
                    btn_color={(props.data as AdminUsersItemType).status === 0 ? 'green' : 'pink'}
                    size="small"
                    sx={{ paddingX: 3, display: signInDlgState.userRole === 0 ? 'inline-flex' : 'none' }}
                    onClick={(event: React.MouseEvent) => onEdit(event, props.data)}
                >
                    {(props.data as AdminUsersItemType).status === 0 ? 'ADD MODERATOR' : 'remove Moderator'}
                </PrimaryButton>
            ),
        },
    ];

    const data: AdminUsersItemType[] = useMemo(() => [...Array(1).keys()].map((item) => blankAdminUserItem), []);
    const [signInDlgState] = useSignInContext();
    const [dialogState, setDialogState] = useDialogContext();
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNum, setPageNum] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [tabledata, setTableData] = useState(data);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputString, setInputString] = useState<string>('');
    const [keyWord, setKeyWord] = useState<string>('');
    const [id2Edit, setId2Edit] = useState<number>(0);
    const [showModeratorsDlg, setShowModeratorsDlg] = useState<boolean>(false);
    const [emptyString, setEmptyString] = useState<string>('');

    useEffect(() => {
        let unmounted = false;
        const getFetchData = async () => {
            setIsLoading(true);
            const _adminUserList = await getAdminUserList(
                keyWord,
                getAdminSearchParams(undefined, undefined, pageNum + 1, pageSize),
                1 /** 0: from Admin page, 1: from Moderators page, 2: from Banned Users page */,
                signInDlgState.token
            );
            if (!unmounted) {
                setEmptyString(
                    _adminUserList.result === 0
                        ? keyWord
                            ? 'No results found'
                            : 'No Listed Moderators'
                        : 'This address has already been added as a moderator',
                );
                setTotalCount(_adminUserList.totalCount);
                setTableData(_adminUserList.data);
                setIsLoading(false);
            }
        };
        getFetchData().catch(console.error);
        return () => {
            unmounted = true;
        };
    }, [keyWord, pageNum, pageSize]);

    const onEdit = (event: React.MouseEvent, data: AdminUsersItemType) => {
        event.stopPropagation();
        setId2Edit(tabledata.findIndex((value: AdminUsersItemType) => value.address === data.address));
        setShowModeratorsDlg(true);
    };

    const updateUserList = (editedItem: AdminUsersItemType) => {
        setTableData((prevState: AdminUsersItemType[]) => {
            const userList = [...prevState];
            userList[id2Edit] = editedItem;
            return userList;
        });
        setInputString('');
        setKeyWord('');
    };

    return (
        <>
            <Stack height="100%" spacing={4}>
                <Stack direction="row" alignItems="flex-end" columnGap={1}>
                    <CustomTextField
                        title="Add Moderator"
                        inputValue={inputString}
                        placeholder="Search for an address or username"
                        changeHandler={(value: string) => setInputString(value)}
                        sx={{ width: 320 }}
                    />
                    <PrimaryButton size="small" sx={{ paddingX: 3 }} onClick={() => setKeyWord(inputString)}>
                        <Icon
                            icon="ph:magnifying-glass"
                            fontSize={20}
                            color="white"
                            style={{ marginBottom: 2, marginRight: 4 }}
                        />
                        {`Search`}
                    </PrimaryButton>
                </Stack>
                <Table
                    totalCount={totalCount}
                    pageNum={pageNum}
                    pageSize={pageSize}
                    tabledata={tabledata}
                    columns={columns}
                    checkable={false}
                    isLoading={isLoading}
                    height="calc(100% - 62px - 32px)"
                    emptyString={emptyString}
                    setPageNum={setPageNum}
                    setPageSize={setPageSize}
                />
            </Stack>
            <ModalDialog
                open={showModeratorsDlg}
                onClose={() => {
                    setShowModeratorsDlg(false);
                    setDialogState({ ...dialogState, progressBar: 0 });
                }}
            >
                <Moderators
                    user2Edit={tabledata.length === 0 ? blankAdminUserItem : tabledata[id2Edit]}
                    handleUserUpdate={updateUserList}
                    onClose={() => {
                        setShowModeratorsDlg(false);
                        setDialogState({ ...dialogState, progressBar: 0 });
                    }}
                />
            </ModalDialog>
        </>
    );
};

export default AdminUserModerators;
