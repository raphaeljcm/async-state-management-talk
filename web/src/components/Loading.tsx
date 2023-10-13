const FALLBACK_LOADING_STYLE = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export function Loading() {
  return <div style={FALLBACK_LOADING_STYLE}>Loading...</div>;
}
