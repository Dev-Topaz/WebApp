import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { DialogTitleTypo, PageNumberTypo } from '../../styles';
import { PrimaryButton, SecondaryButton } from 'src/components/Buttons/styles';
import ELAPriceInput from '../../components/ELAPriceInput';
import { TypeSelectItem } from 'src/types/select-types';
import Select from 'src/components/Select';
import { SelectBtn } from './styles';
import { Icon } from '@iconify/react';

export interface ComponentProps {}

const PlaceBid: React.FC<ComponentProps> = (): JSX.Element => {
    const expirationOptions: Array<TypeSelectItem> = [
        {
            label: '7 days',
            value: '7 days',
        },
        {
            label: '3 days',
            value: '3 days',
        },
        {
            label: '1 day',
            value: '1 day',
        },
    ];
    const [expiration, setExpiration] = useState<TypeSelectItem>();
    const [expirationSelectOpen, setExpirationSelectOpen] = useState(false);

    const handleCategoryChange = (value: string) => {
        const item = expirationOptions.find((option) => option.value === value);
        setExpiration(item);
    };

    return (
        <Stack spacing={5} width={320} paddingY={6}>
            <Stack alignItems="center">
                <PageNumberTypo>1 of 2</PageNumberTypo>
                <DialogTitleTypo>Place Bid</DialogTitleTypo>
            </Stack>
            <Stack spacing={2}>
                <ELAPriceInput title="Bid Amount" />
                <Stack spacing={0.5}>
                    <Typography fontSize={12} fontWeight={700}>
                        Category
                    </Typography>
                    <Select
                        titlebox={
                            <SelectBtn fullWidth isOpen={expirationSelectOpen}>
                                {expiration ? expiration.label : 'Select'}
                                <Icon icon="ph:caret-down" className="arrow-icon" />
                            </SelectBtn>
                        }
                        options={expirationOptions}
                        isOpen={expirationSelectOpen}
                        handleClick={handleCategoryChange}
                        setIsOpen={setExpirationSelectOpen}
                    />
                </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
                <SecondaryButton fullWidth>close</SecondaryButton>
                <PrimaryButton fullWidth>Next</PrimaryButton>
            </Stack>
        </Stack>
    );
};

export default PlaceBid;
