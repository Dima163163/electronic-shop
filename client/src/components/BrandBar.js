import {observer} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Context} from '..';
import {Card, Row} from 'react-bootstrap';

const BrandBar = observer(() => {
	const {device} = useContext(Context);
	return (
		<Row className="d-flex gap-1">
			{device.brands.map((brand) => (
				<Card
					key={brand.id}
					className="p-3"
					style={{display: 'inline-block', width: 'auto', cursor: 'pointer'}}
					onClick={() => device.setSelectedBrand(brand)}
					border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
				>
					{brand.name}
				</Card>
			))}
		</Row>
	);
});

export default BrandBar;
