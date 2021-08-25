import { Box, Button, Divider, Flex, Heading, HStack, Input as ChakraInput, SimpleGrid, VStack } from "@chakra-ui/react";

import Link from "next/link";
import { useRouter } from "next/router";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import { Input } from "../../../components/Form/Input";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { api } from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
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

interface CreateVacancyFormData {
  role: string;
  type: string;
  area: string;
  requirements?: string;
  salary: number;
  quantity: number;
}

const createVacancyFormSchema = yup.object().shape({
  role: yup.string().required("Profissão é um campo obrigatório"),
  type: yup.string().required("Tipo de contrato é um campo obrigatório"),
  area: yup.string().required("Área de atuação é um campo obrigatório"),
  salary: yup.number().required("O campo de salário é obrigatório"),
  quantity: yup.number().required("O número de vagas é obrigatório"),
})

export default function CreateVacancy({ company }: CompanyProps) {
  const router = useRouter()

  const createVacancy = useMutation(async(vacancy: CreateVacancyFormData) => {
    const response = await api.post('vacancies', vacancy)

    return response.data.vacancy
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('vacancies')
    }
  })

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(createVacancyFormSchema)
  });

  const { errors } = formState;

  const handleCreateVacancy:SubmitHandler<CreateVacancyFormData> = async(values) => {
    await createVacancy.mutateAsync(values)

    router.push(`/companies/${company.id}`)
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8} 
          p={["6","8"]}
          bg="gray.800"
          onSubmit={handleSubmit(handleCreateVacancy)}
        >
          <Heading size="lg" fontWeight="normal">Criar Vaga</Heading>

          <Divider borderColor="gray.700" my="6"/>

          <VStack>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="role"
                type="text"
                label="Profissão"
                error={errors.role}
                {...register('role')}
              />
              <Input
                name="type"
                type="text"
                label="Tipo de vaga"
                error={errors.type}
                {...register('type')}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="area"
                type="text"
                label="Area"
                error={errors.area}
                {...register('area')}
              />
              <ChakraInput type="hidden" name="company_id" value={company.id} {...register('company_id')}/>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="salary"
                type="number"
                label="Salário"
                error={errors.salary}
                {...register('salary')}
              />
              <Input
                name="quantity"
                type="number"
                label="Quantidade"
                error={errors.quantity}
                {...register('quantity')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href={`/companies/${company.id}`} passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>

              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps:GetServerSideProps = async ({ params }) => {

  const company = await api.get(`/companies/${params.companyId}`)

  return {
    props: {
      company: company.data
    }
  }
}

