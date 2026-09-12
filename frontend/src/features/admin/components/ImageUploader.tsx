import { useRef, useState, type ChangeEvent } from 'react';
import { imageService } from '../../../services/imageService';
import { useAuth } from '../hooks/useAuth';

interface ImageUploaderProps { images: string[]; onChange: (images: string[]) => void }

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const { token } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!files.length || !token) return;
    if (images.length + files.length > 30) { setError('O veículo pode possuir no máximo 30 imagens.'); return; }
    setIsUploading(true); setError(null);
    try {
      const urls: string[] = [];
      for (let index = 0; index < files.length; index += 10) urls.push(...await imageService.upload(token, files.slice(index, index + 10)));
      onChange([...images, ...urls]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Não foi possível enviar as imagens.');
    } finally { setIsUploading(false); }
  }

  function move(index: number, direction: -1 | 1): void {
    const destination = index + direction;
    if (destination < 0 || destination >= images.length) return;
    const reordered = [...images];
    [reordered[index], reordered[destination]] = [reordered[destination], reordered[index]];
    onChange(reordered);
  }

  return <div><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-bold text-brand-950">Imagens</h3><p className="mt-1 text-sm text-slate-500">A primeira imagem será usada como capa. JPEG, PNG ou WebP, até 5 MB.</p></div><button className="rounded-xl border border-brand-300 bg-white px-4 py-2.5 text-sm font-bold text-brand-800 hover:bg-brand-50 disabled:opacity-50" disabled={isUploading} onClick={() => inputRef.current?.click()} type="button">{isUploading ? 'Enviando...' : 'Adicionar imagens'}</button><input ref={inputRef} accept="image/jpeg,image/png,image/webp" className="hidden" multiple onChange={(event) => void handleFiles(event)} type="file" /></div>{error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700" role="alert">{error}</p>}{images.length === 0 ? <div className="mt-5 rounded-xl border border-dashed border-brand-300 bg-brand-50 px-4 py-8 text-center text-sm text-brand-700">Nenhuma imagem adicionada.</div> : <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map((url, index) => <article className="overflow-hidden rounded-xl border border-brand-100 bg-brand-50" key={`${url}-${index}`}><div className="relative aspect-[4/3]"><img alt={`Imagem ${index + 1} do veículo`} className="h-full w-full object-cover" src={url} />{index === 0 && <span className="absolute left-2 top-2 rounded-full bg-brand-950 px-2.5 py-1 text-xs font-bold text-white">Capa</span>}</div><div className="grid grid-cols-3 gap-1 p-2"><button aria-label="Mover imagem para a esquerda" className="rounded-lg bg-white py-2 text-sm font-bold text-brand-800 disabled:opacity-30" disabled={index === 0} onClick={() => move(index, -1)} type="button">←</button><button aria-label="Mover imagem para a direita" className="rounded-lg bg-white py-2 text-sm font-bold text-brand-800 disabled:opacity-30" disabled={index === images.length - 1} onClick={() => move(index, 1)} type="button">→</button><button className="rounded-lg bg-red-50 py-2 text-xs font-bold text-red-700" onClick={() => onChange(images.filter((_, imageIndex) => imageIndex !== index))} type="button">Remover</button></div></article>)}</div>}</div>;
}
