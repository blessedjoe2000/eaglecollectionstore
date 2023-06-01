"use client";

import styles from "./header.module.css";
import Image from "next/image";
import logo from "../../../../public/images/eaglecollectionslogo.png";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
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
  Text,
} from "@chakra-ui/react";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="">
          <Image src={logo} alt="eagle collections logo" width="160" />
        </Link>
      </div>

      {session?.user ? (
        <div className={styles.nav}>
          {console.log("session", session)}
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
      ) : (
        <div className={styles.nav}>
          <ul className={styles.navbarlist}>
            <button onClick={signIn}>Login</button>
            <Link href="/register">Register</Link>
          </ul>
        </div>
      )}

      <>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{session?.user?.name}</DrawerHeader>

            <DrawerBody>
              <Text>Profile</Text>
              <Text>Settings</Text>
              <Text>Favorite</Text>
              <Text>Cart</Text>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={signOut} colorScheme="purple">
                Logout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </header>
  );
}

export default Header;
