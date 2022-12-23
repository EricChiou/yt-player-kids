import axios, { AxiosResponse } from 'axios';

import * as I from './interface/video';

import Config from '@/constants/config';

export default class VideoAPI {
  private static readonly YT_API_PRE_URL = 'https://www.googleapis.com/youtube/v3';

  public static GetVideosByIDs(id: string[]): Promise<AxiosResponse<I.VideoList>> {
    const params = {
      part: 'snippet,statistics,status,localizations',
      id: id.join(),
      key: Config.YT_KEY,
    };

    return axios.get(`${this.YT_API_PRE_URL}/videos`, { params: params });
  }

  public static GetChannelByID(channelID: string): Promise<AxiosResponse<I.Channel>> {
    const params = {
      part: 'snippet,statistics,status,localizations',
      id: channelID,
      key: Config.YT_KEY,
    };

    return axios.get(`${this.YT_API_PRE_URL}/channels`, { params: params });
  }

  public static SearchVideos(keyword: string, pageToken?: string): Promise<AxiosResponse<I.SearchVideos>> {
    const params = {
      part: 'snippet',
      q: keyword,
      maxResults: 50,
      type: 'video',
      safeSearch: 'strict',
      key: Config.YT_KEY,
      pageToken: pageToken || undefined,
    };

    return axios.get(`${this.YT_API_PRE_URL}/search`, { params: params });
  }

  public static GetChannelVideos(channelID: string, pageToken?: string): Promise<AxiosResponse<I.ChannelVideos>> {
    const params = {
      channelId: channelID,
      maxResults: 50,
      type: 'video',
      safeSearch: 'strict',
      key: Config.YT_KEY,
      pageToken: pageToken || undefined,
    };

    return axios.get(`${this.YT_API_PRE_URL}/search`, { params: params });
  }
}
