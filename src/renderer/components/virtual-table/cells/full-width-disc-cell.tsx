import { useState } from 'react';
import { ICellRendererParams } from '@ag-grid-community/core';
import { Group } from '@mantine/core';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Button } from '/@/renderer/components/button';
import { Paper } from '/@/renderer/components/paper';
import { getNodesByDiscNumber, setNodeSelection } from '../utils';

const Container = styled(Paper)`
    display: flex;
    height: 100%;
    padding: 1rem 0;
    border: 1px solid transparent;
`;

export const FullWidthDiscCell = ({ node, data, api }: ICellRendererParams) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleToggleDiscNodes = () => {
        if (!data) return;
        const discNumber = Number(node.data.id.split('-')[1]);
        const nodes = getNodesByDiscNumber({ api, discNumber });

        setNodeSelection({ isSelected: !isSelected, nodes });
        setIsSelected((prev) => !prev);
    };

    return (
        <Container>
            <Group
                position="apart"
                w="100%"
            >
               
            </Group>
        </Container>
    );
};
