export const getJudge = async (email: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/judges/search-by-email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            if(response.status === 404) {
                // Si el error es 404 (Not Found), devolver null sin imprimirlo en la consola
                return null;
            }
            // Si el error es distinto de 404, lanzar un error para ser manejado por el bloque catch
            //throw new Error('Error en la solicitud');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Hubo un problema al obtener el juez:', error);
        throw new Error('Error en la solicitud');
    }
}
