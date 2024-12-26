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
  hasMore: boolean;
  items: TGetListMemberItemDTO[];
};
