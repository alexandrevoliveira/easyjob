import { Stack } from "@chakra-ui/react";
import { RiBuilding4Fill, RiDashboardLine } from "react-icons/ri";
import { GoPerson } from 'react-icons/go'

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
      </NavSection>
      <NavSection title="ENTIDADES">
        <NavLink href="/companies" icon={RiBuilding4Fill}>Companies</NavLink>
        <NavLink href="/candidates" icon={GoPerson}>Candidatos</NavLink>
      </NavSection>
    </Stack>
  );
}