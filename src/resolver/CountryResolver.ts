import { Resolver, Query, Mutation, Arg } from "type-graphql";
import  { Country, CreateCountry }  from "../entity/Country";
import CountryServices from "../services/CountryServices";

@Resolver()
export default class CountryResolver {
  @Query(() => [Country])
  async listCountries() {
    const countries: Country[] = await new CountryServices().list();
    return countries;
  }

  @Mutation(() => Country)
  async createCategoryl(@Arg('infos') infos: CreateCountry) {
    const result: Country = await new CountryServices().create(infos);
    console.log('RESULT', result);
    return result;
  }

  @Query(() => Country)
  async findCountryByCode(@Arg('code') code: string) {
    const country: Country = await new CountryServices().findByCode(code);
    return country;
  }

  @Query(() => [Country])
  async findCountriesByContinent(@Arg('continentCode') continentCode: string) {
    const countries: Country[] = await new CountryServices().findByContinentCode(continentCode);
    return countries;
  }
}
