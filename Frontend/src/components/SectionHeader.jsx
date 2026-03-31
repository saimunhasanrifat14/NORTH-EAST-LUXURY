const SectionHeader = ({ eyebrow, title, description, align = 'left' }) => {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl space-y-4 ${alignment}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.42em] text-TextDarkGray">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-TextBlack sm:text-5xl [font-family:'Cormorant_Garamond',serif]">
        {title}
      </h2>
      <p className="text-base leading-8 text-TextGray sm:text-lg">
        {description}
      </p>
    </div>
  )
}

export default SectionHeader
