

## Plan: Melhorar estabilidade do zoom para todas as categorias

### Resultado dos testes
- **Bayonet (faca)**: Zoom 2.5x funcionou corretamente, transição suave ok
- **AK-47 (rifle)**: Modal abriu corretamente, imagem renderiza bem
- A automação do browser não consegue simular `onMouseMove` de forma confiável após o primeiro teste, mas o código é consistente para todos os tipos

### Problema identificado
Quando a imagem escala para 2.5x, o `getBoundingClientRect()` retorna o tamanho **escalado**, o que pode causar cálculos instáveis de `transformOrigin` e tilt. Isso é mais perceptível em imagens longas/horizontais (rifles) vs quadradas (luvas).

### Correções propostas (`SkinDetailModal.tsx`)

1. **Guardar o rect original (não-escalado)** usando um `ref` para o elemento da imagem. Capturar o rect no `mouseenter` (antes do scale) e usar esse rect fixo durante todo o hover
2. **Adicionar `onMouseEnter`** para capturar o rect inicial e setar `isHovering = true`
3. **Mover cálculos de `handleMouseMove`** para usar o rect salvo no ref, não o `getBoundingClientRect()` em tempo real
4. **Reduzir tilt 3D durante zoom** — quando em 2.5x, o tilt de 30° é excessivo. Reduzir para ~8° durante hover para um efeito sutil sem distorção
5. **`will-change: transform`** na img para performance de GPU

### Mudanças técnicas

```tsx
// Novo ref para guardar o rect original
const imgRef = useRef<HTMLImageElement>(null);
const originalRect = useRef<DOMRect | null>(null);

// Capturar rect antes do scale
const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
  originalRect.current = e.currentTarget.getBoundingClientRect();
  setIsHovering(true);
}, []);

// Usar rect salvo
const handleMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
  const rect = originalRect.current;
  if (!rect) return;
  const pctX = ((e.clientX - rect.left) / rect.width) * 100;
  const pctY = ((e.clientY - rect.top) / rect.height) * 100;
  const clampedX = Math.max(0, Math.min(100, pctX));
  const clampedY = Math.max(0, Math.min(100, pctY));
  const tiltStrength = 8; // reduzido de 30
  const x = (clampedX / 100 - 0.5) * tiltStrength;
  const y = (clampedY / 100 - 0.5) * -tiltStrength;
  setTilt({ x: y, y: x });
  setOrigin({ x: `${clampedX}%`, y: `${clampedY}%` });
}, []);

// Na img: adicionar onMouseEnter e will-change
<img
  ref={imgRef}
  onMouseEnter={handleMouseEnter}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={{ willChange: 'transform', ... }}
/>
```

### Resultado esperado
- Zoom suave e estável em facas, luvas, rifles e pistolas
- Sem saltos de posição quando o scale muda
- Tilt sutil que não distorce a imagem em 2.5x
- Performance otimizada com `will-change`

### Arquivo alterado
- `src/components/catalogo/SkinDetailModal.tsx`

