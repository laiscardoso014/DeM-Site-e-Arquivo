// D&M Contabilidade · nota e avaliações do Google (Places API New)
// Função da Vercel: GET /api/avaliacoes
// Variáveis na Vercel:
//   GOOGLE_PLACES_KEY  (obrigatória) chave da API, restrita à "Places API (New)"
//   GOOGLE_PLACE_ID    (opcional)   ID do lugar; se faltar, a função procura e devolve em "placeId"

const BUSCA = 'D&M Contabilidade, Rua Anita Garibaldi 65, Bom Retiro, SC';
// pessoas da equipe: avaliações delas não aparecem no site (conflito de interesse)
const EQUIPE = ['neiva', 'alison', 'donizete', 'fabricio', 'fabrício', 'jessica', 'jéssica', 'mateus', 'darla', 'lais', 'laís'];

module.exports = async (req, res) => {
  const key = process.env.GOOGLE_PLACES_KEY;
  if (!key) return res.status(503).json({ erro: 'GOOGLE_PLACES_KEY não configurada' });

  try {
    let placeId = process.env.GOOGLE_PLACE_ID;
    if (!placeId) {
      const b = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'places.id' },
        body: JSON.stringify({ textQuery: BUSCA, languageCode: 'pt-BR', regionCode: 'BR' })
      }).then(r => r.json());
      placeId = b.places && b.places[0] && b.places[0].id;
      if (!placeId) return res.status(404).json({ erro: 'Lugar não encontrado' });
    }

    const r = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR&regionCode=BR`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri,googleMapsLinks'
      }
    });
    const d = await r.json();
    if (!r.ok || d.error) {
      console.error('Places:', d.error || r.status);
      return res.status(502).json({ erro: 'Falha ao ler o Google' });
    }

    const daEquipe = nome => {
      const n = (nome || '').toLowerCase();
      return EQUIPE.some(p => n.split(/\s+/)[0] === p);
    };

    const avaliacoes = (d.reviews || [])
      .filter(v => v.rating >= 4 && v.text && v.text.text && !daEquipe(v.authorAttribution && v.authorAttribution.displayName))
      .map(v => ({
        nota: v.rating,
        texto: v.text.text,
        traduzida: !!(v.originalText && v.text.languageCode !== v.originalText.languageCode),
        quando: v.relativePublishTimeDescription,
        autor: (v.authorAttribution && v.authorAttribution.displayName) || 'Usuário do Google',
        autorLink: v.authorAttribution && v.authorAttribution.uri,
        autorFoto: v.authorAttribution && v.authorAttribution.photoUri,
        link: v.googleMapsUri || d.googleMapsUri
      }));

    // sem cache de avaliações (política do Google); o site só chama quando a seção aparece na tela
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      placeId,
      nota: d.rating,
      total: d.userRatingCount,
      mapa: d.googleMapsUri,
      avaliar: (d.googleMapsLinks && d.googleMapsLinks.writeAReviewUri) || d.googleMapsUri,
      avaliacoes
    });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ erro: 'Falha ao ler o Google' });
  }
};
