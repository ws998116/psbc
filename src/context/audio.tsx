import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { router, usePathname, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { Sermon } from "../app/api/series+api";

interface AudioContextType {
  sound: Sound | null;
  setSound: React.Dispatch<React.SetStateAction<Audio.Sound | null>>;
  playbackStatus: AVPlaybackStatusSuccess | null;
  setPlayBackStatus: React.Dispatch<
    React.SetStateAction<AVPlaybackStatusSuccess | null>
  >;
  sermon: Sermon | null;
  showMiniPlayer: boolean;
  sermonUrl: string | null;
  setSermonUrl: React.Dispatch<React.SetStateAction<string | null>>;
  playbackPositionPercent: number;
  stopAudio: () => Promise<void>;
  rewindAudio: () => Promise<void>;
  fastforwardAudio: () => Promise<void>;
}

const AudioContext = React.createContext<AudioContextType | null>(null);

// This hook can be used to access the user info.
export function useAudio() {
  return React.useContext(AudioContext);
}

export function AudioProvider(props: any) {
  const pathname = usePathname();

  const [sound, setSound] = useState<Sound | null>(null);
  const [playbackStatus, setPlayBackStatus] =
    useState<AVPlaybackStatusSuccess | null>(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState<boolean>(false);

  const [sermonUrl, setSermonUrl] = useState<string | null>(null);
  const [sermon, setSermon] = useState<Sermon | null>(null);

  const [playbackPositionPercent, setPlaybackPositionPercent] =
    useState<number>(0);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if ("error" in status) {
      console.error(status);
    } else {
      let s = status as AVPlaybackStatusSuccess;
      setPlayBackStatus(s);
    }
  };

  const setupAudio = async (audioLink: string) => {
    if (sound?._loaded) {
      await sound.unloadAsync();
    }

    const { sound: playbackObject } = await Sound.createAsync(
      { uri: audioLink },
      { shouldPlay: true },
      (status) => onPlaybackStatusUpdate(status),
      false
    );

    setSound(playbackObject);
  };

  const stopAudio = async () => {
    if (sound != null) {
      console.log("Audio", "stopping");
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch (error) {
        console.warn("Error stopping audio", { error });
      }
      setSound(null);
      setSermonUrl(null);
      setPlayBackStatus(null);
      setShowMiniPlayer(false);
    }
  };

  const rewindAudio = async () => {
    if (sound != null) {
      console.log("Audio", "rewinding");
      try {
        await sound.setPositionAsync(
          (playbackStatus?.positionMillis ?? 15000) - 15000
        );
      } catch (error) {
        console.warn("Error rewinding audio", { error });
      }
    }
  };

  const fastforwardAudio = async () => {
    if (sound != null) {
      console.log("Audio", "fastforwarding");
      try {
        await sound.setPositionAsync(
          (playbackStatus?.positionMillis ?? 15000) + 15000
        );
      } catch (error) {
        console.warn("Error fastforwarding audio", { error });
      }
    }
  };

  const getSermon = async (uri: string) => {
    const res = await fetch(`/api/sermon?uri=${encodeURIComponent(uri)}`);
    if (res.ok) {
      const data = await res.json();
      setSermon(data);
    } else {
      setSermon(null);
      console.error(res.statusText);
    }
  };

  useEffect(() => {
    if (sermonUrl != null) {
      console.log(sermonUrl);
      getSermon(sermonUrl);
    }
  }, [sermonUrl]);

  useEffect(() => {
    console.log(sermon);
    if (sermon?.audioUrl != null) {
      console.log(sermon.audioUrl);
      setupAudio(sermon.audioUrl);
    }
  }, [sermon]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
  }, []);

  useEffect(() => {
    const inFullscreenPlayerGroup = pathname.includes("player");

    if (sound && !inFullscreenPlayerGroup) {
      // Redirect to the sign-in page.
      setShowMiniPlayer(true);
    } else if (inFullscreenPlayerGroup) {
      // Redirect away from the sign-in page.
      setShowMiniPlayer(false);
    }
  }, [sound, pathname]);

  useEffect(() => {
    if (playbackStatus?.positionMillis && playbackStatus?.durationMillis) {
      const percent =
        (playbackStatus?.positionMillis / playbackStatus?.durationMillis) * 100;
      setPlaybackPositionPercent(percent);
    }
  }, [playbackStatus]);

  return (
    <AudioContext.Provider
      value={{
        sound,
        setSound,
        playbackStatus,
        setPlayBackStatus,
        sermon,
        showMiniPlayer,
        sermonUrl,
        setSermonUrl,
        playbackPositionPercent,
        stopAudio,
        rewindAudio,
        fastforwardAudio,
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}
