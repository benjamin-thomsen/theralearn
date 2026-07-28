export const metadata = {
  title: 'TheraLearn',
  description: 'Psychotherapy learning app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  )
}
