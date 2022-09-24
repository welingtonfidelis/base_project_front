import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

import { Container } from "./styles";

export const PrimaryButton = ({ children, ...props }: LoadingButtonProps) => {
  return (
    <Container>
      <LoadingButton {...props} variant="contained" fullWidth disableElevation>
        {children}
      </LoadingButton>
    </Container>
  );
};
