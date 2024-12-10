import CryptoJS from 'crypto-js';

const SECRET_KEY =
	process.env.NEXT_PUBLIC_GAME_STATE_SECRET || 'default-secret-key';

export function encryptData(data: any): string {
	return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptData(encryptedData: string): any {
	const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function generateHash(data: any): string {
	return CryptoJS.SHA256(JSON.stringify(data) + SECRET_KEY).toString();
}
