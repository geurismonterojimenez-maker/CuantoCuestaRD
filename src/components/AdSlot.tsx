interface AdSlotProps {
  id?: string;
  placement?: string;
}

export default function AdSlot({ id = 'default-ad', placement }: AdSlotProps) {
  return (
    <div 
      className="ad-slot-container" 
      id={id}
      data-placement={placement}
      aria-label="Espacio publicitario"
    >
      <span className="ad-slot-title">Publicidad / Patrocinador</span>
      <div className="ad-slot-mock">
        [ Espacio listo para Google AdSense ({placement || 'General'}) ]
      </div>
    </div>
  );
}
