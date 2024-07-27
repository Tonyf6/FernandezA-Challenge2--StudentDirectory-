import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import StudentSkeleton from "./StudentSkeleton";
import StudentForm from "./StudentForm";

interface Student {
  id: number;
  name: string;
  address: string;
  phonenumber: string;
  email: string;
}

const StudentTable = () => {


  const { isOpen, onOpen, onClose } = useDisclosure()
  //UseStates
  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  //function to help us fetch our data with axios, handle our error
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "Student")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <StudentSkeleton />;

  return (
    <>
      <ColorModeSwitch />
      <Box m={32} shadow={"md"} rounded={"md"}>
        <Flex justifyContent={"space-between"} px={"5"}>
          <Heading fontSize={25}>Student List</Heading>
          <Button onClick={onOpen} color="teal.300" leftIcon={<AddIcon />}>
            {" "}
            Add Student
          </Button>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Phone Number</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((student: Student) => (
                <Tr key={student.id}>
                  <Td>{student.id}</Td>
                  <Td>
                    <HStack>
                      <Avatar size={"sm"} name={student.name} />
                      <Text>{student.name}</Text>
                    </HStack>
                  </Td>

                  <Td>{student.address}</Td>
                  <Td>
                    <Badge>{student.phonenumber ? "Yes" : "No"}</Badge>
                  </Td>
                  <Td>{student.email}</Td>
                  <Td>
                    <HStack>
                      <EditIcon boxSize={23} color={"orange.200"} />
                      <DeleteIcon boxSize={23} color={"red.400"} />
                      <ViewIcon boxSize={23} color={"green.300"} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {data.length == 0 && (
          <Heading p={5} textAlign={"center"} fontSize={24}>
            No Data
          </Heading>
        )}
        {isOpen && <StudentForm fetchStudent={fetchData} isOpen={isOpen} onClose={onClose} /> }
      </Box>
    </>
  );
};

export default StudentTable;
