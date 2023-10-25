import routerx from 'express-promise-router'
import userController from '../controllers/UserController'
import auth from '../service/auth'
//diego estuvo aqui
const router = routerx();
// ,auth.verifyAdmin
router.post("/register",userController.register)
router.post("/login_tienda",userController.login)

export default router;