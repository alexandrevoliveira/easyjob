import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";

import Link from "next/link";
import { useRouter } from "next/router";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface CreateCandidateFormData {
  name: string;
  cpf: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createCandidateFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  cpf: yup.string().required("CPF é um campo obrigatório para candidato").length(11),
  email: yup.string().required("Email obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], "As senhas não batem")
})

export default function CreateCandidate() {
  const router = useRouter()

  const createCandidate = useMutation(async(candidate: CreateCandidateFormData) => {
    const response = await api.post('candidates', candidate)

    return response.data.candidate
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('candidates')
    }
  })

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(createCandidateFormSchema)
  });

  const { errors } = formState;

  const handleCreateCandidate:SubmitHandler<CreateCandidateFormData> = async(values) => {
    await createCandidate.mutateAsync(values)

    router.push('/candidates')
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
          onSubmit={handleSubmit(handleCreateCandidate)}
        >
          <Heading size="lg" fontWeight="normal">Criar Candidato</Heading>

          <Divider borderColor="gray.700" my="6"/>

          <VStack>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                type="text"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="cpf"
                type="cpf"
                label="CPF"
                error={errors.cpf}
                {...register('cpf')}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação de senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/candidates" passHref>
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
