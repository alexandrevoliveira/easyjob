import { Box, Button, Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";

import NextLink from "next/link"
import { BiClipboard } from "react-icons/bi"
import { GetServerSideProps } from "next";

interface CandidateProps {
  candidate: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    created_at: string;
    updated_at: string;
  }
}

export default function CandidateProfile({ candidate }: CandidateProps) {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          mx="auto"
          p="8"
          bg="white.bg"
          borderRadius={8}
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Informações
            </Heading>
            
            <NextLink href={`/candidates/${candidate.id}/vacancies`} passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={BiClipboard} fontSize="20" />}
              >
                Vagas aplicadas
              </Button>
            </NextLink>
          </Flex>

          <VStack spacing={8} align="left" justifySelf="left">
            <HStack spacing={32}>
              <HStack spacing={2} align="center" justify="space-between">
                <Text fontSize={22}>Nome:</Text>
                <Text fontSize={20} textTransform="capitalize">{candidate.name}</Text>
              </HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>E-mail:</Text>
                  <Text fontSize={20}>{candidate?.email}</Text>
              </HStack>
            </HStack>
            <HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>CPF:</Text>
                  <Text fontSize={20}>{candidate?.cpf}</Text>
              </HStack>
            </HStack>
            <HStack spacing={16}>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Candidato criado em:</Text>
                  <Text fontSize={20}>{candidate?.created_at}</Text>
              </HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Candidato atualizado em:</Text>
                  <Text fontSize={20}>{candidate?.updated_at}</Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps:GetServerSideProps = async ({ params }) => {

  let candidate = await api.get(`/candidates/${params.id}`)

  candidate = {
    ...candidate.data,
    created_at: new Date(candidate.data.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    updated_at: new Date(candidate.data.updated_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) 
  }

  return {
    props: {
      candidate
    }
  }
}