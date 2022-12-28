import React, { ChangeEvent, useEffect, useRef, useState, UIEvent } from 'react';

import { Video } from '@/api/interface/video';

import System from '@/store/system';
import Loading from '@/icon/Loading';
import Play from '@/icon/Play';
import Pause from '@/icon/Pause';
import Volume from '@/icon/Volume';
import Back from '@/icon/Back';

import styles from './index.module.scss';

interface Props {
  loading?: boolean;
  startVideoIndex: number;
  videos: Video[];
  loadMore(): void;
  back(): void;
}

const Player: React.FC<Props> = ({ loading, videos, startVideoIndex, loadMore, back }) => {
  const ytPlayerContainerID = 'yt-player-container';
  const ytPlayerID = 'yt-player';
  const ytPlayer = useRef<any | null>(null);
  const currentVideoIndex = useRef(startVideoIndex);
  const [playerStatus, setPlayerStatus] = useState<'play' | 'pause'>('pause');
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    initYTPlayer(0);
    const fullScreenEvent = () => { setIsFullScreen((preValue) => !preValue); };
    document.addEventListener('fullscreenchange', fullScreenEvent);
    requestFullscreen();

    return () => document.removeEventListener('fullscreenchange', fullScreenEvent);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (!ytPlayer.current?.getCurrentTime) { return; }
      setProgress(Math.round((ytPlayer.current.getCurrentTime() / ytPlayer.current.getDuration()) * 100));
    }, 1000);

    return () => clearInterval(progressInterval);
  }, []);

  function requestFullscreen() {
    const container = document.getElementById(ytPlayerContainerID);
    if (container) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen();
      } else if ((container as any).mozRequestFullScreen) {
        (container as any).mozRequestFullScreen();
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      }
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
  }

  function initYTPlayer(count: number) {
    if (ytPlayer.current) { return; }

    const yt = (window as any).YT;
    if (!yt) {
      if (count < 3) { setTimeout(() => initYTPlayer(count + 1), 500); }
      return;
    }

    ytPlayer.current = new yt.Player(ytPlayerID, {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        ecver: 2,
        modestbranding: 0,
        fs: 0,
        cc_load_policty: 0,
        iv_load_policy: 3,
      },
      events: { onReady, onStateChange },
    });
  }

  function onReady() {
    if (ytPlayer.current?.loadVideoById) {
      ytPlayer.current.loadVideoById(videos[currentVideoIndex.current].id);
      const system = System.Get();
      ytPlayer.current.setVolume(system.volume);
      setVolume(system.volume);
    } else {
      initYTPlayer(0);
    }
  }

  function onStateChange(e: any) {
    if (e.data === 0) {
      setPlayerStatus('pause');
      currentVideoIndex.current = videos[currentVideoIndex.current + 1] ? (currentVideoIndex.current + 1) : 0;
      ytPlayer.current?.loadVideoById ?
        ytPlayer.current.loadVideoById(videos[currentVideoIndex.current].id) :
        initYTPlayer(0);

      if (currentVideoIndex.current === (videos.length - 1)) { loadMore(); }
    }

    if (e.data === 1) { setPlayerStatus('play'); }
    if (e.data === 2) { setPlayerStatus('pause'); }
  }

  function progressInputOnChange(e: ChangeEvent<HTMLInputElement>) {
    ytPlayer.current.seekTo((Number(e.target.value) / 100) * ytPlayer.current.getDuration());
    setProgress(Number(e.target.value));
  }

  function playOnClick() {
    if (playerStatus === 'play') {
      ytPlayer.current.pauseVideo();
      setPlayerStatus('pause');
    } else {
      ytPlayer.current.playVideo();
      setPlayerStatus('play');
    }
  }

  function listOnScroll(e: UIEvent<HTMLDivElement>) {
    const { clientWidth, scrollLeft, scrollWidth } = e.currentTarget;
    if ((clientWidth + scrollLeft) >= (scrollWidth - 50)) { loadMore(); }
  }

  function loadVideo(index: number) {
    if (ytPlayer.current?.loadVideoById) {
      ytPlayer.current.loadVideoById(videos[index].id);
      currentVideoIndex.current = index;
    } else {
      initYTPlayer(0);
    }
  }

  return (<>
    <div id={ytPlayerContainerID} className={`${styles.container} bg-black-deep`}>
      <div className={isFullScreen ? styles.fullScreenPlayer : styles.player}>
        <div id={ytPlayerID}></div>
      </div>
      <div className={styles.mask}>
        <div
          className={isFullScreen ? styles.fullScreenPlayerArea : styles.playerArea}
          onClick={() => { isFullScreen ? exitFullscreen() : requestFullscreen(); }}
        >
          <div
            className={`${styles.back} text-white hover:bg-black`}
            onClick={(e) => {
              e.stopPropagation();
              back();
            }}
          >
            <Back width="3rem" height="3rem"></Back>
          </div>
          <div className={`${styles.progress} text-white`} onClick={(e) => e.stopPropagation()}>
            <input
              className={styles.progressInput}
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={progressInputOnChange}
            ></input>
          </div>
        </div>
        <div className={`${styles.controller} text-white`} onClick={(e) => e.stopPropagation()}>
          <div
            className="inline-block align-middle cursor-pointer"
            onClick={playOnClick}
          >
            {playerStatus === 'play' ? <Pause width="2rem" height="2rem"></Pause> : null}
            {playerStatus === 'pause' ? <Play width="2rem" height="2rem"></Play> : null}
          </div>
          <div className="inline-block align-middle">
            <div className="inline-block align-middle">
              <Volume width="2rem" height="2rem"></Volume>
            </div>
            <div className="inline-block">
              <input
                className={styles.volumeInput}
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => {
                  ytPlayer.current?.setVolume?.(Number(e.target.value));
                  System.SetVolume(Number(e.target.value));
                  setVolume(Number(e.target.value));
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className={`${styles.list}`} onScroll={listOnScroll}>
          {videos.map((video, i) => (
            <div
              key={video.id}
              className="inline-block mx-2 h-full cursor-pointer align-middle"
              onClick={() => { loadVideo(i); }}
            >
              <img className="h-full" src={video.snippet.thumbnails.medium.url}></img>
            </div>
          ))}
          {loading ?
            <div className="inline-block mx-2 text-red align-middle">
              <Loading width="3rem" height="3rem"></Loading>
            </div> : null}
        </div>
      </div>
    </div>
  </>);
};

export default Player;
