import { dataPackages } from "../data/data.js";

export class PackService {
    getAllPackages() {
        return dataPackages;
    }

    getPackageById(id) {
        return dataPackages.find(pack => pack.id === id);
    }
}