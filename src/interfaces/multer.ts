import { FastifyRequest } from "fastify";

export interface ICustomFastifyRequest extends FastifyRequest {
    file?: {
        buffer: Buffer;
        encoding: string;
        fieldname: string;
        mimetype: string;
        originalname: string;
        size: number;
    };
}
