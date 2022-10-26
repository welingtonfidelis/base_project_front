import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import isNil from "lodash/isNil";

import { Props } from "./types";

export const AlertConfirm = (props: Props) => {
  const { title, description, isOpen, isLoading, onConfirm, onClose } = props;
  const cancelRef = useRef(null);
  const { t } = useTranslation();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent alignSelf={"center"}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {description}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t("generic.button_no")}
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3} isLoading={isLoading}>
              {t("generic.button_yes")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
