import { SermonsResponse, SpeakersResponse } from '@/pocketbase-types';
import {
  AudioPlayer,
  AudioStatus,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';
import { usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';

interface AudioContextType {
  player: AudioPlayer;
  status: AudioStatus;
  sermon: SermonsResponse<{ speaker: SpeakersResponse }> | null;
  showMiniPlayer: boolean;
  setSermon: React.Dispatch<
    React.SetStateAction<SermonsResponse<{ speaker: SpeakersResponse }> | null>
  >;
  stopAudio: () => void;
}

const AudioContext = React.createContext<AudioContextType | null>(null);

export function useAudio() {
  return React.useContext(AudioContext);
}

export function AudioProvider(props: any) {
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);
  const pathname = usePathname();

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
      interruptionModeAndroid: 'doNotMix',
    });
  }, []);

  const [showMiniPlayer, setShowMiniPlayer] = useState<boolean>(false);

  const [sermon, setSermon] = useState<SermonsResponse<{
    speaker: SpeakersResponse;
  }> | null>(null);

  const stopAudio = () => {
    player.pause();
    setSermon(null);
    setShowMiniPlayer(false);
  };

  useEffect(() => {
    console.log(sermon);
    if (sermon?.audioUrl != null) {
      player.replace(sermon.audioUrl);
      player.play();
    }
  }, [sermon]);

  useEffect(() => {
    const inFullscreenPlayerGroup = pathname.includes('player');

    if (sermon && !inFullscreenPlayerGroup) {
      setShowMiniPlayer(true);
    } else if (inFullscreenPlayerGroup) {
      setShowMiniPlayer(false);
    }
  }, [sermon, pathname]);

  return (
    <AudioContext.Provider
      value={{
        player,
        status,
        sermon,
        showMiniPlayer,
        setSermon,
        stopAudio,
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}
