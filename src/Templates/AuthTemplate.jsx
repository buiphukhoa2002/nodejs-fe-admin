import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthTemplate = ({ children }) => {
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  if (user) {
    navigate(-1); // go back to previous page
  }
  return children;
};

export default AuthTemplate;
