import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cep = (searchParams.get('cep') || '').replace(/[^0-9]/g, '');
    if (!cep || cep.length !== 8) {
      return NextResponse.json({ error: 'CEP inválido. Informe 8 dígitos.' }, { status: 400 });
    }

    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!res.ok) {
      return NextResponse.json({ error: 'Erro ao consultar ViaCEP' }, { status: 502 });
    }
    const data = await res.json();
    if (data.erro) {
      return NextResponse.json({ error: 'CEP não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ data });
  } catch (err) {
    console.error('CEP API error', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
