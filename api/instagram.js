// D&M Contabilidade · últimos posts do Instagram
// Função da Vercel: GET /api/instagram
// Variável de ambiente necessária na Vercel: IG_TOKEN (chave de longa duração)
module.exports = async (req, res) => {
  const token = process.env.IG_TOKEN;
  if (!token) return res.status(503).json({ erro: 'IG_TOKEN não configurado', posts: [] });

  const campos = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const url = `https://graph.instagram.com/me/media?fields=${campos}&limit=8&access_token=${encodeURIComponent(token)}`;

  try {
    const r = await fetch(url);
    const d = await r.json();
    if (!r.ok || d.error) {
      console.error('Instagram:', d.error || r.status);
      return res.status(502).json({ erro: 'Falha ao ler o Instagram', posts: [] });
    }
    const posts = (d.data || [])
      .map(p => ({
        id: p.id,
        tipo: p.media_type,                                   // IMAGE | VIDEO | CAROUSEL_ALBUM
        imagem: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
        legenda: (p.caption || '').trim(),
        link: p.permalink,
        permalink: p.permalink,
        data: p.timestamp
      }))
      .filter(p => p.imagem);

    // guarda em cache por 1 hora na Vercel (e até 1 dia se o Instagram falhar)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ posts });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ erro: 'Falha ao ler o Instagram', posts: [] });
  }
};
