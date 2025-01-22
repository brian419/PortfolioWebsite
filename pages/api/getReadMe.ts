// import fs from 'fs';
// import path from 'path';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { filename } = req.query;

//     if (!filename) {
//         return res.status(400).json({ error: 'Filename is required' });
//     }

//     try {
//         const filePath = path.join(process.cwd(), 'readme-folder', `${filename}`);
//         const fileContent = fs.readFileSync(filePath, 'utf-8');
//         res.status(200).json({ content: fileContent });
//     } catch (error) {
//         res.status(500).json({ error: 'File not found or unable to read' });
//     }
// }


import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { filename } = req.query;

    if (!filename || typeof filename !== 'string') {
        console.error('Invalid filename:', filename);
        return res.status(400).json({ error: 'Filename is required and must be a string' });
    }

    try {
        const filePath = path.join(process.cwd(), '/src/app/websites-page/readme-folder', filename);
        console.log('Attempting to read file at:', filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        res.status(200).json({ content: fileContent });
    } catch (error) {
        console.error('Error reading file:', error.message);
        res.status(500).json({ error: 'File not found or unable to read' });
    }
}
