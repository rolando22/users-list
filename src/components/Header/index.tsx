import { SortBy } from '../../types.d';
import './Header.css';

interface Props {
    showColors: boolean
    filterCountry: string
    sorter: SortBy
    toggleShowColors: () => void
    sortBy: (sort: SortBy) => () => void
    resetUsers: () => void
    setFilterCountry: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Header({ showColors, filterCountry, sorter, toggleShowColors, sortBy, resetUsers, setFilterCountry }: Props) {
    return (
        <header className='Header'>
            <button onClick={toggleShowColors}>{showColors ? 'Descolorear Filas' : 'Colorear Filas'}</button>
            <button onClick={sortBy(SortBy.COUNTRY)}>{sorter === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}</button>
            <button onClick={resetUsers}>Resetear estado</button>
            <input 
                type='text' 
                value={filterCountry}
                placeholder='Filtra por país'
                onChange={setFilterCountry}
            />
        </header>
    );
}