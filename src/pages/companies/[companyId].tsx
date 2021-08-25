import { Box, Button, Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";

import NextLink from "next/link"
import { RiAddLine } from "react-icons/ri";
import { GetServerSideProps } from "next";

interface CompanyProps {
  company: {
    id: string;
    name: string;
    email: string;
    cnpj: string;
    created_at: string;
    updated_at: string;
  }
}

export default function CompanyProfile({ company }: CompanyProps) {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" mx="auto" px="6" maxWidth={1480}>
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
            
            <NextLink href={`/companies/${company.id}/createVacancy`} passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar vaga
              </Button>
            </NextLink>
          </Flex>

          <VStack spacing={8} align="left" justifySelf="left">
            <HStack spacing={32}>
              <HStack spacing={2} align="center" justify="space-between">
                <Text fontSize={22}>Nome:</Text>
                <Text fontSize={20} textTransform="capitalize">{company.name}</Text>
              </HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>E-mail:</Text>
                  <Text fontSize={20}>{company?.email}</Text>
              </HStack>
            </HStack>
            <HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>CNPJ:</Text>
                  <Text fontSize={20}>{company?.cnpj}</Text>
              </HStack>
            </HStack>
            <HStack spacing={16}>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Empresa criada em:</Text>
                  <Text fontSize={20}>{company?.created_at}</Text>
              </HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Empresa atualizada em:</Text>
                  <Text fontSize={20}>{company?.updated_at}</Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps:GetServerSideProps = async ({ params }) => {

  let company = await api.get(`/companies/${params.companyId}`)

  company = {
    ...company.data,
    created_at: new Date(company.data.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    updated_at: new Date(company.data.updated_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) 
  }

  return {
    props: {
      company
    }
  }
}