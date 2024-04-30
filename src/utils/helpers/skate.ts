export const getSkate = async (email: string) => {
    try {
        const response =
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skates/search-by-email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        return null; // Devuelve un objeto vacío en caso de error
    }
};

export const preRegister = async (name: string, email: string) => {
    console.log(name, email)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                team_id: 1
            }),
        });
        console.log(response);

        const responseData = await response.json();
        console.log("registro completado", responseData);
    } catch (error) {
        console.error('Error:', error);
    }
    console.log("pre Registro");
};