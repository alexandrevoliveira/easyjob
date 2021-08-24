import { Box, Button, Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";

import NextLink from "next/link"
import { RiAddLine } from "react-icons/ri";
import { GetServerSideProps } from "next";

interface VacancyProps {
 vacancy: {
  id: string;
  role: string;
  type: string;
  area: string;
  requirements: string[];
  salary: number;
  quantity: number;
  company: string;
  created_at: Date;
  updated_at: Date;
 }
}

export default function VacancyProfile({ vacancy }: VacancyProps) {
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
            
            <NextLink href={`/vacancies`} passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Candidatar-se
              </Button>
            </NextLink>
          </Flex>

          <VStack spacing={8} align="left" justifySelf="left">
            <HStack spacing={32}>
              <HStack spacing={2} align="center" justify="space-between">
                <Text fontSize={22}>Vaga:</Text>
                <Text fontSize={20} textTransform="capitalize">{vacancy.role}</Text>
              </HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Tipo:</Text>
                  <Text fontSize={20}>{vacancy?.type}</Text>
              </HStack>
            </HStack>
            <HStack spacing={32}>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Area:</Text>
                  <Text fontSize={20}>{vacancy?.area}</Text>
              </HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Requisitos:</Text>
                  <Text fontSize={20}>{vacancy?.requirements}</Text>
              </HStack>
            </HStack>
            <HStack spacing={32}>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Salário:</Text>
                  <Text fontSize={20}>{vacancy?.salary}</Text>
              </HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Quantidade:</Text>
                  <Text fontSize={20}>{vacancy?.quantity}</Text>
              </HStack>
            </HStack>
            <HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Empresa:</Text>
                  <Text fontSize={20}>{vacancy?.company}</Text>
              </HStack>
            </HStack>
            <HStack spacing={20}>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Vaga criada em:</Text>
                  <Text fontSize={20}>{vacancy?.created_at}</Text>
              </HStack>
              <HStack spacing={2} align="center" justify="space-between">
                  <Text fontSize={22}>Vaga atualizada em:</Text>
                  <Text fontSize={20}>{vacancy?.updated_at}</Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps:GetServerSideProps = async ({ params }) => {

  let vacancy = await api.get(`/vacancies/${params.id}`)

  let company = await api.get(`/companies/${vacancy.data.company_id}`)

  vacancy = {
    ...vacancy.data,
    company: company.data.name,
    created_at: new Date(vacancy.data.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    updated_at: new Date(vacancy.data.updated_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) 
  }

  return {
    props: {
      vacancy
    }
  }
}