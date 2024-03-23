import fs from "fs";
import { IncomingForm } from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  console.log("Request method:", req.method);
  if (req.method === "POST") {
    try {
      const form = new IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form:", err);
          return res
            .status(500)
            .json({ error: "Error parsing form data", status: false });
        }

        const { password } = fields;
        const file = files?.file[0];

        // Match the password against the environment keyword
        const keyword = process.env.KEYWORD;
        if (password != keyword) {
          return res
            .status(400)
            .json({ error: "Invalid password keyword", status: false });
        }

        // Delete the existing wallets.csv file if it exists
        const previousFilePath = path.join(
          process.cwd(),
          "public",
          "wallets.csv"
        );
        if (fs.existsSync(previousFilePath)) {
          fs.unlinkSync(previousFilePath);
        }
        console.log("File path:", file);
        try {
          fs.writeFileSync(
            path.join(process.cwd(), "public", "wallets.csv"),
            fs.readFileSync(file._writeStream.path)
          );
        } catch (e) {
          console.log(e);
        }
        res
          .status(200)
          .json({ message: "File uploaded successfully", status: true });
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
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
