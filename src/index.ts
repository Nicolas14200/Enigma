import 'reflect-metadata';
import express from "express";
import { configureExpress } from './app/config/configureExpress';

const PORT = 3000;

const app = express()

configureExpress(app)

app.listen(PORT, () => {
    console.info(`Starting server on http://localhost:${PORT}`);
})