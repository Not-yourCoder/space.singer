/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchError, Song } from "../types";

export const getSongs = async (): Promise<Song[]> => {
  try {
    const response = await fetch("https://cms.samespace.com/items/songs");

    if (!response.ok) {
      throw {
        message: `HTTP error! status: ${response.status}`,
        status: response.status,
      } as FetchError;
    }

    const data = await response.json();

    return data?.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
