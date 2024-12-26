import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={500}
    height={300}
    viewBox="0 0 500 300"
    backgroundColor="#f5f4f4"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="60" y="18" rx="3" ry="3" width="88" height="0" />
    <rect x="108" y="24" rx="0" ry="0" width="9" height="0" />
    <rect x="183" y="34" rx="0" ry="0" width="0" height="1" />
    <rect x="101" y="23" rx="0" ry="0" width="6" height="1" />
    <rect x="30" y="70" rx="0" ry="0" width="0" height="8" />
    <rect x="6" y="2" rx="9" ry="9" width="200" height="300" />
    <rect x="216" y="2" rx="9" ry="9" width="197" height="30" />
    <rect x="217" y="44" rx="9" ry="9" width="249" height="30" />
    <rect x="219" y="88" rx="9" ry="9" width="247" height="30" />
    <rect x="222" y="136" rx="9" ry="9" width="242" height="160" />
  </ContentLoader>
);

export default MyLoader;
