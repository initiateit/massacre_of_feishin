import { NativeScrollArea, Spinner } from '/@/renderer/components';
import { AnimatedPage, LibraryHeaderBar } from '/@/renderer/features/shared';
import { useRef } from 'react';
import type { AgGridReact as AgGridReactType } from '@ag-grid-community/react/lib/agGridReact';
import { useAlbumDetail } from '/@/renderer/features/albums/queries/album-detail-query';
import { useParams } from 'react-router';
import { useFastAverageColor } from '/@/renderer/hooks';
import { AlbumDetailContent } from '/@/renderer/features/albums/components/album-detail-content';
import { AlbumDetailHeader } from '/@/renderer/features/albums/components/album-detail-header';
import { useCurrentServer } from '/@/renderer/store';

const AlbumDetailRoute = () => {
    const tableRef = useRef<AgGridReactType | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const { albumId } = useParams() as { albumId: string };
    const server = useCurrentServer();
    const detailQuery = useAlbumDetail({ query: { id: albumId }, serverId: server?.id });
    const { color: background, colorId } = useFastAverageColor({
        id: albumId,
        src: detailQuery.data?.imageUrl,
        srcLoaded: !detailQuery.isLoading,
    });

    if (!background || colorId !== albumId) {
        return <Spinner container />;
    }

    return (
        <AnimatedPage key={`album-detail-${albumId}`}>
            <NativeScrollArea
                ref={scrollAreaRef}
                pageHeaderProps={{
                    backgroundColor: background,
                    children: (
                        <LibraryHeaderBar>
                            {/* <LibraryHeaderBar.PlayButton onClick={handlePlay} /> */}
                            <LibraryHeaderBar.Title>
                                {detailQuery?.data?.name}
                            </LibraryHeaderBar.Title>
                        </LibraryHeaderBar>
                    ),
                    offset: 200,
                    target: headerRef,
                }}
            >
                <AlbumDetailHeader
                    ref={headerRef}
                    background={background}
                />
                <AlbumDetailContent
                    background={background}
                    tableRef={tableRef}
                />
            </NativeScrollArea>
        </AnimatedPage>
    );
};

export default AlbumDetailRoute;
