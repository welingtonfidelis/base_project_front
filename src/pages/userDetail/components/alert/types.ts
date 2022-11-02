export interface Props {
  isOpenNewUser: boolean;
  onCloseNewUser: () => void;
  newUserData: {
    email: string;
    user_name: string;
    password: string;
  };
}
