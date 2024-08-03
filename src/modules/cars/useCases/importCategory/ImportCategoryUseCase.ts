import fs from "fs";
import { IMuterFile } from "../../../../interfaces/multer";

export class ImportCategoryUseCase {
    async execute(file: IMuterFile | undefined) {
        const stream = await fs.createReadStream(file.path);
        stream.pipe();
    }
}
