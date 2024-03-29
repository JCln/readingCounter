import { ENSearch } from "interfaces/enums.enum";

export class Search {
    static readonly eshterak = new Search(1, ENSearch.eshterak);
    static readonly radif = new Search(2, ENSearch.radif);
    static readonly readCode = new Search(3, ENSearch.readCode);
    static readonly billId = new Search(4, ENSearch.billId);


    private constructor(
        public readonly id: number,
        public readonly searchBy: ENSearch
    ) { }
}
