import { FastifyRequest } from "fastify";

export interface ICustomFastifyRequest extends FastifyRequest {
    file?: IMuterFile;
}

export interface IMuterFile {
    buffer: Buffer;
    encoding: string;
    fieldname: string;
    mimetype: string;
    originalname: string;
    size: number;
    path: string;
}
