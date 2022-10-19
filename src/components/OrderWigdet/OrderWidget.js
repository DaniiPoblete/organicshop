import React, { useState } from 'react';
import { CloseCircleOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import Search from 'antd/es/input/Search';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

function OrderWidget() {
	const [inputValue, setInputValue] = useState('');
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();
	const {setOrderId} = useCart();

	const onSearch = (value) => {
		if (value) {
			setOrderId(value);
			setInputValue('');
			setOpen(false);
			navigate('/order');
		}
	};

	const onClick = () => {
		setOpen(!open);
	};

	const content = (
		<Search placeholder="Ingresa el código de tu compra"
				allowClear
				onSearch={onSearch}
				style={{width: 300}}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
		/>
	);

	return (
		<Popover content={content} title="Buscar compra" placement={'bottomLeft'}
				 visible={open}
				 onClick={onClick}>
			{!open ?
				<Button icon={<FileSearchOutlined />} shape={'circle'} />
				:
				<Button icon={<CloseCircleOutlined />} shape={'circle'} />
			}
		</Popover>
	);
}

export default OrderWidget;