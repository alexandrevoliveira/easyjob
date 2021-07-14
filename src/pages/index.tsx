import { Flex, Icon, Link as ChakraLink, VStack, Text, Box } from "@chakra-ui/react";
import { RiBuilding4Fill } from 'react-icons/ri';
import { GoPerson } from 'react-icons/go'
import Link from 'next/link';

export default function Home() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bg="gray.800"
    >
      <Flex
        width="100%"
        maxWidth={360}
        bg="gray.600"
        p="8"
        borderRadius="8"
        flexDir="column"
      >
        <VStack spacing="8">
          <Link href="/companies">
            <ChakraLink display="flex" _hover={{ color: 'purple.500' }}>
              <Icon as={RiBuilding4Fill} fontSize="24" alignSelf="center" />
              <Text ml="4" fontWeight="medium" fontSize="24">Empresa</Text>
            </ChakraLink>
          </Link>

          {/* aqui irei redirecionar para a página de usuários, por enquanto que
          não criamos a página de candidatos */}
          <Link href="/users">
            <ChakraLink display="flex" _hover={{ color: 'purple.500' }}>
              <Icon as={GoPerson} fontSize="24" alignSelf="center" />
              <Text ml="4" fontWeight="medium" fontSize="24">Candidato</Text>
            </ChakraLink>
          </Link> 
        </VStack>
      </Flex>
    </Flex>
  )
}
