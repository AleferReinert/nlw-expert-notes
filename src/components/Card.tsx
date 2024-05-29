import { DialogTrigger } from '@radix-ui/react-dialog'

interface CardProps {
	title: string
	description: string
	theme?: 'default' | 'dark'
}

export function Card({ title, description, theme = 'default' }: CardProps) {
	const themeDefault = 'bg-slate-700 text-slate-200 '
	const themeDark = 'bg-slate-800 text-slate-300 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] '
	const themeStyles = theme === 'dark' ? themeDark : themeDefault
	const isNewNoteCard = title === 'Adicionar nota' ? true : false

	return (
		<DialogTrigger asChild>
			<button title={isNewNoteCard ? '' : 'Visualizar'} className='relative outline-none group'>
				<div
					className={`
						${themeStyles} 
						${isNewNoteCard ? 'sm:aspect-[7/5]' : 'aspect-[7/5]'}
						p-[1.125rem] rounded-md text-left border-2 border-transparent transition-all
						flex flex-col sm:min-h-max
						group-hover:border-slate-600
						group-focus-visible:border-lime-400
					`}
				>
					<h2 className='text-sm font-medium mb-3'>{title}</h2>
					<p className='text-slate-400 text-sm leading-6 line-clamp-5 md:line-clamp-3 lg:line-clamp-6 xl:line-clamp-[7]'>
						{description}
					</p>
				</div>
				{!isNewNoteCard && (
					<div
						className='
						pointer-events-none absolute inset-0 top-1/2 rounded-b-md 
						group-hover:inset-[2px] 
						group-focus-visible:inset-[2px]  
						bg-gradient-to-t from-black/60 to-transparent to-50%'
					></div>
				)}
			</button>
		</DialogTrigger>
	)
}
