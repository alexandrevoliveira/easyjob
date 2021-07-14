import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Diogo Defante</Text>
          <Text color="gray.300" fontSize="small">
            diogo_defante@etbilu.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Diogo Defante"/>
    </Flex>
  );
}