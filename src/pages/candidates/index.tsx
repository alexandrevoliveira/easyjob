import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Thead, Th, Tr, Text, useBreakpointValue, Link } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { SearchBox } from "../../components/SearchBox"

import { useCandidates } from "../../services/hooks/useCandidates";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function CandidateList() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isFetching, error } = useCandidates(page);  
  
  async function handlePrefetchCandidate(candidateId: string) {
    await queryClient.prefetchQuery(['candidate', candidateId], async() => {
      const response = await api.get(`candidates/${candidateId}`)

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
              Candidatos
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>

            {isWideVersion && (
              <SearchBox
                name="candidate"
                label="candidato"
                onChange={(event) => {
                  // setFilter(event.target.name)
                }}/>
            )}
            
            <NextLink href="/candidates/create" passHref>
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
              <Text>Falha ao obter dados dos candidatos</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" size="sm">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Candidato</Th>
                    <Th>Habilidades</Th>
                    { isWideVersion && <Th>Data de cadastro</Th>}
                    { isWideVersion && <Th>Ultima atualização</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.candidates.map(candidate => {
                    return (
                      <Tr key={candidate.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="purple.400" onMouseEnter={() => handlePrefetchCandidate(candidate.id)}>
                              <Text fontWeight="bold">{candidate.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">{candidate.email}</Text>
                          </Box>
                        </Td>
                        <Td>{candidate.skills}</Td>
                        { isWideVersion && <Td>{candidate.created_at}</Td>}
                        { isWideVersion && <Td>{candidate.updated_at}</Td>}
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