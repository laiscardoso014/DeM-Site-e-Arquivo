// D&M Contabilidade · renova a chave do Instagram (roda sozinha toda segunda-feira)
// A chave vale 60 dias; cada renovação estende por mais 60 dias.
// Variáveis na Vercel: IG_TOKEN e CRON_SECRET
module.exports = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ erro: 'não autorizado' });
  }
  const token = process.env.IG_TOKEN;
  const r = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`);
  const d = await r.json();
  if (!r.ok || d.error) {
    console.error('Renovação falhou:', d.error || r.status);
    return res.status(502).json({ ok: false });
  }
  const dias = Math.round(d.expires_in / 86400);
  const mesmaChave = d.access_token === token;
  console.log(`Chave renovada: vale por mais ${dias} dias. ${mesmaChave ? 'Mesma chave.' : 'ATENÇÃO: o Instagram devolveu uma chave NOVA — atualize IG_TOKEN na Vercel.'}`);
  return res.status(200).json({ ok: true, dias, mesmaChave });
};
