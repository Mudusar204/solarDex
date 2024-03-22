import { matchWallets } from '@/pages/api/checkWalletAddress/route'; // Adjust the path accordingly

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const walletAddress  =  req.body;

    if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }

    try {
        const matchResult = await matchWallets(walletAddress);
        if (matchResult) {
            return res.status(200).json({ message: 'Wallet address matched', status: true });
        } else {
            return res.status(200).json({ message: 'Wallet address did not match', status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
