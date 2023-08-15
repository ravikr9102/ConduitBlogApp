import { useParams, useNavigate } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    let params = useParams();
    const navigate = useNavigate();
    return <Component params={params} {...props} navigate={navigate} />;
  };
  return Wrapper;
};