export type CovidData = {
  country: string;
  region: string;
  cases: Record<
    string,
    {
      total: number;
      new: number;
    }
  >[];
};

export type CovidQueryParams = {
  country: string;
};
