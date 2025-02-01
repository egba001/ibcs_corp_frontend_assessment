import { AddUserFormData, UserFormData } from "./types";

// function to fetch users from the API endpoint
export async function fetchUsers() {
    try {
        const users = await fetch(import.meta.env.VITE_ENDPOINT_URL);
        return users.json()
    } catch(error) {
        console.error(error);
    }
}

// function to fetch a single user
export async function fetchUser(userId: number) {
    try {
        const user = await fetch(`${import.meta.env.VITE_ENDPOINT_URL}/${userId}`);
        return user.json();
    } catch (error) {
        console.error(error);
    }
}

// function to edit user data
export async function editUser(userId: number, formData: UserFormData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT_URL}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        return response.json();
    } catch(error) {
        console.error(error)
    }
}

export async function createUser(formData: AddUserFormData) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_ENDPOINT_URL}`,
            {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }
        );
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(userId: number) {
    const response = await fetch(
        `${import.meta.env.VITE_ENDPOINT_URL}/${userId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
};