import React, { useRef, useLayoutEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Video } from '@/api/interface/video';

import Routes from '@/constants/routes';
import VideoAPI from '@/api/video';
import Loading from '@/icon/Loading';
import Player from '@/components/Player';

import styles from './index.module.scss';

const Channel: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const pageToken = useRef<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [startVideoIndex, setStartVideoIndex] = useState(-1);
  const [showPlayer, setShowPlayer] = useState(false);

  useLayoutEffect(() => getChannelVideos(), []);

  function getChannelVideos() {
    if (!params.id) {
      navigate(Routes.HOME);
      return;
    }
    if (loading) { return; }

    setLoading(true);
    if (!pageToken.current) { setVideos(() => []); }
    VideoAPI.GetChannelVideos(params.id, pageToken.current)
      .then((resp) => {
        pageToken.current = resp.data.nextPageToken;
        getVideos(resp.data.items.map((item) => item.id.videoId));
      })
      .catch(() => setLoading(false));
  }

  function getVideos(ids: string[]) {
    setLoading(true);
    VideoAPI.GetVideosByIDs(ids)
      .then((resp) => {
        setVideos((preVideos) => [
          ...preVideos,
          ...resp.data.items.filter((item) => item.status.madeForKids && !preVideos.some((v) => v.id === item.id)),
        ]);
      })
      .finally(() => setLoading(false));
  }

  function onScroll() {
    if (!listRef.current) { return; }

    const { clientHeight, scrollTop, scrollHeight } = listRef.current;
    if ((clientHeight + scrollTop) >= (scrollHeight - 50)) { getChannelVideos(); }
  }

  function playVideo(index: number) {
    setStartVideoIndex(index);
    setShowPlayer(true);
  }

  return (<>
    <div className="p-4 h-full text-center overflow-auto" ref={listRef} onScroll={onScroll}>
      <div className="inline-block max-w-[85rem]">
        {videos.map((video, i) =>
          <div key={video.id} className={`${styles.video} zoom-in-1`} onClick={() => playVideo(i)}>
            <img src={video.snippet.thumbnails.medium.url}></img>
            <div className={`${styles.video__text}`}>{video.snippet.title}</div>
          </div>)}
      </div>
      {loading ? <div><Loading className="inline-block text-red" width="3rem" height="3rem"></Loading></div> : null}
    </div>
    {showPlayer ? <Player
      loading={loading}
      videos={videos}
      startVideoIndex={startVideoIndex}
      loadMore={getChannelVideos}
      back={() => setShowPlayer(false)}
    ></Player> : null}
  </>);
};

export default Channel;
