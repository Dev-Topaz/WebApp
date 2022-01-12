import React from 'react';
import { Box, Button, Stack, Grid } from '@mui/material';
import SearchField from '../SearchField';
import SortByButton from '../SortBy';
import { SortOption } from 'src/types/select-types';
import { FilterButton } from './styles';
import { Grid24Filled, GridDots24Filled } from '@fluentui/react-icons';
import { SpacingProps } from '@mui/system';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface OptionsBarProps extends SpacingProps {
    handleKeyWordChange: (value: string) => void;
    sortOptions: SortOption[];
    sortSelected?: SortOption;
    handleSortChange: (value: string) => void;
    handleClickFilterButton: () => void;
    productViewMode: string;
    setProductViewMode: (value: 'grid1' | 'grid2') => void;
    filterBtnHidden?: boolean;
}

const OptionsBar: React.FC<OptionsBarProps> = ({
    handleKeyWordChange,
    sortOptions,
    sortSelected,
    handleSortChange,
    handleClickFilterButton,
    productViewMode,
    setProductViewMode,
    filterBtnHidden = false,
    ...otherProps
}): JSX.Element => {

    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownXs = useMediaQuery(theme.breakpoints.down('md'));
    const displayFilterLable = matchDownMd ? false : true;
    const onlyShowIcon = matchDownXs ? true : false;

    return (
        <Stack direction="row" spacing={{xs: 1, sm: 2}} {...otherProps}>
            <SearchField handleChange={handleKeyWordChange}  />
            <SortByButton
                options={sortOptions}
                title={sortSelected?.label}
                placeholder={"SORT BY"} 
                handleClick={handleSortChange}
                onlyShowIcon={onlyShowIcon}
            />
            {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={"age"}
                onChange={handleChange}
            >
                <Icon icon="ph:sort-ascending" fontSize={24} />
                {!onlyShowIcon && <>
                    {title ? title : placeholder}
                    <KeyboardArrowDownIcon className="arrow-icon" />
                </>}
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
            {!filterBtnHidden && (
                <FilterButton onClick={handleClickFilterButton}>
                    <Icon icon="ph:funnel" fontSize={20} color="#1890FF" style={{ marginRight: 4 }} />
                    {displayFilterLable && `Filter`}
                </FilterButton>
            )}
            <Box display="flex" borderRadius={3} sx={{ background: '#E8F4FF'}}>
                <Button
                    onClick={() => setProductViewMode('grid1')}
                    sx={{
                        borderRadius: 3,
                        color: productViewMode === 'grid1' ? 'white' : '#1890FF',
                        backgroundColor: productViewMode === 'grid1' ? '#1890FF !important' : '#E8F4FF',
                    }}
                >
                    <Grid24Filled />
                </Button>
                <Button
                    onClick={() => setProductViewMode('grid2')}
                    sx={{
                        // minWidth: 0,
                        borderRadius: 3,
                        color: productViewMode === 'grid2' ? 'white' : '#1890FF',
                        backgroundColor: productViewMode === 'grid2' ? '#1890FF !important' : '#E8F4FF',
                    }}
                >
                    <GridDots24Filled />
                </Button>
            </Box>
        </Stack>
    );
};

export default OptionsBar;
