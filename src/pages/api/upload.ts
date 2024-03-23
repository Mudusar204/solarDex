import fs from 'fs';
import {IncomingForm} from 'formidable';
import path from "path";


export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req, res) {
    console.log('Request method:', req.method);
    if (req.method === 'POST') {
        const form = new IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return res.status(500).json({ error: 'Error parsing form data' });
            }

            const { password } = fields;
            const { file } = files;

            console.log('Password:', password[0]);
            console.log('Uploaded file:', file[0]);
            console.log('Keyword:', process.env.KEYWORD);

            // Validate file type (assuming you want to check if it's a CSV file)
            // if (file.mimetype !== 'text/csv') {
            //     return res.status(400).json({ error: 'Uploaded file is not a CSV' });
            // }

            // Match the password against the environment keyword
            const keyword = process.env.KEYWORD;
            if (password != keyword) {
                return res.status(400).json({ error: 'Invalid password keyword' });
            }

            // Delete the existing wallets.csv file if it exists
            const previousFilePath = path.join(process.cwd(), 'public', 'wallets.csv');
            if (fs.existsSync(previousFilePath)) {
                fs.unlinkSync(previousFilePath);
            }
            file.path = path.join(process.cwd(), 'public', 'wallets.csv');

            // fs.renameSync(file.path, previousFilePath);

            console.log('File uploaded:', previousFilePath);
            res.status(200).json({ message: 'File uploaded successfully' });

        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// export default async (req, res) => {
//     const form = new IncomingForm();
//     form.uploadDir = "./public";
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         console.log(err, fields, files);
//     });
// };