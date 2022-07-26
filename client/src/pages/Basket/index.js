import {
  Alert,
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";
import { useBasket } from "../../contexts/BasketContext";

export default function Basket() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const [address, setAddress] = useState("");

  const initialRef = useRef(null);

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    const response = await postOrder(input);

    emptyBasket();
    onClose();
  };

  return (
    <Box p={5}>
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket.</Alert>
      )}
      {items.length > 0 && (
        <>
          <ul>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item._id}`}>
                  {item.title} - {item.price}TL
                  <Image
                    htmlWidth={200}
                    src={item.photos[0]}
                    alt="basket item"
                  ></Image>
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme={"pink"}
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>
          <Box mt={10}>
            <Text fontSize={22}>Total: {total} TL</Text>
          </Box>
          <Button mt="2" size="sm" colorScheme={"green"} onClick={onOpen}>
            Order
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}
