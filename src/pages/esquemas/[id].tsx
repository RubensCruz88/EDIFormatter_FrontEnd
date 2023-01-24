import { GetServerSideProps } from 'next';
import { api } from '@/lib/axios';

interface Regra {
	inicial: number,
	final: number,
	tipo: 'caractere' | 'data' | 'numero',
	descricao: string
}


export default function Esquema(props: Regra[]) {

	console.log(props);

	return (
		<h1>
			produto
		</h1>
	)
}

export const getServerSideProps: GetServerSideProps = async (props) => {
	const { query } = props
	const esquemaID = query.id

	const response = await api.get(`/regras`,{
		params: {
			esquemaID
		}
	})

	return {
		props: {
			regras: response.data
		}
	}
}
