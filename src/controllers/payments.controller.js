import service from "../services/payments.service.js";

class PaymentsController {
    constructor() {
        this.service = service;
    }
    checkout = async (req, res, next) => {
        try {
            const filter = {};
            const options = {
                limit: req.query.limit || 10,
                page: req.query.page || 1,
                sort: { title: 1 },
                lean: true,
            };
            const { _id } = req.user;
            if (_id) {
                filter.user_id = _id;
            }
            const response = await this.service.checkout({ filter, options });
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    };
}

export default PaymentsController;
const controller = new PaymentsController();
const { checkout } = controller;
export { checkout };
