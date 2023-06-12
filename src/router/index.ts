import express from 'express';
import authentication  from './authentication';
import users  from './users';

const router = express.Router();

// export the default function which is of type express router
export default (): express.Router => {
    authentication(router);
    users(router);
    return router;
};
