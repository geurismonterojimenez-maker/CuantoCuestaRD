import { useEffect, useRef } from 'react';

interface AdSlotProps {
  id?: string;
  placement?: string;
}

function getAdSlotDetails(id: string, placement?: string) {
  const lowercaseId = id.toLowerCase();
  const lowercasePlacement = (placement || '').toLowerCase();
  
  if (
    lowercaseId.includes('under-hero') || 
    lowercaseId.includes('top') ||
    lowercasePlacement.includes('hero')
  ) {
    return { slot: '2477768331', label: 'Anuncio 1 - Superior' };
  }
  
  if (
    lowercaseId.includes('after-results') || 
    lowercaseId.includes('receipt') || 
    lowercaseId.includes('middle') ||
    lowercasePlacement.includes('resultado') ||
    lowercasePlacement.includes('resumen') ||
    lowercasePlacement.includes('secciones')
  ) {
    return { slot: '8235271710', label: 'Anuncio 2 - Resultados' };
  }
  
  if (
    lowercaseId.includes('before-faq') || 
    lowercaseId.includes('faq') ||
    lowercasePlacement.includes('faq')
  ) {
    return { slot: '6922190046', label: 'Anuncio 3 - Preguntas Frecuentes' };
  }
  
  // Default fallback is Ad 4 (Footer / General)
  return { slot: '4048614694', label: 'Anuncio 4 - Inferior' };
}

export default function AdSlot({ id = 'default-ad', placement }: AdSlotProps) {
  const details = getAdSlotDetails(id, placement);
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Avoid double initialization in React StrictMode
    if (initialized.current) return;
    
    try {
      if (adRef.current && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        initialized.current = true;
      }
    } catch (e) {
      console.warn('AdSense load exception:', e);
    }
  }, []);

  return (
    <div 
      className="ad-slot-container" 
      id={id}
      data-placement={placement}
      aria-label={`Espacio publicitario: ${details.label}`}
    >
      <span className="ad-slot-title">Publicidad / Patrocinador</span>
      
      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6144599865368963"
        data-ad-slot={details.slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
