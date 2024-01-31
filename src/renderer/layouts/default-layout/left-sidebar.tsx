import styled from 'styled-components';
import { CollapsedSidebar } from '/@/renderer/features/sidebar/components/collapsed-sidebar';
import { Sidebar } from '/@/renderer/features/sidebar/components/sidebar';
import { useSidebarStore } from '/@/renderer/store';

const SidebarContainer = styled.aside`
    max-width: 120px;
    position: relative;
    grid-area: sidebar;
    background: var(--sidebar-bg);
    border-right: var(--sidebar-border);
`;

export const LeftSidebar = () => {
    const { collapsed } = useSidebarStore();

    return (
        <SidebarContainer id="sidebar">
            {collapsed ? <CollapsedSidebar /> : <Sidebar />}
        </SidebarContainer>
    );
};
