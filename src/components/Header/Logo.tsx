import { Link as ChakraLink, Text } from "@chakra-ui/react";
import Link from 'next/link';
import React from "react";

export function Logo() {
  return (
    <Link href="/">
      <ChakraLink
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
        _hover={{ 
          textDecoration: "none",
          color: 'pink.500'
        }}
      >
        EasyJob
        <Text as="span" ml="1" color="purple.500" fontSize="40">.</Text>
      </ChakraLink>
    </Link>
  );
}