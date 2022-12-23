import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Channel } from '@/api/interface/video';

import VideoAPI from '@/api/video';
import Config from '@/constants/config';
import Routes from '@/constants/routes';

import styles from './index.module.scss';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [channelList, setChannelList] = useState<Channel[]>([]);

  useLayoutEffect(() => getVideos(), []);

  function getVideos() {
    if (loading) { return; }

    setLoading(true);
    const GetChannelsByIDs = Config.SEARCH_CHANNELS.map((channel) => VideoAPI.GetChannelByID(channel.channelID));
    Promise.all(GetChannelsByIDs)
      .then((resp) => {
        setChannelList(() => resp.filter((result) => result.status === 200).map((data) => data.data));
      })
      .finally(() => setLoading(false));
  }

  function channelOnClick(channel: Channel) {
    navigate(Routes.CHANNEL.replace(':id', channel.items[0].id));
  }

  return (<>
    <div className="p-4 h-full text-center overflow-auto">
      <div className="inline-block max-w-6xl">
        {channelList.map((channel) =>
          <div key={channel.items[0].id}
            className={`${styles.channel} zoom-in-1`}
            onClick={() => channelOnClick(channel)}
          >
            <img className="border-b border-gray" src={channel.items[0].snippet.thumbnails.high.url}></img>
            <div className={styles.channel__text}>
              {channel.items[0].snippet.title}
            </div>
          </div>)}
      </div>
    </div>
  </>);
};

export default Main;
