export interface IComments {
  data: IComment[];
}

export interface IOwner {
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  title: string;
}

export interface IComment {
  id: string;
  message: string;
  post: string;
  publishDate: string;
  owner: IOwner;
}

interface IGetComments {
  (postId: string): Promise<IComments>;
}

interface IGetCommentList {
  (): Promise<IComments>;
}

export const getComments: IGetComments = async (postId) => {
  const requestOptions = {
    headers: { 'app-id': '63cd835711c81eccd41e321d' },
  };
  const response = await fetch(
    `https://dummyapi.io/data/v1/post/${postId}/comment`,
    requestOptions
  );

  const comment = (await response.json()) as IComments;
  return comment;
};

export const getCommentList: IGetCommentList = async () => {
  const requestOptions = {
    headers: { 'app-id': '63cd835711c81eccd41e321d' },
  };
  const response = await fetch(
    `https://dummyapi.io/data/v1/comment`,
    requestOptions
  );

  const comment = (await response.json()) as IComments;
  return comment;
};
