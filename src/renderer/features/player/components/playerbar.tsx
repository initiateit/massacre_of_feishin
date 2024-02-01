import { useCallback } from 'react';
import isElectron from 'is-electron';
import styled from 'styled-components';
import { useSettingsStore } from '/@/renderer/store/settings.store';
import { PlaybackType } from '/@/renderer/types';
import { AudioPlayer } from '/@/renderer/components';
import {
    useCurrentPlayer,
    useCurrentStatus,
    useMuted,
    usePlayer1Data,
    usePlayer2Data,
    usePlayerControls,
    useVolume,
} from '/@/renderer/store';
import { CenterControls } from './center-controls';
import { LeftControls } from './left-controls';
import { RightControls } from './right-controls';
import { PlayersRef } from '/@/renderer/features/player/ref/players-ref';

const PlayerbarContainer = styled.div`
    width: 100vw;
    height: 100%;
    background: var(--main-bg);
`;

const PlayerbarControlsGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 120px) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    height: 100%;

    @media (width <= 768px) {
        grid-template-columns: minmax(0, 0.5fr) minmax(0, 0.5fr) minmax(0, 1fr) minmax(0, 0.5fr);
    }
`;

const SpacerGridItem = styled.div`
    border-right: 1px solid rgba(220, 220, 220, 70%);
    align-self: center;
    width: 120px;
    background: var(--sidebar-bg);
    height: 100%;
    overflow: hidden;
`;

const RightGridItem = styled.div`
    padding-right: 1rem;
    border-top: 1px solid rgba(220, 220, 220, 70%);
    align-self: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--main-bg);
`;

const LeftGridItem = styled.div`
    padding-left: 1rem;
    border-top: 1px solid rgba(220, 220, 220, 70%);
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--main-bg);
`;

const CenterGridItem = styled.div`
    border-top: 1px solid rgba(220, 220, 220, 70%);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const remote = isElectron() ? window.electron.remote : null;

export const Playerbar = () => {
    const playersRef = PlayersRef;
    const settings = useSettingsStore((state) => state.playback);
    const volume = useVolume();
    const player1 = usePlayer1Data();
    const player2 = usePlayer2Data();
    const status = useCurrentStatus();
    const player = useCurrentPlayer();
    const muted = useMuted();
    const { autoNext } = usePlayerControls();

    const autoNextFn = useCallback(() => {
        const playerData = autoNext();

        if (remote) {
            remote.updateSong({
                currentTime: 0,
                song: playerData.current.song,
            });
        }
    }, [autoNext]);

    return (
        <PlayerbarContainer>
            <PlayerbarControlsGrid>
                <SpacerGridItem />
                <LeftGridItem>
                    <LeftControls />
                </LeftGridItem>
                <CenterGridItem>
                    <CenterControls playersRef={playersRef} />
                </CenterGridItem>
                <RightGridItem>
                    <RightControls />
                </RightGridItem>
            </PlayerbarControlsGrid>
            {settings.type === PlaybackType.WEB && (
                <AudioPlayer
                    ref={playersRef}
                    autoNext={autoNextFn}
                    crossfadeDuration={settings.crossfadeDuration}
                    crossfadeStyle={settings.crossfadeStyle}
                    currentPlayer={player}
                    muted={muted}
                    playbackStyle={settings.style}
                    player1={player1}
                    player2={player2}
                    status={status}
                    style={settings.style}
                    volume={(volume / 100) ** 2}
                />
            )}
        </PlayerbarContainer>
    );
};
