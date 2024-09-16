export type CovidDataQuery = {
  country: string;
  region: string;
  cases: Record<
    string,
    {
      total: number;
      new: number;
    }
  >;
};

export type CovidData = {
  country: string;
  region: string;
  cases: Case[];
};

export type Case = {
  date: string;
  total: number;
  new: number;
};

export type CovidQueryParams = {
  country: string;
};
