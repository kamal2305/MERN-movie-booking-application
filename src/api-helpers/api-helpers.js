import axios from 'axios';
export const getAllMovies = async () => {
    const res = await axios.get("movie/");
    if (!res || res.status !== 200) {
        throw new Error("No Data");
    }
    return res.data;
};

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios
        .post(`/user/${signup ? "signup" : "login"}`, {
            name: signup ? data.name : "",
            email: data.email,
            password: data.password
        });
    if (!res || (res.status !== 200 && res.status !== 201)) {
        throw new Error("Unexpected response");
    }
    return res.data;
};

export const sendAdminAuthRequest = async (data) => {
    const res = await axios
        .post("admin/login", {
            email: data.email,
            password: data.password
        });
    if (!res || res.status !== 200) {
        throw new Error("Unexpected Error occured");
    }
    return res.data;
};

export const getMovieDetails = async (id) => {
    const res = await axios.get(`movie/${id}`);

    if (!res || res.status !== 200) {
        throw new Error("Unexpected error");
    }
    return res.data;
}

export const newBooking = async (data) => {
    const res = await axios
        .post('/booking', {
            movie: data.movie,
            seatNumber: data.seatNumber,
            date: data.date,
            user: data.user || localStorage.getItem('userId'),
        });
    if (!res || res.status !== 201) {
        throw new Error("unexpected Error");
    }
    return res.data;
};

export const getUserBooking = async () => {
    const id = localStorage.getItem('userId');
    const res = await axios.get(`/user/bookings/${id}`);
    if (!res || res.status !== 200) {
        throw new Error("unexpected Error");
    }
    return res.data;
};

export const deleteBooking = async (id) => {
    const res = await axios.delete(`/booking/${id}`);
    if (!res || res.status !== 200) {
        throw new Error("unexpected Error");
    }
    return res.data;
};

export const getUserDetails = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/${id}`);

    if (!res || res.status !== 200) {
        throw new Error("unexpected Error");
    }
    return res.data;
}

export const addMovie = async (data) => {
    const res = await axios
        .post("/movie", {
            title: data.title,
            description: data.description,
            releaseDate: data.releaseDate,
            posterUrl: data.posterUrl,
            featured: data.featured,
            actors: data.actors,
            admin: localStorage.getItem("adminId"),
        },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    if (!res || res.status !== 201) {
        throw new Error("Unexpected Error");
    }
    return res.data;
};

export const getAdminById = async () => {
    const adminId = localStorage.getItem("adminId");
    const res = await axios.get(`/admin/${adminId}`);
    if (!res || res.status !== 200) {
        throw new Error("Unexpected Error");
    }
    return res.data;
}