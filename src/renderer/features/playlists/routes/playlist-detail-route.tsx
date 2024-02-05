import { useRef } from 'react';
import type { AgGridReact as AgGridReactType } from '@ag-grid-community/react/lib/agGridReact';
import { useParams } from 'react-router';
import { NativeScrollArea, Spinner } from '/@/renderer/components';
import { PlaylistDetailContent } from '/@/renderer/features/playlists/components/playlist-detail-content';
import { PlaylistDetailHeader } from '/@/renderer/features/playlists/components/playlist-detail-header';
import { usePlaylistDetail } from '/@/renderer/features/playlists/queries/playlist-detail-query';
import { AnimatedPage, LibraryHeaderBar } from '/@/renderer/features/shared';
import { useFastAverageColor } from '/@/renderer/hooks';
import { useCurrentServer } from '../../../store/auth.store';

const PlaylistDetailRoute = () => {
    const tableRef = useRef<AgGridReactType | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const { playlistId } = useParams() as { playlistId: string };
    const server = useCurrentServer();

    const detailQuery = usePlaylistDetail({ query: { id: playlistId }, serverId: server?.id });
    const { color: background, colorId } = useFastAverageColor({
        algorithm: 'sqrt',
        id: playlistId,
        src: detailQuery?.data?.imageUrl,
        srcLoaded: !detailQuery?.isLoading,
    });

    if (!background || colorId !== playlistId) {
        return <Spinner container />;
    }

    return (
        <AnimatedPage key={`playlist-detail-${playlistId}`}>
            <NativeScrollArea
                ref={scrollAreaRef}
                pageHeaderProps={{
                    backgroundColor: background,
                    children: (
                        <LibraryHeaderBar>
                            <LibraryHeaderBar.Title>
                                {detailQuery?.data?.name}
                            </LibraryHeaderBar.Title>
                        </LibraryHeaderBar>
                    ),
                    offset: 200,
                    target: headerRef,
                }}
            >
                <PlaylistDetailHeader
                    ref={headerRef}
                    background={background}
                    imagePlaceholderUrl={detailQuery?.data?.imageUrl}
                    imageUrl={detailQuery?.data?.imageUrl}
                />
                <PlaylistDetailContent tableRef={tableRef} />
            </NativeScrollArea>
        </AnimatedPage>
    );
};

export default PlaylistDetailRoute;
