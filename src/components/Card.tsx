import { DialogTrigger } from '@radix-ui/react-dialog'

interface CardProps {
	title: string
	description: string
	theme?: 'default' | 'dark'
}

export function Card({ title, description, theme = 'default' }: CardProps) {
	const themeDefault = 'bg-slate-700 text-slate-200 '
	const themeDark = 'bg-slate-800 text-slate-300 shadow-lg shadow-black/25 '
	const themeStyles = theme === 'dark' ? themeDark : themeDefault

	return (
		<DialogTrigger
			title='Visualizar'
			className={`
				${themeStyles}
				rounded-md p-5 overflow-hidden relative outline-none
				ring-2 ring-transparent text-left 
				flex flex-col min-h-28 sm:h-60
				transition-all hover:ring-slate-600 focus-visible:ring-lime-400
			`}
		>
			<h2 className='text-sm font-medium mb-3'>{title}</h2>
			<p className='text-slate-400 text-sm leading-6 line-clamp-6'>{description}</p>

			{title !== 'Adicionar nota' && (
				<div className='absolute inset-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent to-50%'></div>
			)}
		</DialogTrigger>
	)
}
