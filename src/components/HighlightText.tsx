// Renders text with one word italicized in orange — the "light" treatment
// shared by the About hero and the home page About teaser.
export function HighlightText({
  text,
  word,
}: {
  text: string
  word?: string
}) {
  if (!word) return <>{text}</>
  const i = text.toLowerCase().indexOf(word.toLowerCase())
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <em className="italic font-medium text-orange">{text.slice(i, i + word.length)}</em>
      {text.slice(i + word.length)}
    </>
  )
}
