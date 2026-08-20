import { useEffect, useRef } from 'react';

interface AdSlotProps {
  id?: string;
  placement?: string;
}

interface AdSenseWindow extends Window {
  adsbygoogle?: Array<Record<string, unknown>>;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  const initializing = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const container = containerRef.current;
    if (!container) return;

    const initializeAd = () => {
      const ad = adRef.current;
      if (initialized.current || initializing.current || !ad) return;
      if (ad.dataset.adsbygoogleStatus || ad.getBoundingClientRect().width <= 0) {
        initialized.current = Boolean(ad.dataset.adsbygoogleStatus);
        return;
      }

      initializing.current = true;
      try {
        const adSenseWindow = window as AdSenseWindow;
        (adSenseWindow.adsbygoogle ??= []).push({});
        initialized.current = true;
      } catch (error) {
        console.warn('AdSense load exception:', error);
      } finally {
        initializing.current = false;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          requestAnimationFrame(initializeAd);
          if (initialized.current) observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      if (adRef.current?.getBoundingClientRect().width) initializeAd();
    });
    resizeObserver.observe(container);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
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
