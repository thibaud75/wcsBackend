import { Repository } from 'typeorm';
import { Country, CreateCountry } from '../entity/Country';
import { AppDataSource } from '..';

class CountryServices {
  db: Repository<Country>;
  constructor() {
    this.db = AppDataSource.getRepository(Country);
  }

  async list() {
    return await this.db.find();
  }

  async create(data: CreateCountry) {
    const newCountry = await this.db.create(data);
    return await this.db.save(newCountry);
  }

  async findByCode(code: string) {
    const country = await this.db.findOne({
      where: { code },
    });
    if (!country) {
      throw new Error("Le pays n'existe pas");
    }
    return country;
  }

  async findByContinentCode(continentCode: string) {
    const countries = await this.db.find({
      where: { continentCode },
    });
    if (!continentCode) {
      throw new Error("Le continent n'existe pas");
    }
    return countries;
  }
}

export default CountryServices;