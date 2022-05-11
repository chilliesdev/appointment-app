import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleButton from "../../components/GoogleButton";
import { fetchGoogleSignin } from "../../hooks";
import { GoogleSignin } from "../types";

type LocationState = {
  from: {
    pathname: string;
  };
};

export default function GoogleAuth() {
  const clientId: string = process.env.REACT_APP_CLIENT_ID!;
  const dispatch = useDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  const customState = location.state as LocationState;

  async function responseGoogleSuccess(
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) {
    if ("profileObj" in response) {
      const data: GoogleSignin = {
        issuer: "google",
        id: response.profileObj.googleId,
        name: `${response.profileObj.givenName} ${response.profileObj.familyName}`,
        email: response.profileObj.email,
      };

      await dispatch(fetchGoogleSignin(data));

      if (customState) {
        let fromState = customState.from?.pathname || "/";
        navigate(fromState, { replace: true });
      }
    }
  }

  function responseGoogleFailed(response: GoogleLoginResponse) {
    console.log(response);
  }

  return (
    <GoogleLogin
      render={(renderProps) => (
        <GoogleButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        />
      )}
      clientId={clientId}
      buttonText="Signin with Google"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailed}
      cookiePolicy="single_host_origin"
    />
  );
}
