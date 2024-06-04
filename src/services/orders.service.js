import repository from "../repositories/orders.rep.js";

class OrdersService {
    constructor() {
        this.repository = repository;
    }
    create = async (data) => await this.repository.create(data);
    read = async ({ filter, options }) => await this.repository.read({ filter, options });
    readOne = async (id) => await this.repository.readOne(id);
    update = async (id, data) => await this.repository.update(id, data);
    destroy = async (id) => await this.repository.destroy(id);
    report = async (id) => await this.repository.report(id);
}
const service = new OrdersService();
export default service;
