import service from "../services/orders.service.js";
import productService from "../services/products.service.js";
import errors from "../utils/errors/errors.js";
import CustomError from "../utils/errors/CustomError.js";
class OrdersController {
    constructor() {
        this.service = service;
        this.prodService = productService;
    }
    create = async (req, res, next) => {
        try {
            const data = req.body;
            const { user_id, product_id } = data;
            const one = await this.prodService.readOne(product_id);
            if (one.owner_id.toString() === user_id) {
                return CustomError.new(errors.userProd);
            } else {
                const response = await this.service.create(data);
                return res.success201(response);
            }
        } catch (error) {
            return next(error);
        }
    };
    read = async (req, res, next) => {
        try {
            const options = {
                limit: req.query.limit || 20,
                page: req.query.page || 1,
                sort: { title: 1 },
                lean: true,
            };
            const filter = {};
            if (req.user._id) {
                filter.user_id = req.user._id;
            }
            if (req.query.sort === "desc") {
                options.sort.title = "desc";
            }
            const all = await this.service.read({ filter, options });
            return res.success200(all);
        } catch (error) {
            return next(error);
        }
    };
    report = async (req, res, next) => {
        try {
            const { uid } = req.params;
            const report = await this.service.reportBill(uid);
            return res.json({
                statusCode: 200,
                response: report,
            });
        } catch (error) {
            return next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const { oid } = req.params;
            const data = req.body;
            const response = await this.service.update(oid, data);
            return res.success200(response);
        } catch (error) {
            return next(error);
        }
    };
    destroy = async (req, res, next) => {
        try {
            const { oid } = req.params;
            const response = await this.service.destroy(oid);
            return res.success200(response);
        } catch (error) {
            return next(error);
        }
    };
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, report, update, destroy } = controller;
export { create, read, report, update, destroy };
