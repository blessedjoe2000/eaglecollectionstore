import styles from "./header.module.css";
import Image from "next/image";
import logo from "../../../../public/images/eaglecollectionslogo.png";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="">
          <Image src={logo} alt="eagle collections logo" width="160" />
        </Link>
      </div>
      <div className={styles.nav}>
        <ul className={styles.navbarlist}>
          <Link href="">
            <li className={styles.navlist}>Shop</li>
          </Link>
          <Link href="">
            <li className={styles.navlist}>About</li>
          </Link>
          <Link href="">
            <li className={styles.navlist}>Cart</li>
          </Link>
        </ul>
        <Wrap className="styles.avatar">
          <WrapItem>
            <Avatar
              onClick={onOpen}
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
          </WrapItem>
        </Wrap>
      </div>
      <>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Profile</DrawerHeader>

            {/* <DrawerBody>
             
            </DrawerBody> */}

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </header>
  );
}

export default Header;
