import { dataPackages } from "../data/data.js";

class PackService {
    getAllPackages() {
        return dataPackages;
    }

    getPackageById(id) {
        return dataPackages.find(pack => pack.id === id);
    }
}

export const packService = new PackService();