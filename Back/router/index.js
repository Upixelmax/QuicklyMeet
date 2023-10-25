import routerx from 'express-promise-router'
import User from './User'
import Horario from './Horario';

// http://localhost:3000/api/users/register
const router = routerx();

router.use('/users',User);
router.use('/horario',Horario);

export default router;