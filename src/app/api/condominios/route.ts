import { getCondominios } from "@/services/condominio.service";
import { NextResponse } from "next/server";
import { createCondominio, ICondominio } from "@/services/condominio.service";

//GET /api/condominios
export async function GET() {
  try {
    const data = await getCondominios();

    return NextResponse.json({
        success: true,
        count: data.length,
        data,
    }, { status: 200 });
  } catch (e:any) {
    return NextResponse.json({
        success: false,
        error: e.message ?? "Erro inesperado",
    }, { status: 400 });
  }
}

// POST /api/condominios
export async function POST(req: Request) {
  try {
    const body: ICondominio = await req.json();
    const data = await createCondominio(body);

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message ?? "Erro inesperado" }, { status: 400 });
  }
}
// export async function POST(req: Request) {
//   const body = await req.json();
//   return NextResponse.json({ message: "POST recebido!", body });
// }
