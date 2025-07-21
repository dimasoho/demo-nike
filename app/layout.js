import localFont from 'next/font/local';
import "./globals.css";

// Importing custom fonts via NextJs instead of Tailwind for better performance
const machina = localFont({
  src: [
    {
      path: '../public/font/PPNeueMachina-InktrapLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/font/PPNeueMachina-InktrapRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/PPNeueMachina-InktrapMedium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-machina',
  display: 'swap',
});

const saol = localFont({
  src: [
    {
      path: '../public/font/SaolStandard-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
  ],
  variable: '--font-saol',
  display: 'swap',
});

export const metadata = {
  title: "Nike - Air Max"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${machina.variable} ${saol.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
