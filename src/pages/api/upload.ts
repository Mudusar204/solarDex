// pages/api/upload.js
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';

const upload = multer();

export const config = {
    api: {
        bodyParser: true, // Disable body parsing, let multer handle it
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { password } = req.body;
        console.log('password uploaded', req.file)
        return req.body;
        try {
            await upload.single('file')(req, res);
            if (!req.file) {
                // return res.status(400).json({ error: 'No file uploaded' });
                return res.status(400).json({ error: 'No file uploaded' });
            }

            if (req.file.mimetype !== 'text/csv') {
                return res.status(400).json({ error: 'Uploaded file is not a CSV' });
            }

            // const { password } = req.body;
            const keyword = process.env.KEYWORD;

            if (password !== keyword) {
                return res.status(400).json({ error: 'Invalid password keyword' });
            }

            const filePath = path.join(process.cwd(), 'uploads', 'wallets.csv');
            fs.rename(req.file.path, filePath, (err) => {
                if (err) {
                    console.error('Error renaming file:', err);
                    return res.status(500).json({ error: 'Error renaming file' });
                }

                console.log('File replaced:', filePath);
                res.status(200).json({ message: 'File uploaded and replaced successfully' });
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Error uploading file' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
