export type TGetListMemberItemDTO = {
  id: string;
  avatarUrl: string;
  fullName: string;
  gender: {
    value: number;
    name: string;
  };
  house: {
    value: number;
    name: string;
  };
  memberType: {
    value: number;
    name: string;
  };
  university: string;
  joiningYear: number;
  positions: {
    value: number;
    name: string;
    term: number;
  }[];
};
export type TGetListMemberDTO = {
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
  items: TGetListMemberItemDTO[];
};

export type TGetOneMemberDTO = {
  id: string;
  address: string | null;
  avatarUrl: string | null;
  birthdate: string | null;
  email: string;
  fullName: string;
  joiningYear: number;
  major: string | null;
  phone: string | null;
  university: string | null;
  universityGrade: number | null;
  createdAt: string;
  updatedAt: string;
  gender: string;
  house: string;
  memberType: string;
  positions: { position: string; term: number }[];
};
