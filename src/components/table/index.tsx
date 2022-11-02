import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EmptyState } from "../emptyState";
import { Props } from "./types";

export const Table = (props: Props) => {
  const { columnHeader, columnData } = props;

  return (
    <>
      {columnData.length ? (
        <TableContainer>
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
      ) : (
        <EmptyState />
      )}
    </>
  );
};
