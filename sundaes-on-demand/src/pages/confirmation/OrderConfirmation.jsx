import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function OrderConfirmation() {
    const [orderNumber, setOrderNumber] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:3030/order')
        .then(response => setOrderNumber(response.data.orderNumber))
        .catch(() => setError(true));
    }, []);

    let screen = <h1>Loading...</h1>;

    if (error) {
        screen = <h1>Error, something went wrong! Please try again</h1>;
    } else if (orderNumber) {
        screen = (
            <Form>
                <h1>Thank you!</h1>
                <h2>Your order number is {orderNumber}</h2>
                <h3>as per our terms and conditions, nothing will happen now</h3>
                <Button>
                    Create new order
                </Button>
            </Form>
        );
    }

    return (
        {screen}
    );
}