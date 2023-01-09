import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ProfileFunc = (props) => {
  console.log("props", props);
  /**
   * khai báo 1 state
   * tham số 1: giá trị của state
   * tham số 2: hàm để cập nhật giá trị
   */

  const { nganh, ten, email } = props;
  return (
    <div>
      <p className="red">Ngành: {nganh}</p>
      <p className="red">Tên: {ten}</p>
      <p>
        email:
        <FontAwesomeIcon icon={faEnvelope} />
        {email}
      </p>
    </div>
  );
};

export default ProfileFunc;
