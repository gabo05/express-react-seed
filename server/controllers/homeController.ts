import { Request, Response } from 'express';
import * as rp from 'request-promise';

export = async (request: Request, response: Response) => {
    response.json({ status: true, action: request.params.action });
};