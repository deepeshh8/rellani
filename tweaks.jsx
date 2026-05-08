// ===== TWEAKS PANEL =====
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "white",
  "headline": "instrument",
  "cardStyle": "image-info",
  "density": 4,
  "showAnnouncement": true,
  "darkMode": false
}/*EDITMODE-END*/;

const PALETTES = {
  white: { paper: '#FFFFFF', paper2: '#F5F5F3', paper3: '#ECECEA', bone: '#FAFAF8', ink: '#0A0908', ink2: '#1A1816', stone: '#8C8880', line: '#E5E3DE', accent: '#C2A06A' },
  warm: { paper: '#F2ECE0', paper2: '#EAE3D4', paper3: '#E2DAC8', bone: '#FBF8F1', ink: '#14110D', ink2: '#2A2620', stone: '#8A8276', line: '#D6CDB9', accent: '#BD4A28' },
  cool: { paper: '#EDEEEF', paper2: '#E2E4E6', paper3: '#D4D7DA', bone: '#FBFBFB', ink: '#0C1014', ink2: '#1F252B', stone: '#7A828A', line: '#CACDD0', accent: '#3A6B7A' },
  noir: { paper: '#15110D', paper2: '#1E1A15', paper3: '#27221C', bone: '#F4EFE3', ink: '#F4EFE3', ink2: '#D4CCB8', stone: '#9A8F7A', line: '#332D24', accent: '#C9885A' },
  sage: { paper: '#E9EBDF', paper2: '#DDE0CF', paper3: '#CFD3BE', bone: '#FAFAF2', ink: '#1A1F18', ink2: '#2D3328', stone: '#7E8474', line: '#C4C9B5', accent: '#5C6B3F' },
};
const HEADLINES = {
  instrument: '"Instrument Serif", Georgia, serif',
  cormorant: '"Cormorant Garamond", Georgia, serif',
  bricolage: '"Bricolage Grotesque", -apple-system, sans-serif',
  fanwood: '"Fanwood Text", Georgia, serif',
};

const RellaniTweaks = ({ tweaks, setTweak }) => {
  // Apply
  React.useEffect(() => {
    const p = PALETTES[tweaks.palette] || PALETTES.warm;
    const root = document.documentElement;
    root.style.setProperty('--paper', p.paper);
    root.style.setProperty('--paper-2', p.paper2);
    root.style.setProperty('--paper-3', p.paper3);
    root.style.setProperty('--bone', p.bone);
    root.style.setProperty('--ink', p.ink);
    root.style.setProperty('--ink-2', p.ink2);
    root.style.setProperty('--stone', p.stone);
    root.style.setProperty('--line', p.line);
    root.style.setProperty('--accent', p.accent);
    root.style.setProperty('--serif', HEADLINES[tweaks.headline] || HEADLINES.instrument);
  }, [tweaks.palette, tweaks.headline]);

  React.useEffect(() => {
    const ann = document.querySelector('header [data-announcement]');
    if (ann) ann.style.display = tweaks.showAnnouncement ? '' : 'none';
  }, [tweaks.showAnnouncement]);

  return (
    <TweaksPanel title="Tweaks · Rellani">
      <TweakSection title="Palette">
        <TweakColor
          value={tweaks.palette}
          onChange={v => setTweak('palette', v)}
          options={[
            ['#FFFFFF', '#0A0908', '#C2A06A'],
            ['#F2ECE0', '#14110D', '#BD4A28'],
            ['#EDEEEF', '#0C1014', '#3A6B7A'],
            ['#15110D', '#F4EFE3', '#C9885A'],
            ['#E9EBDF', '#1A1F18', '#5C6B3F'],
          ]}
          labels={['White luxury', 'Warm paper', 'Cool stone', 'Noir', 'Sage']}
          values={['white', 'warm', 'cool', 'noir', 'sage']}
        />
      </TweakSection>

      <TweakSection title="Headline font">
        <TweakSelect
          value={tweaks.headline}
          onChange={v => setTweak('headline', v)}
          options={[
            { value: 'instrument', label: 'Instrument Serif' },
            { value: 'cormorant', label: 'Cormorant Garamond' },
            { value: 'bricolage', label: 'Bricolage Grotesque' },
            { value: 'fanwood', label: 'Fanwood Text' },
          ]}
        />
      </TweakSection>

      <TweakSection title="Display">
        <TweakToggle label="Announcement bar" value={tweaks.showAnnouncement} onChange={v => setTweak('showAnnouncement', v)} />
      </TweakSection>

      <TweakSection title="Try it">
        <TweakButton label="Open product" onClick={() => location.hash = '#/product/aria-wool-overcoat'} />
        <TweakButton label="Open lookbook" onClick={() => location.hash = '#/lookbook/lb1'} />
        <TweakButton label="Open checkout" onClick={() => location.hash = '#/checkout'} />
      </TweakSection>
    </TweaksPanel>
  );
};

// Custom TweakColor that supports labeled palette swatches
const TweakColor = ({ value, onChange, options, labels = [], values = [] }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, gridAutoRows: 'auto' }}>
    {options.map((palette, i) => {
      const isActive = (values[i] || palette[0]) === value;
      return (
        <button key={i} onClick={() => onChange(values[i] || palette[0])} style={{
          padding: 10, borderRadius: 8, background: 'transparent',
          border: '1.5px solid', borderColor: isActive ? '#000' : 'rgba(0,0,0,0.1)',
          cursor: 'pointer', textAlign: 'left',
        }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
            <div style={{ flex: 1, height: 24, borderRadius: 4, background: palette[0] }} />
            <div style={{ width: 18, height: 24, borderRadius: 4, background: palette[1] }} />
            <div style={{ width: 18, height: 24, borderRadius: 4, background: palette[2] }} />
          </div>
          <div style={{ fontSize: 11, color: '#444' }}>{labels[i]}</div>
        </button>
      );
    })}
  </div>
);

window.RellaniTweaks = RellaniTweaks;
window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;
