import './Error.css';

interface Props {
    error: string | null
}

export function Error({ error }: Props) {
    return (
        <p className='Error'>{error}</p>
    );
}
