import { getGeminiClient, getRequestBody } from '../utils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const body = await getRequestBody(req);
    const { message, history } = body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction:
          "Sos el asesor virtual estrella de 'Mudanzas Mendoza 2026'. Ayudás al cliente con dudas de embalaje, fletes, consejos locales, cómo empacar heladeras, copas de cristal o colchones. Hablás como mendocino (amigable, cercano, usando 'al toque', 'che', 'mate de por medio', 'no te rompás la cabeza'). Ofrecé sutilmente usar el Cotizador de la web o tocar el botón de WhatsApp para fijar fecha.",
      },
    });

    return res.status(200).json({ success: true, text: response.text });
  } catch (error: any) {
    console.warn('Gemini chat error or uninitialized. Returning elegant local rule-based response:', error?.message);

    const body = await getRequestBody(req);
    const message = body?.message || '';
    const msgLower = String(message).toLowerCase();
    let reply =
      '¡Hola, che! Qué buena consulta. Mirá, para darte una respuesta bien certera para tu caso, te sugiero usar nuestro **Cotizador de 8 pasos** de la Home o mandarnos un **WhatsApp** directo. ¡Te contestamos al toque!';

    if (msgLower.includes('heladera')) {
      reply =
        '¡Mudar la heladera tiene su ciencia! Recordá desenchufarla unas 24 horas antes para que se descongele completa, limpiala bien, sacale los estantes de vidrio y recordá: **debe viajar siempre de pie**. Cuando llegue al destino, esperá al menos 4 horas antes de volver a enchufarla para que se asiente el aceite.';
    } else if (msgLower.includes('precio') || msgLower.includes('cuanto cuesta') || msgLower.includes('tarifa') || msgLower.includes('costo')) {
      reply =
        'Las tarifas de los fletes dependen del tamaño del camión y los kilómetros. Son súper baratas y transparentes. Podés calcular la tuya al instante usando el **Cotizador Inteligente** de nuestra web.';
    } else if (msgLower.includes('caja') || msgLower.includes('embalar') || msgLower.includes('vaso') || msgLower.includes('plato')) {
      reply =
        'Para platos y copas, usá cajas chicas de cartón grueso para que no queden pesadas. Poné bollos de papel de diario abajo de todo como colchón, envolvé cada vajilla por separado y rellená todos los espacios vacíos con papel arrugado para que nada baile en el camión.';
    } else if (msgLower.includes('zonda') || msgLower.includes('viento') || msgLower.includes('clima')) {
      reply =
        'Si sopla **Viento Zonda** fuerte, ¡mucha precaución! Por la seguridad de tus cosas y de nuestros operarios, coordinamos de inmediato para reprogramar la mudanza al día siguiente o al toque que calme, sin cobrarte ningún extra.';
    } else if (msgLower.includes('chacras') || msgLower.includes('lujan') || msgLower.includes('barrio privado')) {
      reply =
        'Trabajamos muchísimo en Luján, Chacras de Coria y Maipú. Presentamos toda la documentación de nuestro personal y vehículos (seguros, ART) a la administración del barrio privado de antemano para que entremos sin demoras el día de la mudanza.';
    }

    return res.status(200).json({ success: true, text: reply });
  }
}
