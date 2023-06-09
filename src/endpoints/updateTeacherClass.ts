import { Request, Response } from "express";
import { UpdateTeacher } from "../models/UpdateTeacher";
import connection from "../data/connection";

export const moveTeacherToDifferentClass = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400;
    try {
        const input: UpdateTeacher = {
            docente_id: req.body.docente_id,
            turma_id: req.body.turma_id
        };

        await connection.raw(`
        UPDATE DOCENTE 
        SET turma_id = ${input.turma_id}
        WHERE id = ${input.docente_id}
        `);
        res.status(200).send({ message: "As informações foram atualizadas com sucesso!" })
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    };
};