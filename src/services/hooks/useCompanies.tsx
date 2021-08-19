import { useQuery } from "react-query";
import { api } from "../api";

type Company = {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  created_at: string;
  updated_at: string;
}

type GetCompaniesResponse = {
  companies: Company[];
  totalCount: number;
}

export const getCompanies = async(page: number): Promise<GetCompaniesResponse> => {
  const { data, headers } = await api.get('companies', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const companies = data.companies.map((company: Company) => {
    return {
      id: company.id,
      name: company.name,
      email: company.email,
      created_at: new Date(company.created_at).toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
      updated_at: new Date(company.updated_at).toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }
  })

  return {
    companies,
    totalCount,
  };
}

export function useCompanies(page: number) {
  return useQuery(['companies', page], () => getCompanies(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}