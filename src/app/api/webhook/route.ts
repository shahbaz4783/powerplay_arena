import { handleUpdate } from "@/src/actions/bot.action";

export async function POST(request: Request) {
	return handleUpdate(request);
}
