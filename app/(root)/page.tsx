// Static export has no server redirects, so pick the language in the browser.
// Arabic-speaking browsers land on /ar/, everyone else on /en/.
const pick = `location.replace((navigator.language||"").toLowerCase().startsWith("ar")?"ar/":"en/");`;

export const metadata = {
  title: "Dijla Grill",
};

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="1; url=en/" />
      <script dangerouslySetInnerHTML={{ __html: pick }} />
      <p style={{ fontFamily: "system-ui", padding: 24 }}>
        <a href="ar/">العربية</a> · <a href="en/">English</a>
      </p>
    </>
  );
}
