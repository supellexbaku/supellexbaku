export async function POST(req) {
  const body = await req.json();

  await fetch("http://localhost:3000/product", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      ...body,
      price:""
    })
  });

  return Response.json({ ok:true });
}
