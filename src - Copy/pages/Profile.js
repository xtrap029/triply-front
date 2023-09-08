import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useUser } from "../hooks/useUser";

import Title from "../components/ui/Text/Title";
import Card from "../components/ui/Card/Card";
import Button from "../components/ui/Button/Button";

const Profile = () => {
  const { userProfile, addUser, removeUser } = useUser();

  return (
    <>
      {userProfile ? (
        <>
          <Title>My Profile</Title>
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {userProfile.data.name}
                <br />
                {userProfile.data.email}
              </div>
              <Button variant="outline" onClick={() => removeUser()}>
                Logout
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <>
          <Title>Login</Title>
          <Card>
            <LoginSocialFacebook
              appId={process.env.REACT_APP_FB_APP_ID || ""}
              onResolve={(data) => addUser(data)}
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
