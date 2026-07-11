import { useEffect } from 'react';

/**
 * Hook genérico para inyectar y gestionar dinámicamente un script de Schema.org (JSON-LD)
 * en el <head> del documento.
 *
 * @param schema - El objeto de schema JSON-LD a inyectar. Si es nulo, el script se eliminará.
 * @param scriptId - Un ID único para el elemento <script> para poder gestionarlo.
 */
export function useSchema(schema: object | null, scriptId: string): void {
  useEffect(() => {
    if (!schema) {
      return;
    }

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema, null, 2);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [schema, scriptId]);
}