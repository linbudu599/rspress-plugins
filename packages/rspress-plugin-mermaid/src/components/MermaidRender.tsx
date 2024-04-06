import React, { useEffect, useId, useState } from 'react';

import mermaid from 'mermaid';

import type { MermaidConfig } from 'mermaid';

interface MermaidRendererProps {}

const MermaidRenderer: React.FC<
  React.PropsWithChildren<MermaidRendererProps>
> = ({ children = '' }) => {
  const id = useId();

  const [svg, setSvg] = useState('');

  const [renderError, setRenderError] = useState(false);

  async function renderMermaid2SVG() {
    // https://github.com/mermaid-js/mermaid/blob/1b40f552b20df4ab99a986dd58c9d254b3bfd7bc/packages/mermaid/src/docs/.vitepress/theme/Mermaid.vue#L53
    const hasDarkClass = document.documentElement.classList.contains('dark');

    const mermaidConfig: MermaidConfig = {
      securityLevel: 'loose',
      startOnLoad: false,
      theme: hasDarkClass ? 'dark' : 'default',
    };

    try {
      mermaid.initialize(mermaidConfig);

      const { svg } = await mermaid.render(
        id.replace(/:/g, ''),
        children as string,
      );

      setSvg(svg);
    } catch (error) {
      setRenderError(true);
    }
  }

  useEffect(() => {
    renderMermaid2SVG();
  }, [children]);

  return (
    <>
      {renderError ? null : <div dangerouslySetInnerHTML={{ __html: svg }} />}
    </>
  );
};

export default MermaidRenderer;
