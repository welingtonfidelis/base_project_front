export interface Props {
  isOpenNewUser: boolean;
  onCloseNewUser: () => void;
  newUserData: {
    email: string;
    username: string;
    password: string;
  };
}
