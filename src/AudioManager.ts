import { AVPlaybackStatus, AVPlaybackStatusSuccess, Audio } from "expo-av";
import { Platform } from "react-native";

// import { useGlobalAudio } from "./zustand/models";

// const audio = {
//   "button_in.wav": require("./assets/audio/button_in.wav"),
//   "button_out.wav": require("./assets/audio/button_out.wav"),
//   "unlock.mp3": require("./assets/audio/unlock.mp3"),
// };

// eslint-disable-line
class AudioManager {
  // sounds: Record<string, Audio.Sound> = {};
  // currentSound: Audio.Sound = new Audio.Sound();
  currentURL: string | null = null;
  currentSound: Audio.Sound | null = null;
  currentStatus: AVPlaybackStatusSuccess | null = null;

  playAsync = async (url: string, isLooping: boolean = false) => {
    // if (!useGlobalAudio.getState().enabled || Platform.OS === "web") {
    //   return;
    // }

    await this.setupAsync();

    if (this.currentURL != url) {
      console.log("Audio", this.currentURL, url);
      await this.stopAsync();
      const soundFile = await this.getSermonAudio(url);
      if (soundFile != null) {
        await this.createSoundAsync(soundFile);
        this.currentURL = url;
      }
    }

    if (this.currentSound != null) {
      try {
        // await soundObject.setPositionAsync(0);
        // await soundObject.setIsLoopingAsync(isLooping);
        await this.currentSound.playAsync();
        console.log("Audio", "playing");
      } catch (error) {
        console.warn("Error playing audio", { error });
      }
    }
  };

  stopAsync = async () => {
    await this.setupAsync();

    if (this.currentSound != null) {
      console.log("Audio", "stopping");
      try {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
      } catch (error) {
        console.warn("Error stopping audio", { error });
      }
      this.currentSound = null;
      this.currentURL = null;
      this.currentStatus = null;
    }
  };

  volumeAsync = async (volume: number) => {
    await this.setupAsync();

    if (this.currentSound != null) {
      console.log("Audio", "setting volume");
      try {
        await this.currentSound.setVolumeAsync(volume);
      } catch (error) {
        console.warn("Error setting volume of audio", { error });
      }
    }
  };

  pauseAsync = async () => {
    await this.setupAsync();

    if (this.currentSound != null) {
      console.log("Audio", "pausing");
      try {
        await this.currentSound.pauseAsync();
      } catch (error) {
        console.warn("Error pausing audio", { error });
      }
    }
  };

  async configureExperienceAudioAsync() {
    console.log("Audio", "configuring");
    return Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
    });
  }

  // private assets: Record<string, number> = audio;

  // private async setupAudioAsync(): Promise<void> {
  //   const keys = Object.keys(this.assets || {});
  //   for (const key of keys) {
  //     const item = this.assets[key];
  //     const { sound } = await Audio.Sound.createAsync(item);
  //     const soundName = key.substr(0, key.lastIndexOf("."));
  //     // console.log("Audio", soundName, sound);
  //     this.sounds[soundName] = sound;
  //   }
  // }

  onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if ("error" in status) {
      console.error(status);
    } else {
      this.currentStatus = status as AVPlaybackStatusSuccess;
    }
  };

  private async createSoundAsync(url: string): Promise<void> {
    console.log("Audio", "creating sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
      (status) => this.onPlaybackStatusUpdate(status),
      false
    );
    this.currentSound = sound;
  }

  _isSetup = false;
  setupPromise: Promise<void> | null = null;
  setupAsync = async () => {
    if (this._isSetup) {
      return this.setupPromise;
    }
    console.log("Audio", "setting up");
    this._isSetup = true;
    this.setupPromise = (async () => {
      await this.configureExperienceAudioAsync();
      // await this.setupAudioAsync();
      this.setupPromise = null;
    })();
    return this.setupPromise;
  };

  getSermonAudio = async (uri: string) => {
    try {
      const result = await fetch(uri);
      const html = await result.text();

      const audioReg = /(<a class="secondary button" href=")(.*)(" target)/g;
      const audioMatches = html.match(audioReg);
      if (audioMatches == null) {
        return null;
      } else {
        const audio = audioMatches[0].split('href="')[1].split('"')[0];
        return `https://www.parkstreetbrethren.org${audio}`;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

export default new AudioManager();
