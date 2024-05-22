import repository from "../repositories/payments.rep.js";

class PaymentsService {
    constructor() {
        this.repository = repository;
    }
    checkout = async ({ filter, options }) => await this.repository.checkout({ filter, options });
}
const service = new PaymentsService();
export default service;
