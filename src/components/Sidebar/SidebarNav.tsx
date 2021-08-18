import { Stack } from "@chakra-ui/react";
import { RiBuilding4Fill, RiDashboardLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink href="/companies" icon={RiBuilding4Fill}>Companies</NavLink>
      </NavSection>
    </Stack>
  );
}