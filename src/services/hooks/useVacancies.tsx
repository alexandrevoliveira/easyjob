import { useQuery } from "react-query";
import { api } from "../api";

type Vacancy = {
  id: string;
  role: string;
  type: string;
  area: string;
  requirements?: string;
  salary: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

type GetVacanciesResponse = {
  vacancies: Vacancy[];
  totalCount: number;
}

export const getVacancies = async(page: number): Promise<GetVacanciesResponse> => {
  const { data, headers } = await api.get('vacancies', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const vacancies = data.vacancies.map((vacancy: Vacancy) => {
    return {
      id: vacancy.id,
      role: vacancy.role,
      type: vacancy.type,
      area: vacancy.area,
      requirements: vacancy.requirements,
      salary: vacancy.salary,
      quantity: vacancy.quantity,
      created_at: new Date(vacancy.created_at).toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
      updated_at: new Date(vacancy.updated_at).toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }
  })

  return {
    vacancies,
    totalCount,
  };
}

export function useVacancies(page: number) {
  return useQuery(['vacancies', page], () => getVacancies(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}