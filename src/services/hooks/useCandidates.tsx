import { useQuery } from "react-query";
import { api } from "../api";

type Candidate = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  skills: string[];
  created_at: string;
  updated_at: string;
}

type GetCandidatesResponse = {
  candidates: Candidate[];
  totalCount: number;
}

export const getCandidates = async(page: number): Promise<GetCandidatesResponse> => {
  const { data, headers } = await api.get('candidates', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const candidates = data.candidates.map((candidate: Candidate) => {
    return {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      cpf: candidate.cpf,
      skills: candidate.skills,
      created_at: new Date(candidate.created_at).toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
      updated_at: new Date(candidate.updated_at).toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }
  })

  return {
    candidates,
    totalCount,
  };
}

export function useCandidates(page: number) {
  return useQuery(['candidates', page], () => getCandidates(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}