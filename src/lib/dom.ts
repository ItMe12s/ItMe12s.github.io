type Attrs = Record<string, string | number | boolean | undefined>;
type Child = Node | string | null | undefined | false;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Attrs,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v === undefined) continue;
      if (k === 'class') node.className = String(v);
      else if (k === 'style') node.setAttribute('style', String(v));
      else if (k in node) (node as unknown as Record<string, unknown>)[k] = v;
      else node.setAttribute(k, String(v));
    }
  }
  for (const child of children) {
    if (child == null || child === false) continue;
    node.append(child);
  }
  return node;
}
