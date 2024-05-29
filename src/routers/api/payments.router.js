import CustomRouter from "../CustomRouter.js";
import { checkout } from "../../controllers/payments.controller.js";

class PaymentsRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER", "PREM"], checkout);
    }
}

const paymentsRouter = new PaymentsRouter();
export default paymentsRouter.getRouter();
