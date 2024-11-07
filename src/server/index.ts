import jsonServer from 'json-server';
import { Request, Response } from 'express';
import scores from './data/scores.json';

const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.get('/sustainabilityScores/:company', (req:Request, res:Response) => {
    const company = req.params.company;
    const result = scores.sustainabilityScores.find((score: { company : string}) => score.company === company);
    result ? res.json(result) : res.status(404).send('Company not found');
});

server.get('/sustainabilityScores', (req:Request, res:Response) => {
    res.json(scores.sustainabilityScores);
});

server.listen(3000, () => {
    console.log('Mock server is running on http://localhost:3000');
});

