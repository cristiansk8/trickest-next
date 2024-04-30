export const getJudge = async (email: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jueces/search-by-email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 400) {
                // Si el error es 400 (Bad Request), devolver null sin imprimirlo en la consola
                return null;
            }
            throw new Error('Error en la solicitud');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Hubo un problema al obtener el juez:', error.message);
        return null;
    }
}
