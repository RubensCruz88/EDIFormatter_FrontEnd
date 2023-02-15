import { api } from '@/lib/axios';
import { Container } from '@/styles/pages/esquemas/esquemaID';
import { Header } from './styles';
import { GetServerSideProps } from 'next';
import { SchemaIdContextProvider } from './contexts/SchemaIdContext';
import RulesBody from './components/RulesBody';

interface Schema {
	// esquemaID: Number;
	id: Number;
	sequencia: string;
	// inicial: Number;
	// final: Number;
	tamanho: Number;
	// tipo: 'caractere' | 'data' | 'numero';
	descricao: string;
}

interface ResponseProps {
	data: Schema[]
}

interface PageProps {
	rules: Schema[]
}

export default function Rules({ rules }: PageProps) {

	return (
		<Container>
			<Header>Layout do Esquema</Header>

			<SchemaIdContextProvider initialData={rules}>
				<RulesBody />
			</SchemaIdContextProvider>
		</Container>
	)

}

export const getServerSideProps: GetServerSideProps = async (props) => {
	const { query } = props
	const schemaID = query.id

	const response: ResponseProps = await api.get(`/regras`,{
		params: {
			schemaID,
			_sort: 'sequencia'
		}
	});

	return {
		props: {
			rules: response.data
		}
	}
}