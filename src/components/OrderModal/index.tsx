import UIModal from 'react-modal';
import './style.scss';
import { IComments } from '../../services/commentary';

UIModal.setAppElement('#root');
interface IModalProps extends UIModal.Props {
  comment?: IComments;
}

function Modal({ comment, ...rest }: IModalProps): JSX.Element {
  return (
    <UIModal {...rest} className="modal" overlayClassName="modalContainer">
      <div className="modal__body">
        <label htmlFor="">Comentarios</label>

        {comment?.data.map((item, index) => (
          <div className="commentary" key={index}>
            <img src={item.owner.picture} alt="" />
            <div className="text">
              <label htmlFor="">
                {item.owner.title} {item.owner.firstName} {item.owner.lastName}
              </label>
              <p>{item.message}</p>
            </div>
          </div>
        ))}

        {comment?.data && comment?.data.length > 0 ? (
          ''
        ) : (
          <p>Sin comentarios</p>
        )}
      </div>
    </UIModal>
  );
}

export default Modal;
