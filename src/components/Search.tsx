interface SearchProps {
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

export function Search({ search, setSearch }: SearchProps) {
	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const query = event.target.value
		setSearch(query)
	}

	return (
		<form className='w-full  border-b border-slate-500 pb-6 mb-6'>
			<input
				type='search'
				onChange={handleSearch}
				value={search}
				placeholder='Busque em suas notas...'
				className='
					w-full bg-transparent text-2xl md:text-3xl font-semibold tracking-tight
					outline-none search-cancel:hidden
				'
				name='search'
			/>
		</form>
	)
}

