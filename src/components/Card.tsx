import { DialogTrigger } from '@radix-ui/react-dialog'

interface CardProps {
	title: string
	description: string
}

export function Card({ title, description }: CardProps) {
	return (
		<DialogTrigger
			className='
				first:bg-slate-700 bg-slate-800
				first:text-slate-200 text-slate-300
				[&:not(:first-child)]:bg-gradient-to-t from-black/60 to-transparent to-50%
				rounded-md p-5 overflow-hidden relative outline-none
				ring-2 ring-transparent text-left 
				flex flex-col
				transition-all hover:ring-slate-600 focus-visible:ring-lime-400
			'
		>
			<h2 className='text-sm font-medium mb-3'>{title}</h2>
			<p className='text-slate-400 text-sm leading-6'>{description}</p>
		</DialogTrigger>
	)
}