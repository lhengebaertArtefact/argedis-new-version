import localFont from 'next/font/local'

export const Nexa = localFont({
    src: [
      {
        path: "../public/fonts/nexa/Nexa-ExtraLight.ttf",
      },
    ],
    variable: "--font-nexa",
  });

  export const NexaBold = localFont({
    src: [
      {
        path: "../public/fonts/nexa/Nexa-Heavy.ttf",
      },
    ],
    variable: "--font-nexaHeavy",
  });