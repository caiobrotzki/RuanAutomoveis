import { useState } from 'react';

interface VehicleGalleryProps {
  images: string[];
  vehicleName: string;
}

export function VehicleGallery({ images, vehicleName }: VehicleGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] ?? null);

  if (!selectedImage) {
    return (
      <div className="grid aspect-[4/3] place-items-center bg-brand-100 text-brand-700">
        <div className="text-center">
          <span aria-hidden="true" className="text-5xl">🚘</span>
          <p className="mt-3 text-sm font-semibold">Imagens em breve</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative isolate aspect-[4/3] overflow-hidden bg-brand-100">
        <img
          alt={`${vehicleName} — imagem selecionada`}
          className="block size-full border-0 object-cover"
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
          src={selectedImage}
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              aria-label={`Visualizar imagem ${index + 1} de ${vehicleName}`}
              className={`aspect-square overflow-hidden border bg-brand-100 transition ${
                image === selectedImage ? 'border-brand-700' : 'border-brand-100 hover:border-brand-400'
              }`}
              key={`${image}-${index}`}
              onClick={() => setSelectedImage(image)}
              type="button"
            >
              <img alt="" className="size-full object-cover" loading="lazy" src={image} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
