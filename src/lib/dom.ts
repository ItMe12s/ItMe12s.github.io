type ElAttrs = Record<string, string | number | boolean | undefined>;

export function el(
  tag: string,
  attrs?: ElAttrs,
  ...children: (Node | string | null | undefined)[]
): HTMLElement {
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
    if (child == null) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}
