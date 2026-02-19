import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function GET(req: Request, { params }: { params: { filename: string } }) {
    // Define your storage path (outside of /public)
    console.log(params);
    const {filename} = await params;
    console.log(filename);
    const filePath = path.join(process.cwd(), 'public', filename);
    console.log(filePath);
    try {
        const file = await readFile(filePath);
        // @ts-ignore
        return new Response(file, { headers: { 'Content-Type': 'application/octet-stream' } });
    } catch (e) {
        return new Response("Not Found", { status: 404 });
    }
}