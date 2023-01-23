import React, { useState, useEffect } from 'react';
import OrderModal from '../../components/OrderModal';
import UserModal from '../../components/UserModal';
import CardPost from '../../components/CardPost';
import { getPosts, IPosts } from '../../services/posts';
import { getUsers, IUser } from '../../services/user';
import {
  getComments,
  IComments,
  getCommentList,
} from '../../services/commentary';
import Image from '../../assets/images/user.png';
import './styles.scss';
import { getAuth } from 'firebase/auth';

function Home(): JSX.Element {
  const [posts, setPosts] = useState<IPosts>();
  const [filterPost, setFilterPost] = useState<IPosts>();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState<IUser>();
  const [comments, setComments] = useState<IComments>();
  const [taglist, setTags] = useState<string[]>([]);
  const [commentList, setCommentList] = useState<IComments>();
  const [postId, setPostId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      const response = await getCommentList();
      setCommentList(response);
    }

    async function fetchUsers() {
      const response = await getUsers();
      setUsers(response);
    }

    void fetchUsers();
    void fetchComments();
  }, []);

  useEffect(() => {
    async function fetchComments() {
      if (postId) {
        const response = await getComments(postId);
        setComments(response);
      }
    }
    void fetchComments();
  }, [postId]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await getPosts();
      const tags = response.data.flatMap((item) => item.tags);
      const postsComments = [];

      for (let index = 0; index < response?.data.length; index++) {
        const post = response.data[index];
        const comments = await getComments(post.id);
        postsComments.push({ ...post, comments: comments.data.length });
      }

      setTags(Array.from(new Set(tags)));
      setPosts({ data: postsComments });
      setFilterPost({ data: postsComments });
    }

    if (commentList) {
      void fetchPosts();
    }
  }, [commentList]);

  const auth = getAuth();
  const miPerfil = auth.currentUser;

  const userProfile = users?.data.find((item) => item.id === user);

  const onSelectTag = (tag: string) => {
    const post = posts?.data.filter((item) => item.tags.includes(tag));

    if (post) {
      setFilterPost({ data: post });
    }
  };

  return (
    <div>
      <div className="container" id="modal">
        <div className="container__header">
          <label>Mi red social</label>
        </div>
        <div className="container__sideBar">
          <div className="image">
            <img src={miPerfil?.photoURL || Image} alt="" />
          </div>
          <label htmlFor="">{miPerfil?.displayName}</label>
        </div>
        <div className="container__content">
          {filterPost?.data?.map((item, index) => (
            <CardPost
              key={index}
              post={item}
              comments={item.comments}
              onClick={() => {
                setIsModalOpen(!isModalOpen);
                setPostId(item.id);
              }}
              onClickImage={() => {
                setOpenUserModal(!openUserModal);
                setUser(item.owner.id);
              }}
            />
          ))}
        </div>
        <div className="container__rightBar">
          <div className="tags">
            <label htmlFor="">Tendencia</label>
            <div>
              <label htmlFor="" onClick={() => setFilterPost(posts)}>
                Todos
              </label>
              {taglist.map((item, index) => (
                <label htmlFor="" key={index} onClick={() => onSelectTag(item)}>
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
        {openUserModal && (
          <UserModal
            isOpen={openUserModal}
            onRequestClose={() => setOpenUserModal(false)}
            shouldCloseOnOverlayClick
            user={userProfile}
          />
        )}
        {isModalOpen && (
          <OrderModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick
            comment={comments}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
