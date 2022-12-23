export interface Channel {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  };
  items: {
    kind: string,
    etag: string,
    id: string,
    snippet: {
      title: string,
      description: string,
      customUrl: string,
      publishedAt: string,
      thumbnails: {
        default: {
          url: string,
          width: number,
          height: number,
        },
        medium: {
          url: string,
          width: number,
          height: number,
        },
        high: {
          url: string,
          width: 800,
          height: 800
        }
      },
      localized: {
        title: string,
        description: string,
      },
      country: string,
    },
    statistics: {
      viewCount: string,
      subscriberCount: string,
      hiddenSubscriberCount: boolean,
      videoCount: string,
    },
    status: {
      privacyStatus: string,
      isLinked: boolean,
      longUploadsStatus: string,
    }
  }[];
}

export interface ChannelVideos {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  };
  items: {
    kind: string,
    etag: string,
    id: {
      kind: string,
      videoId: string,
    },
  }[];
}

export interface Video {
  kind: string,
  etag: string,
  id: string,
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
      default: {
        url: string,
        width: number,
        height: number,
      },
      medium: {
        url: string,
        width: number,
        height: number,
      },
      high: {
        url: string,
        width: number,
        height: number,
      },
      standard: {
        url: string,
        width: number,
        height: number,
      },
      maxres: {
        url: string,
        width: number,
        height: number,
      }
    },
    channelTitle: string,
    tags: string[],
    categoryId: string,
    liveBroadcastContent: string,
    localized: {
      title: string,
      description: string,
    },
    defaultAudioLanguage: string,
  },
  status: {
    uploadStatus: string,
    privacyStatus: string,
    license: string,
    embeddable: boolean,
    publicStatsViewable: boolean,
    madeForKids: boolean,
  },
  statistics: {
    viewCount: string,
    likeCount: string,
    favoriteCount: string,
  },
}

export interface VideoList {
  etag: string;
  items: Video[];
  kind: string;
  pageInfo: {
    resultsPerPage: number,
    totalResults: number,
  };
}

export interface SearchVideo {
  kind: string;
  etag: string;
  id: {
    kind: string,
    videoId: string,
  },
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
      default: {
        url: string,
        width: number,
        height: number,
      },
      medium: {
        url: string,
        width: number,
        height: number,
      },
      high: {
        url: string,
        width: number,
        height: number,
      }
    },
    channelTitle: string,
    liveBroadcastContent: string,
    publishTime: string,
  }
}

export interface SearchVideos {
  etag: string;
  items: SearchVideo[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  },
  regionCode: string;
}
