export default class DaCountry {
    constructor(poolObj) {
        this.db = poolObj;
        this.listCountriesQuery = "SELECT country_id, country FROM public.country;"
    }
    async listCountries() { 
            return await this.db.query(this.listCountriesQuery);
    }
}