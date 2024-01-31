import type { ReactNode } from 'react';
import type { IHeaderParams } from '@ag-grid-community/core';
import { AiOutlineNumber } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { RiHeartLine, RiMoreFill, RiStarLine } from 'react-icons/ri';
import styled from 'styled-components';
import { _Text } from '/@/renderer/components/text';

type Presets = 'duration' | 'rowIndex' | 'userFavorite' | 'userRating' | 'actions';

type Options = {
    children?: ReactNode;
    position?: 'left' | 'center' | 'right';
    preset?: Presets;
};

export const HeaderWrapper = styled.div<{ $position: Options['position'] }>`
    display: flex;
    justify-content: ${(props) =>
        props.$position === 'right'
            ? 'flex-end'
            : props.$position === 'center'
            ? 'center'
            : 'flex-start'};
    width: 100%;
    font-family: var(--content-font-family);
    text-transform: uppercase;
`;

const HeaderText = styled(_Text)<{ $position: Options['position'] }>`
    width: 100%;
    height: 100%;
    font-weight: 500;
    line-height: inherit;
    color: var(--main-bg);
    text-align: ${(props) =>
        props.$position === 'right'
            ? 'flex-end'
            : props.$position === 'center'
            ? 'center'
            : 'flex-start'};
    text-transform: uppercase;
    &:hover {
        color: var(--main-fg);
    }
`;
const HoverIcon = styled.span`
    &:hover {
        svg {
            color: #222; // The color on hover
        }
    }
`;

const StyledMoreFill = styled(RiMoreFill)`
    color: var(--main-bg);
`;

const StyledRiHeartLine = styled(RiHeartLine)`
    color: var(--main-bg);
`;

const StyledFiClock = styled(FiClock)`
    color: var(--main-bg);
`;

const StyledAiOutlineNumber = styled(AiOutlineNumber)`
    color: var(--main-bg);
`;

const StyledRiStarLine = styled(RiStarLine)`
    color: var(--main-bg);
`;

const headerPresets = {
    actions: (
        <HoverIcon>
            <StyledMoreFill size="1em" />
        </HoverIcon>
    ),
    duration: (
        <HoverIcon>
            <StyledFiClock size="1em" />
        </HoverIcon>
    ),
    rowIndex: (
        <HoverIcon>
            <StyledAiOutlineNumber size="1em" />
        </HoverIcon>
    ),
    userFavorite: (
        <HoverIcon>
            <StyledRiHeartLine size="1em" />
        </HoverIcon>
    ),
    userRating: (
        <HoverIcon>
            <StyledRiStarLine size="1em" />
        </HoverIcon>
    ),
    // ... other presets
};



export const GenericTableHeader = (
    { displayName }: IHeaderParams,
    { preset, children, position }: Options,
) => {
    if (preset) {
        return <HeaderWrapper $position={position}>{headerPresets[preset]}</HeaderWrapper>;
    }

    return (
        <HeaderWrapper $position={position}>
            <HeaderText
                $position={position}
                overflow="hidden"
                weight={500}
            >
                {children || displayName}
            </HeaderText>
        </HeaderWrapper>
    );
};

GenericTableHeader.defaultProps = {
    position: 'left',
    preset: undefined,
};
