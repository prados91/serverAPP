/*import Stripe from "stripe";
import CheckoutProduct from "../data/dto/checkout.dto.js";
import cartsManager from "../data/mongo/CartsManager.mongo.js";
//IMPLEMENTAR dao!!! ACA NO FUE IMPLEMENTADO

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutRepository = async (filter) => {
    try {
        let productsOnCart = await cartsManager.read(filter);
        productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each));
        console.log(productsOnCart);
        const line_items = productsOnCart;
        const mode = "payment";
        const success_url = "http://localhost:8080/thanks.html";
        const intent = await stripe.checkout.sessions.create({
            line_items,
            mode,
            success_url,
        });
        return intent;
    } catch (error) {
        throw error;
    }
};

export default checkoutRepository;*/
import Stripe from "stripe";
import env from "../utils/env.utils.js";
import dao from "../data/index.factory.js";
import CheckoutDTO from "../dto/checkout.dto.js";

const { orders } = dao;
const stripe = new Stripe(env.STRIPE);
class PaymentsRep {
    constructor() {
        this.model = orders;
    }
    read = async ({ filter, options }) => await this.model.read({ filter, options });
    checkout = async ({ filter, options }) => {
        const cart = await orders.read({ filter, options });
        let productsOnCart = cart.docs;
        productsOnCart = productsOnCart.map((each) => new CheckoutDTO(each));
        const line_items = productsOnCart;
        const mode = "payment";
        const success_url = "http://localhost:8080/thanks.html";
        const intent = await stripe.checkout.sessions.create({
            line_items,
            mode,
            success_url,
        });
        return intent;
    };
}
const repository = new PaymentsRep();
export default repository;
