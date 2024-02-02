import { useRef } from 'react';
import { useParams } from 'react-router';
import { NativeScrollArea, Spinner } from '/@/renderer/components';
import { AlbumArtistDetailContent } from '/@/renderer/features/artists/components/album-artist-detail-content';
import { AlbumArtistDetailHeader } from '/@/renderer/features/artists/components/album-artist-detail-header';
import { useAlbumArtistDetail } from '/@/renderer/features/artists/queries/album-artist-detail-query';
import { AnimatedPage, LibraryHeaderBar } from '/@/renderer/features/shared';
import { useFastAverageColor } from '/@/renderer/hooks';
import { useCurrentServer } from '/@/renderer/store';

const AlbumArtistDetailRoute = () => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const server = useCurrentServer();

    const { albumArtistId } = useParams() as { albumArtistId: string };
    const detailQuery = useAlbumArtistDetail({
        query: { id: albumArtistId },
        serverId: server?.id,
    });
    const { color: background, colorId } = useFastAverageColor({
        id: albumArtistId,
        src: detailQuery.data?.imageUrl,
        srcLoaded: !detailQuery.isLoading,
    });

    if (!background || colorId !== albumArtistId) {
        return <Spinner container />;
    }

    return (
        <AnimatedPage key={`album-artist-detail-${albumArtistId}`}>
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
                <AlbumArtistDetailHeader
                    ref={headerRef}
                    background={background}
                />
                <AlbumArtistDetailContent background={background} />
            </NativeScrollArea>
        </AnimatedPage>
    );
};

export default AlbumArtistDetailRoute;
