import UIModal from 'react-modal';
import './style.scss';
import Image from '../../assets/images/user.png';
import { IUserProfile } from '../../services/user';

UIModal.setAppElement('#root');
interface IModalProps extends UIModal.Props {
  user?: IUserProfile;
}

function Modal({ user, ...rest }: IModalProps): JSX.Element {
  console.log(user);
  return (
    <UIModal {...rest} className="modal" overlayClassName="modalContainer">
      {user ? (
        <div className="modal__body">
          <label htmlFor="" className="title">
            Información personal
          </label>
          <div className="image">
            <img src={user?.picture} alt="" />
          </div>
          <div className="info">
            <label htmlFor="">
              <b>Nombre: </b> {user?.title} {user?.firstName} {user?.lastName}
            </label>
            <label htmlFor="">
              <b>Genero: </b> {user?.gender ? user.gender : '--'}
            </label>
            <label htmlFor="">
              <b>Email: </b> {user?.email ? user?.email : '--'}
            </label>
            <label htmlFor="">
              <b>Telefono: </b> {user?.phone ? user?.phone : '--'}
            </label>
            <label htmlFor="">
              <b>Fecha de nacimiento: </b>{' '}
              {user?.dateOfBirth ? user?.dateOfBirth : '--'}
            </label>
            <label htmlFor="">
              <b>Ciudad: </b> {user?.location ? user?.location : '--'}
            </label>
          </div>
        </div>
      ) : (
        <div className="modal__body">
          <label htmlFor="" className="titleError">
            La información de este usuario no se encuentra registrada en ésta
            base de datos
          </label>
        </div>
      )}
    </UIModal>
  );
}

export default Modal;
