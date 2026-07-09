import { getGeminiClient, getRequestBody } from '../utils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const body = await getRequestBody(req);
    const {
      origin,
      destination,
      housingType,
      rooms,
      floor,
      elevator,
      services,
      specialItems,
      date,
      name,
    } = body;

    const prompt = `Hola Gemini. Soy ${name || 'un mendocino'}. Me voy a mudar y quiero que me prepares un plan paso a paso.
Detalles:
- Origen: ${origin || 'No indicado'}
- Destino: ${destination || 'No indicado'}
- Tipo: ${housingType || 'casa'}
- Ambientes: ${rooms || '2'}
- Piso: ${floor || 'PB'}
- Ascensor: ${elevator || 'No'}
- Servicios: ${services && services.length > 0 ? services.join(', ') : 'Flete básico'}
- Especiales: ${specialItems && specialItems.length > 0 ? specialItems.join(', ') : 'Ninguno'}
- Fecha estimada: ${date || 'Próximamente'}

Por favor, armá una respuesta cálida, directa y que transmita confianza.
Usá expresiones mendocinas amigables de forma natural (ej. "darle un mate", "al toque", "no te rompás la cabeza", "viento zonda").
Incluí:
1. Un checklist cronológico recomendado (una semana antes, el día previo, el gran día).
2. Recomendaciones locales sobre Mendoza y el departamento de destino (${destination || 'Mendoza'}).
3. Consejos puntuales para los objetos especiales seleccionados (${specialItems && specialItems.length > 0 ? specialItems.join(', ') : 'embalaje seguro'}).
Hacélo en formato Markdown claro con títulos descriptivos.`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction:
          "Sos el asistente oficial de Mudanzas Mendoza 2026. Tu personalidad es muy cercana, confiable, mendocina de pura cepa, súper servicial y cero formal-corporativa. Tu objetivo es calmar los nervios del cliente y darle tips de oro.",
      },
    });

    return res.status(200).json({ success: true, plan: response.text });
  } catch (error: any) {
    console.warn('Gemini is not initialized or errored. Returning elegant local fallback:', error?.message);
    const body = await getRequestBody(req);
    const { origin, destination, specialItems } = body;
    const hasSpecial = specialItems && specialItems.length > 0;

    const fallbackText = `### ¡Hola! Qué alegría que estés planificando tu mudanza con nosotros.

Como andamos con mucha demanda o la IA está tomando un media tarde, acá te armamos el **Plan de Mudanza Experto de Mendoza 2026** para tu traslado de **${origin || 'origen'}** a **${destination || 'destino'}**:

#### 📅 Checklist de Oro para vos:
1. **7 días antes:** Empezá a embalar lo que no usás a diario. Conseguí cajas resistentes y rotulalas en el lateral indicando a qué habitación van.
2. **2 días antes:** Descongelá y secá la heladera por completo. Guardá toda la vajilla envuelta en papel.
3. **El día previo:** Prepará tu "Mochila de Supervivencia" con el termo, mate, cargador de celular y una muda de ropa.
4. **El Gran Día:** ¡Relajate! Nuestro equipo llega puntual en el camión, carga todo de forma profesional y nos encargamos de que no te rompás la cabeza cargando muebles pesados.

${hasSpecial ? `#### ⚠️ Cuidado de objetos especiales (${specialItems.join(', ')}):
* Nos encargamos de sujetar con fajas de amarre tu ${specialItems[0]} y envolverlo en mantas protectoras gruesas de algodón para que viaje como en una nube.
` : ''}

#### 🍷 Tip Mendocino:
* Si te mudás en época de **Viento Zonda**, avisanos. Coordinamos al toque para resguardar la carga y que todo se haga con total seguridad.

**¿Querés fijar este presupuesto?** Hacé clic en el botón de **WhatsApp** abajo para enviar este formulario directo a un asesor de carne y hueso, ¡te respondemos en un minuto!`;

    return res.status(200).json({ success: true, plan: fallbackText });
  }
}
