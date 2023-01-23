import './styles.scss';
import { IPost } from '../../services/posts';
import Like from '../../assets/images/like.png';
import Commentary from '../../assets/images/chat.png';
import { IComments } from '../../services/commentary';

interface ICardPostProps {
  post?: IPost;
  comments?: number;
  onClick?: () => void;
  onClickImage?: () => void;
}

function CardPost({
  post,
  comments,
  onClick,
  onClickImage,
}: ICardPostProps): JSX.Element {
  //const buttonClassnames = classnames('categoryButton', { active });

  return (
    <div className="cardPost">
      <div className="cardPost__header">
        <img src={post?.owner.picture} alt="" onClick={onClickImage} />
        <label htmlFor="">
          {post?.owner.title} {post?.owner.firstName} {post?.owner.lastName}
        </label>
      </div>
      <div className="cardPost__body">
        <label htmlFor="">{post?.text}</label>
        <img src={post?.image} alt="" />
      </div>
      <div className="cardPost__tags">
        {post?.tags.map((item, index) => (
          <label htmlFor="" key={index}>
            {item}
          </label>
        ))}
      </div>
      <div className="cardPost__likes">
        <div className="actions">
          <div>
            <img src={Like} alt="" />
            <label htmlFor="">{post?.likes}</label>
          </div>
          <div>
            <img src={Commentary} alt="" />
            <label htmlFor="">{comments}</label>
          </div>
        </div>
        <label htmlFor="" className="commentary" onClick={onClick}>
          Ver comentarios
        </label>
      </div>
    </div>
  );
}

export default CardPost;
