import { useState, useEffect } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useUser } from "../hooks/useUser";
import { useAuthProvider } from "../hooks/useAuthProvider";

import Title from "../components/ui/Text/Title";
import Subtitle from "../components/ui/Text/Subtitle";
import Card from "../components/ui/Card/Card";
import Button from "../components/ui/Button/Button";

const Profile = () => {
  const { userProfile, addUser, removeUser } = useUser();

  const [socialLogin, setSocialLogin] = useState({
    provider: "",
    accessToken: "",
    picture: "",
  });

  const {
    data: authProviderData,
    isInitialLoading: authProviderIsInitialLoading,
    refetch: authProviderRefetch,
    isError: authProviderIsError,
  } = useAuthProvider(socialLogin.provider, socialLogin.accessToken);

  useEffect(() => {
    if (socialLogin.provider !== "" && socialLogin.accessToken !== "") {
      authProviderRefetch();
    }
  }, [socialLogin]);

  useEffect(() => {
    if (authProviderData) {
      addUser({
        id: authProviderData.user.id,
        email: authProviderData.user.email,
        username: authProviderData.user.username,
        picture: socialLogin.picture,
        jwt: authProviderData.jwt,
      });
    }
  }, [authProviderData]);

  if (authProviderIsError) alert("Login request failed!");
  if (authProviderIsInitialLoading) return <>Loading...</>;

  return (
    <>
      {userProfile ? (
        <>
          <Title>My Profile</Title>
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {userProfile.username}
                <Subtitle>{userProfile.email}</Subtitle>
              </div>
              <div className="text-end">
                <Button variant="outline" onClick={() => removeUser()}>
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <>
          <Title>Login</Title>
          <Card>
            <LoginSocialFacebook
              appId={process.env.REACT_APP_FB_APP_ID || ""}
              onResolve={(data) =>
                setSocialLogin({
                  provider: data.provider,
                  accessToken: data.data.accessToken,
                  picture: data.data.picture.data.url,
                })
              }
              onReject={(err) => {
                console.log(err);
              }}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook>
          </Card>
        </>
      )}
    </>
  );
};

export default Profile;
