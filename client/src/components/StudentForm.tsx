import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack ,Input, Textarea,Text, Switch} from "@chakra-ui/react"
import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";

interface StudentFormProps {
    isOpen: boolean;
    onClose: () => void
    fetchStudent: () => void
}


const StudentForm = ({isOpen,onClose,fetchStudent}:StudentFormProps) => {

  const [student, setStudent] = useState({
        id:0,
        name:"",
        address: "",
        phonenumber: "",
        email: ""
    
  })
  const onSave = () => {

    axios.post(BASE_URL+"Student",student).then(response => {
    onClose();
      fetchStudent();
    }).catch(error => {
      console.log(error);
      
    })



    console.log(student);
    
  }

  
    return (
      <>
       
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <VStack gap={3} alignItems={'self-start'}>
              <Input type="text" placeholder="Name" value={student.name} onChange={(e)=>setStudent({...student,name:e.target.value})}/>
              <Input type="text" placeholder="Address" value={student.address} onChange={(e)=>setStudent({...student,address:e.target.value})}/>
              <Input type="text" placeholder="Phone Number" value={student.phonenumber} onChange={(e)=>setStudent({...student,phonenumber:e.target.value})}/>
              <Input type="text" placeholder="Email" value={student.email} onChange={(e)=>setStudent({...student,email:e.target.value})}/>
             </VStack>
            </ModalBody>
           
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={onSave}  colorScheme="teal">Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default StudentForm