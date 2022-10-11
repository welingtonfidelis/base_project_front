import {
  Button,
  Modal as ModalChakra,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { Props } from "./types";

export const Modal = (props: PropsWithChildren<Props>) => {
  const {
    title,
    onConfirmButtonText,
    onCloseButtonText,
    children,
    isOpen,
    onConfirmLoading,
    deactiveModalButtons,
    onConfirm,
    onClose,
  } = props;
  const { t } = useTranslation();

  return (
    <ModalChakra onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {!deactiveModalButtons && (
          <ModalFooter>
            <Button onClick={onClose} colorScheme="gray" marginEnd={"2"}>
              {onCloseButtonText || t("generic.button_cancel")}
            </Button>
            <Button
              onClick={onConfirm}
              colorScheme="blue"
              isLoading={onConfirmLoading}
            >
              {onConfirmButtonText || t("generic.button_save")}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalChakra>
  );
};
