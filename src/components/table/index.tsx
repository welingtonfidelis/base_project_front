import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Spinner,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBoolean,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { Props } from "./types";

export const Table = (props: Props) => {
  const { columnHeader, columnData } = props;

  return (
    <TableContainer
    //   height="100%"
    //   width="100%"
    //   overflowY="auto"
    //   overflowX="auto"
    >
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            {columnHeader.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {columnData.map((trData, trIndex) => (
            <Tr key={trIndex}>
              {trData.map((tdData, tdIndex) => (
                <Td key={tdIndex}>{tdData}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};
