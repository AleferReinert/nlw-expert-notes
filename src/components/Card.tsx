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

	return (
		<DialogTrigger
			title='Visualizar'
			className={`
				${themeStyles}
				rounded-md p-[1.125rem] relative outline-none
				border-2 border-transparent text-left 
				flex flex-col aspect-[2/1] sm:aspect-[7/5]
				transition-all hover:border-slate-600 focus-visible:border-lime-400
			`}
		>
			<h2 className='text-sm font-medium mb-3'>{title}</h2>
			<p className='text-slate-400 text-sm leading-6 line-clamp-6'>{description}</p>

			{title !== 'Adicionar nota' && (
				<div className='absolute left-[-2px] right-[-2px] bottom-[-2px] top-1/2 rounded-b-md bg-gradient-to-t from-black/60 to-transparent to-50%'></div>
			)}
		</DialogTrigger>
	)
}
