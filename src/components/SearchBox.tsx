import { Flex, Icon, Input, InputProps } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

interface SearchBoxProps extends InputProps {
  name: string;
  label?: string;
}

export function SearchBox({
  name,
  label
}: SearchBoxProps) {
  return (
    <Flex
      as="label"
      flex="1"
      py="2"
      px="6"
      ml="4"
      maxWidth={400}
      align="center"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
      borderWidth={2}
      borderColor="pink.500"
      _hover={
        {
          bg: "gray.900",
        }
      }
    >
      <Input
        name={name}
        type="text"
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder={label? `Buscar ${label}`: 'Buscar item na tabela'}
        _placeholder={{ color: 'gray.400' }}
      />

      <Icon as={RiSearchLine} fontSize="16" />
    </Flex>
  );
}