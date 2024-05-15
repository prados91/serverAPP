import CustomRouter from "../CustomRouter.js";

export default class CookiesRouter extends CustomRouter {
    init() {
        //para setear cookies
        this.read("/set/:modo", async (req, res, next) => {
            try {
                const { modo } = req.params;
                const maxAge = 60000 * 5;
                const signed = true;
                return res
                    .cookie("modo", modo, { maxAge })
                    .cookie("sessionId", "hola1234", { maxAge, signed })
                    .json({
                        statusCode: 200,
                        message: "Cookie configurada - Modo: " + modo,
                    });
            } catch (error) {
                return next(error);
            }
        });

        //para leer cookies
        this.read("/read", async (req, res, next) => {
            try {
                const modo = req.cookies.modo;
                const sessionId = req.signedCookies.sessionId;
                return (
                    res
                        //.status(200)    //mientras no declare este método: la API es REST (stateless)
                        .json({
                            statusCode: 200,
                            response: { modo, sessionId },
                        })
                );
            } catch (error) {
                return next(error);
            }
        });

        //para eliminar cookies
        this.read("/clear", async (req, res, next) => {
            try {
                return res
                    .clearCookie("modo")
                    .clearCookie("sessionId")
                    .json({
                        statusCode: 200,
                        response: {
                            modo: req.cookies.modo,
                            sessionId: req.signedCookies.sessionId,
                        },
                    });
            } catch (error) {
                return next(error);
            }
        });
    }
}
