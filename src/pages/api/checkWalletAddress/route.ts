import fs from 'fs';

export async function matchWallets(walletAddress: any) {
    const filePath = 'public/wallets.csv'; // Replace with the path to your CSV file

    return new Promise((resolve: any, reject: any) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const addresses = data.split('\n').map((line) => line.trim()).filter(Boolean);

            if (addresses.includes(walletAddress)) {
                console.log(`Match found for ${walletAddress}`);
                resolve(true);
            } else {
                console.log(`No match found for ${walletAddress}`);
                resolve(false);
            }
        });
    });
}

