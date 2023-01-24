import { Container } from './styles';
import Link from 'next/link';

import { List, AddressBook, PlayCircle, Hourglass, HouseLine } from 'phosphor-react';

export default function Menu() {
	return (
		<Container>
			<input type="checkbox" id="check" />
			<label htmlFor='check'>
				<List size={30} />
			</label>

			<ul>
				<li><Link href="/"><HouseLine /><span>Home</span></Link></li>
				<li><Link href="/esquemas"><AddressBook /><span>Esquemas</span></Link></li>
				<li><Link href="/formatar"><PlayCircle /><span>Formatar</span></Link></li>
				<li><Link href="/historico"><Hourglass /><span>Historico</span></Link></li>
			</ul>
		</Container>
	)
}