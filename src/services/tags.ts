export interface ITag {
  data: string[];
}

interface IGetTags {
  (): Promise<ITag>;
}

export const getTags: IGetTags = async () => {
  const requestOptions = {
    headers: { 'app-id': '63cd835711c81eccd41e321d' },
  };
  const response = await fetch(
    'https://dummyapi.io/data/v1/tag',
    requestOptions
  );
  const tags = (await response.json()) as ITag;
  return tags;
};
