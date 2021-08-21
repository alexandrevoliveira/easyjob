import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Thead, Th, Tr, Text, useBreakpointValue, Link } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { SearchBox } from "../../components/SearchBox"

import { useVacancies } from "../../services/hooks/useVacancies";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function VacancyList() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isFetching, error } = useVacancies(page);  
  
  async function handlePrefetchVacancy(vacancyId: string) {
    await queryClient.prefetchQuery(['vacancy', vacancyId], async() => {
      const response = await api.get(`vacancies/${vacancyId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutes
    })
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Vagas
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>

            {isWideVersion && (
              <SearchBox
                name="vacancy"
                label="vaga"
                onChange={(event) => {
                  // setFilter(event.target.name)
                }}/>
            )}
            
            <NextLink href="/vacancies/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
        
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados das vagas</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" size="sm">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Vaga</Th>
                    <Th>Tipo</Th>
                    <Th>Área</Th>
                    <Th>Requisitos</Th>
                    <Th>Salário</Th>
                    <Th>Qnt.</Th>
                    { isWideVersion && <Th>Data de cadastro</Th>}
                    { isWideVersion && <Th>Ultima atualização</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.vacancies.map(vacancy => {
                    return (
                      <Tr key={vacancy.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="purple.400" onMouseEnter={() => handlePrefetchVacancy(vacancy.id)}>
                              <NextLink href={`/vacancies/${vacancy.id}`}>
                                <Text fontWeight="bold">{vacancy.role}</Text>
                              </NextLink>
                            </Link>
                          </Box>
                        </Td>
                        <Td>{vacancy.type}</Td>
                        <Td>{vacancy.area}</Td>
                        {vacancy.requirements ? <Td>{vacancy.requirements}</Td> : <Td>---</Td>}
                        <Td>{vacancy.salary}</Td>
                        <Td>{vacancy.quantity}</Td>
                        { isWideVersion && <Td>{vacancy.created_at}</Td>}
                        { isWideVersion && <Td>{vacancy.updated_at}</Td>}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            { isWideVersion ? 'Editar' : '' }
                          </Button>
                        </Td>
                      </Tr>
                    )
                  })}        
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
          
        </Box>
      </Flex>
    </Box>
  );
}