import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

export const PrimaryButton = ({ children, ...props }: LoadingButtonProps) => {
  return (
    <LoadingButton
      {...props}
      variant="contained"
      fullWidth
      disableElevation
    >
      {children}
    </LoadingButton>
  );
};
