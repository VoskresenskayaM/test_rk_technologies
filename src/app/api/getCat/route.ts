import { NextResponse } from "next/server";
import ky from "ky"


export async function GET() {

    try {
        const result = await ky.get('https://api.thecatapi.com/v1/images/search?limit=1', {
            method: "GET",
            headers: {
                Accept: "text/plain",
                "Content-Type": "application/json",
                "x-api-key": "live_UQzJaFWOclKjoa4a2j6QU6MQNr6SB9c3xbqNjMCYEtIO02SdgN8UU2apYN8jO3WJ"
            },
            redirect: 'follow'

        });
        const res = await result.json()
        const response = NextResponse.json(res);
        return response;
    }

    catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Request failed' }, { status: 500 });
    }


}