import checkoutController from "../../controllers/payments.controller";
import CustomRouter from "../CustomRouter";

class PaymentsRouter extends CustomRouter {
    init() {
        this.create("/checkout", checkoutController);
    }
}

const paymentsRouter = new PaymentsRouter();
export default paymentsRouter.getRouter();
