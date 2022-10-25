interface SearchRet {
  channel: Channel;
  description: null;
  duration: number;
  duration_formatted: string;
  id: string;
  live: boolean;
  nsfw: boolean;
  private: boolean;
  ratings: Ratings;
  shorts: boolean;
  shorts_url: string;
  tags: string[];
  thumbnail: Thumbnail;
  title: string;
  type: string;
  unlisted: boolean;
  uploadedAt: string;
  url: string;
  views: number;
}

export interface Channel {
  icon: string;
  id: string;
  name: string;
}

export interface Ratings {
  dislikes: number;
  likes: number;
}

export interface Thumbnail {
  height: number;
  id: string;
  url: string;
  width: number;
}

export default SearchRet;
