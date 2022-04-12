import GoogleLogin from "react-google-login";
import GoogleButton from "../../components/GoogleButton";

export default function GoogleAuth() {
  const clientId: string = process.env.REACT_APP_CLIENT_ID!;

  function responseGoogle(response: unknown) {
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
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
}
