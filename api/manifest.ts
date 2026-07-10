export default function handler(req: any, res: any) {
  res.json({
    name: "Mudanzas Mendoza 2026",
    short_name: "MudanzasMendoza",
    description: "Fletes y mudanzas profesionales en Mendoza. Cotizaciones en el acto e inteligencia artificial de planificación.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#eab308",
    icons: [
      {
        src: "https://images.unsplash.com/photo-1512418490979-92798cfc32ec?auto=format&fit=crop&q=80&w=192",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "https://images.unsplash.com/photo-1512418490979-92798cfc32ec?auto=format&fit=crop&q=80&w=512",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  });
}
