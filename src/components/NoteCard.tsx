interface NoteCardProps {
  title: string
  description: string
  asNewNote?: boolean
}

export function NoteCard({ title, description, asNewNote }: NoteCardProps) {
  return (
    <button className='
      bg-slate-700 rounded-md p-5 overflow-hidden relative ring-2 ring-transparent text-left flex flex-col outline-none
      hover:ring-slate-600
      focus-visible:ring-lime-400
    '>
      <h2 className={`text-sm font-medium mb-3 ${asNewNote ? 'text-slate-200' : 'text-slate-300'}`}>
        {title}
      </h2>
      
      <p className='text-slate-400 text-sm leading-6'>
        {description}
      </p>

      {!asNewNote && (
        <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent' />
      )}
    </button>
  )
}