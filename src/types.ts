export interface Song {
  id: number;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  name: string;
  artist: string;
  accent: string;
  cover: string;
  top_track: boolean;
  url: string;
}
export type FetchError = {
  message: string;
  status?: number;
};
