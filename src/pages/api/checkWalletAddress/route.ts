import fs from "fs";
import path from "path";

export async function matchWallets(walletAddress: any) {
  const filePath: string = path.join(process.cwd(), "src", "wallets.csv");

  return new Promise((resolve: any, reject: any) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const addresses = data
          .split(/(0x[a-fA-F0-9]{40})/)
          .map((line) => line.trim())
          .filter(Boolean);

      const lowercaseWalletAddress = walletAddress.toLowerCase();

      if (addresses.some(addr => addr.toLowerCase() === lowercaseWalletAddress)) {
        console.log(`Match found for ${walletAddress}`);
        resolve(true);
      } else {
        console.log(`No match found for ${walletAddress}`);
        resolve(false);
      }

    });
});
}
