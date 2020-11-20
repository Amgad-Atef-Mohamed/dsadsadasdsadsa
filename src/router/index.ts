import { Router } from 'express'

const router: Router = Router()

router.use('*', function (req, res) {
    return res.status(200).send('this is the root Api')
});

export default router
