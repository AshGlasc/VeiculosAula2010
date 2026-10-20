import { Router } from "express";
import { veiculosServices } from "../services/veiculos.Services.js";

export const veiculosRouter = Router();

veiculosRouter.get("/", async (req, res) => {
    try {
        const veiculos = await veiculosServices.getall();
        res.json(veiculos);
    }catch (error) {
    
        console.error (error);
    }
});
veiculosRouter.post("/", async (req, res) => {
    try {
        const veiculos = await veiculosServices.create(req.body);
         res.status(201).json(veiculos);
    }catch (error) {
        console.error (error);
    }
});

veiculosRouter.get("/:id", async (req, res) => {
    try {
        const veiculo = await veiculosServices.getbyid(req.params.id);
        res.json(veiculo);
    }catch (error) {

        console.error (error);
    }
});

veiculosRouter.delete("/:id", async (req, res) => {
    const veiculoID = req.params.id;
    try {
        const veiculo = await veiculosServices.delete(veiculoID);
        res.json(veiculo);
    }catch (error) {
        console.error (error);
    }
});