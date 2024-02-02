import { PaperProps } from '@mantine/core';
import styled from 'styled-components';
import { Paper } from '/@/renderer/components';

const StyledFilterBar = styled(Paper)`
    z-index: 1;
    padding: 1rem;
    box-shadow: 0px 2px 15px 9px rgba(0, 0, 0, 0.075);
`;

export const FilterBar = ({ children, ...props }: PaperProps) => {
    return <StyledFilterBar {...props}>{children}</StyledFilterBar>;
};
