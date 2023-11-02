import express, { Application } from "express";
import { useContainer, useExpressServer } from "routing-controllers";
import { SecurityShemesController } from "../modules/SecurityShemesController";
import { AppDependencies } from "./AppDependencies";

export function configureExpress(app: Application) {
    
    const routes = [SecurityShemesController];

    const container = new AppDependencies().init();
    
    app.use(express.json());
    
    useContainer(container);
    
    useExpressServer(app, {
        controllers: routes
    })
    return container
}